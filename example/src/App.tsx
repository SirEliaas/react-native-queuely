import React, { useEffect } from 'react';
import { View } from 'react-native';
import queuely from './queue';

const Application: React.FC = () => {
  useEffect(() => {
    queuely.addJob("demo", {
      name: "Elias",
      idade: 22,
      altura: 183,
    });
  }, []);
  return (
   <View></View>
  );
};

export default Application;