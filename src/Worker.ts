interface WorkerOptions {
  concurrency: number;
};
class Worker {
  public name: string;
  public task: (payload: any) => Promise<void>;
  public options: WorkerOptions;
  
  constructor(name: string, task: (payload: any) => Promise<void>, options: WorkerOptions) {
    this.name = name;
    this.task = task;
    this.options = options;
  };
};

export default Worker;