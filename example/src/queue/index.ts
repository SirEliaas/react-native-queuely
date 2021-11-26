import queuely from "react-native-queuely";
import DemoWorker from "./workers/demo.worker";

const workers = new Array();
workers.push(DemoWorker);

queuely.configure({workers});
export default queuely;