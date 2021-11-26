# react-native-queuely

A queue manager to react-native projects

## Installation

```sh
npm install react-native-queuely
```

## Usage

```js
import queuely, {Worker} from 'react-native-queuely';

// CREATE THE WORKER
const DemoWorker = new Worker("demo", async (payload) => {
 // DO SOMETHING WITH PAYLOAD;
});

// DEFINE THE WORKERS
queuely.configure({workers: [DemoWorker]});

// ADD JOBS TO THE WORKER
queue.addJob("demo", {
  name: "steve",
  age: 20,
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
