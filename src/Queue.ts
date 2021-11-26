import type { Job } from "./models/Job";
import type Worker from "./Worker";
import uuid from './utils/Uuid';
import * as _ from 'lodash';

interface ConfigureOptions {
  workers: Array<Worker>;
};

class Queue {
  private workers = new Array<Worker>();
  private jobs = new Array<Job>();

  private executing = false;
  private executed = 0;

  constructor() {};

  public configure(options: ConfigureOptions) {
    const {workers} = options;
    this.workers = workers;
  };

  public getWorkers() {
    return this.workers;
  };

  public getWorker(name: string) {
    return this.workers.find((value) => value.name === name);
  };

  public addJob(workerName: string, payload: any) {
    const worker = this.getWorker(workerName);
    if(!worker) throw new Error(`Worker (${workerName}) not found!`);

    const job = { id: uuid.v4(), worker: workerName, payload } as Job;
    if(_.includes(this.jobs, job), 0) return new Error("Job alredy is in queue");

    this.jobs = [...this.jobs, job];
    this.executeJob(job);

    return job;
  };

  public getJobs() {
    return this.jobs;
  };

  public getJob(id: string) {
    return this.jobs.find((value) => value.id === id);
  };

  public async executeJob(job: Job) {
    const worker = this.getWorker(job.worker);
    if(!worker) throw new Error(`Worker (${job.worker}) not found!`);

    // EXECUTE THE JOB
    try {
      await worker.task(job.payload);
    } catch(error) {
      throw new Error(`Error on try to execute job (${job.id}): ${JSON.stringify(error)}`);
    } finally {
      this.onJobDone(job.id);
    };
  };

  private onJobDone(id: string) {
    this.jobs = this.jobs.filter((value) => value.id !== id);
    this.executed = this.executed + 1;
    
    if(this.jobs.length > 0) {
      this.executeJob(this.jobs[0])
    } else {
      this.executing = false;
      this.executed = 0;
    };
  };
};

export default Queue;