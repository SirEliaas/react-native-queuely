class Worker {
  public name: string;
  public task: (payload: any) => Promise<void>;
  
  constructor(name: string, task: (payload: any) => Promise<void>) {
    this.name = name;
    this.task = task;
  };
};

export default Worker;