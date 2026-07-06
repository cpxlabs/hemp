import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Scene3D from '../components/Scene3D';
import { Header } from '../components/Header';
import { ConfiguratorPanel } from '../components/ConfiguratorPanel';
import { Text } from '../components/ui/text';
import { RootStackParamList } from '../types/navigation';
import { ChevronRight } from 'lucide-react-native';

const CATEGORIES = [
  { name: 'Rampas', route: 'Ramps' },
  { name: 'Decks', route: 'Decks' },
  { name: 'Dice Towers', route: 'DiceTower' },
  { name: 'Acessórios', route: 'Acessorios' },
  { name: 'Xadrez', route: 'Xadrez' },
] as const;

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 bg-carbon overflow-hidden">
      <Header />

      <View className="flex-1 flex-col lg:flex-row">
        {/* 3D Model View - Takes full screen on mobile, right side on desktop */}
        <View className="flex-[1.5] lg:order-2">
          <Scene3D />
        </View>

        {/* Configurator Panel - Overlays on mobile (handled by absolute pos in component) or stays left on desktop */}
        <View className="hidden lg:flex lg:flex-1 lg:order-1 relative items-center justify-center pointer-events-none">
          {/* On desktop, the ConfiguratorPanel is placed inside this flex container */}
          <View className="pointer-events-auto">
             <ConfiguratorPanel isMobile={false} />
          </View>
        </View>
      </View>

      {/* Mobile Configurator Panel (Absolute Overlay) */}
      <View className="lg:hidden">
        <ConfiguratorPanel isMobile={true} />
      </View>

      {/* Quick Access Categories (Hidden on very small screens, visible as a overlay bar) */}
      <View
        className="absolute bottom-10 right-10 z-40 hidden lg:flex"
        style={{ width: 250 }}
      >
        <View className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <Text className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
            Explorar Categorias
          </Text>
          <View className="gap-2">
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.route}
                onPress={() => navigation.navigate(cat.route as any)}
                className="flex-row items-center justify-between py-2 group"
              >
                <Text className="text-white text-sm font-medium group-hover:text-primary transition-colors">
                  {cat.name}
                </Text>
                <ChevronRight size={14} color="rgba(255,255,255,0.3)" />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
