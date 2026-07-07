import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Scene3D from '../components/Scene3D';
import { Header } from '../components/Header';
import { ConfiguratorPanel } from '../components/ConfiguratorPanel';
import { Text } from '../components/ui/text';
import { RootStackParamList } from '../types/navigation';
import { ChevronRight, X, Compass } from 'lucide-react-native';

const CATEGORIES = [
  { name: 'Rampas', route: 'Ramps' },
  { name: 'Decks', route: 'Decks' },
  { name: 'Dice Towers', route: 'DiceTower' },
  { name: 'Acessórios', route: 'Acessorios' },
  { name: 'Xadrez', route: 'Xadrez' },
] as const;

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isCategoriesMinimized, setIsCategoriesMinimized] = useState(false);

  return (
    <View className="flex-1 bg-carbon overflow-hidden">
      <Header />

      <View className="flex-1 flex-col lg:flex-row">
        {/* 3D Model View - Takes full screen on mobile, right side on desktop */}
        <View className="flex-[1.5] lg:order-2">
          <Scene3D category="Home" />
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
        style={{ width: isCategoriesMinimized ? 'auto' : 250 }}
      >
        {isCategoriesMinimized ? (
          <Pressable
            onPress={() => setIsCategoriesMinimized(false)}
            className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-full flex-row items-center justify-center active:scale-95 shadow-lg pointer-events-auto"
          >
            <Compass size={18} color="#39FF14" />
          </Pressable>
        ) : (
          <View className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative pointer-events-auto">
            <Pressable
              onPress={() => setIsCategoriesMinimized(true)}
              className="absolute top-4 right-4 z-50 w-6 h-6 items-center justify-center rounded-full bg-white/5 active:scale-95"
            >
              <X size={12} color="rgba(255,255,255,0.6)" />
            </Pressable>
            <Text className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
              Explorar Categorias
            </Text>
            <View className="gap-2">
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.route}
                  onPress={() => navigation.navigate(cat.route as keyof RootStackParamList)}
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
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
