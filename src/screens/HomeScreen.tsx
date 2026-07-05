import React from 'react';
import { View } from 'react-native';
import Scene3D from '../components/Scene3D';
import { Header } from '../components/Header';
import { ConfiguratorPanel } from '../components/ConfiguratorPanel';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-carbon">
      <Header />

      <View className="flex-1">
        <Scene3D />
      </View>

      <ConfiguratorPanel />
    </View>
  );
};

export default HomeScreen;
