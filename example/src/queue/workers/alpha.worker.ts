import {Worker} from "react-native-queuely";

const AlphaWorker = new Worker("alpha", async (payload) => {
  console.log("EXECUTANDO TAREFA DO WORKER (ALPHA), PAYLOAD: ", payload);
}, {
  concurrency: 1,
});

export default AlphaWorker;