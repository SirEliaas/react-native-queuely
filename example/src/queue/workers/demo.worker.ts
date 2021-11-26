import {Worker} from "react-native-queuely";

const DemoWorker = new Worker("demo", async (payload) => {
  console.log("EXECUTANDO TAREFA DO WORKER (DEMO), PAYLOAD: ", payload);
});

export default DemoWorker;