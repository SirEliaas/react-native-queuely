import type { Job } from "./models/Job";
import type Worker from "./Worker";
import uuid from './utils/Uuid';
import * as _ from 'lodash';

interface ConfigureOptions {
  workers: Array<Worker>;
  onQueueFinish?(jobs: Array<Job>): any;
};

class Queue {
  private workers = new Array<Worker>();
  private jobs = new Array<Job>();

  private isExecuting: boolean;
  private stopped: boolean;
  private executed: Array<Job>;

  private onQueueFinish: (jobs: Array<Job>) => any;
  private onExecuteCallback: (status: boolean) => any;

  constructor() {
    this.workers = new Array();
    this.jobs = new Array();
    this.executed = new Array();
    this.isExecuting = false;
    this.stopped = false;
    this.onQueueFinish = () => {};
    this.onExecuteCallback = () => {};
  };

  public configure(options: ConfigureOptions) {
    const {
      workers = new Array(),
      onQueueFinish = () => {},
    } = options;

    this.workers = workers;
    this.onQueueFinish = onQueueFinish;
  };

  public stop() {
    this.stopped = false;
    this.toggleExecuting(false);
    if(this.executed.length > 0) {
      this.onQueueFinish(this.executed);
      this.executed = new Array();
    };
  };

  public get getWorkers() {
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
    if(!this.stopped) this.executeJob(job); 

    return job;
  };

  public get getJobs() {
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
      this.toggleExecuting(true);
      await worker.task(job.payload);
    } catch(error) {
      throw new Error(`Error on try to execute job (${job.id}): ${JSON.stringify(error)}`);
    } finally {
      this.onJobDone(job);
    };
  };

  private toggleExecuting(status: boolean) {
    this.isExecuting = status;
    this.onExecuteCallback(status);
  };

  public onExecute(callback: (status: boolean) => any) {
    this.onExecuteCallback = callback;
  };

  private onJobDone(job: Job) {
    this.jobs = this.jobs.filter((value) => value.id !== job.id);
    this.executed = [...this.executed, job];
    
    if(this.jobs.length > 0) {
      this.executeJob(this.jobs[0])
    } else {
      this.stop();
    };
  };
};

export default Queue;