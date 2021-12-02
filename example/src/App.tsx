import React, { useEffect } from 'react';
import { View } from 'react-native';
import queuely from './queue';

const Application: React.FC = () => {
  queuely.onExecute((status) => {
    console.log('EXECUTANDO FILA: ', status);
  });

  useEffect(() => {
    queuely.stop();
    setTimeout(() => {
      queuely.addJob("alpha", {
        name: "Matheus",
        idade: 18,
        altura: 178,
      });

      queuely.addJob("demo", {
        name: "Elias",
        idade: 22,
        altura: 183,
      });
    }, 100);
  }, []);
  return (
   <View></View>
  );
};

export default Application; 