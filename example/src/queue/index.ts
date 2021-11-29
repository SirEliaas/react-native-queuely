import queuely from "react-native-queuely";
import AlphaWorker from "./workers/alpha.worker";
import DemoWorker from "./workers/demo.worker";

const workers = new Array();
workers.push(DemoWorker);
workers.push(AlphaWorker);

queuely.configure({
  workers,
  onQueueFinish: (jobs) => {
    console.log('TAREFAS EXECUTADAS: ', jobs.length)
  },
});
export default queuely;