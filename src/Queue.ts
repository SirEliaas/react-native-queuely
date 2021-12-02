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

    const job = { id: uuid.v4(), worker: worker.name, payload } as Job;
    if(this.checkJobExists(job)) {
      return new Error("Job alredy exists to the worker")
    };

    this.jobs = [...this.jobs, job];
    this.startExecuteJobs();

    return job;
  };

  private checkJobExists(job: Job): boolean {
    let exists = false;

    const jobs = this.getJobs;
    for(let current of jobs) {
      if(_.isEqual({worker: current.worker, payload: current.payload}, 
      {worker: job.worker, payload: job.payload})) {
        exists = true;
        break;
      };
    };

    return exists;
  };

  public get getJobs() {
    return this.jobs;
  };

  public getJob(id: string) {
    return this.jobs.find((value) => value.id === id);
  };

  public getJobsByWorker(worker: string) {
    return this.jobs.filter((job) => job.worker === worker);
  };

  public onExecute(callback: (status: boolean) => any) {
    this.onExecuteCallback = callback;
  };

  private async startExecuteJobs() {
    
  };

  private onJobDone(job: Job) {
    this.jobs = this.jobs.filter((current) => current.id !== job.id);
    this.executed = [...this.executed, job];
  };

  private toggleExecuting(status: boolean) {
    if(this.isExecuting !== status) {
      this.isExecuting = status;
      this.onExecuteCallback(status);
    };
  };
};

export default Queue;