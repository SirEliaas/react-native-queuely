import {Worker} from "react-native-queuely";

const DemoWorker = new Worker("demo", async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("EXECUTADO TAREFA (DEMO), PAYLOAD: ", payload));
    }, 5000);
  });
});

export default DemoWorker;