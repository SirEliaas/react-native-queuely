import React, { useEffect } from 'react';
import { View } from 'react-native';
import queuely from './queue';

const Application: React.FC = () => {
  queuely.onExecute((status) => {
    console.log(status);
  });

  useEffect(() => {
    setTimeout(() => {
      queuely.addJob("demo", {
        name: "Elias",
        idade: 22,
        altura: 183,
      });
    }, 3000);
  }, []);
  return (
   <View></View>
  );
};

export default Application; 