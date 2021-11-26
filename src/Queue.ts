import type Worker from "./Worker";

interface ConfigureOptions {
  workers: Array<Worker>;
};

class Queue {
  private workers = new Array<Worker>();
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
};

export default Queue;