import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from './ui/text';
import { motion } from 'framer-motion';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const NAV_LINKS = [
  { label: 'RAMPAS', route: 'Ramps' },
  { label: 'DECKS', route: 'Decks' },
  { label: 'ACESSÓRIOS', route: 'Acessorios' },
  { label: 'DICE TOWER', route: 'DiceTower' },
  { label: 'XADREZ', route: 'Xadrez' },
] as const;

const MotionView = motion.div;

export const Header = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <MotionView
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(12px)',
        height: '80px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <View style={{ flexShrink: 0 }}>
        <Text className="text-xl font-bold tracking-tighter text-white">
          HEMP RAMPS <Text className="text-sm font-normal text-white/50">by CPX Labs</Text>
        </Text>
      </View>

      <View className="hidden flex-row gap-8 md:flex" style={{ flexGrow: 1, justifyContent: 'center' }}>
        {NAV_LINKS.map((link) => (
          <Pressable key={link.route} onPress={() => navigation.navigate(link.route as any)}>
            <Text className="text-xs font-bold tracking-widest text-white/70 hover:text-primary transition-colors">
              {link.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flexShrink: 0 }}>
        <Pressable className="border border-primary px-4 py-2 rounded-sm active:bg-primary/20 transition-all">
          <Text className="text-xs font-bold tracking-widest text-primary uppercase">
            SUSTENTABILIDADE
          </Text>
        </Pressable>
      </View>
    </MotionView>
  );
};
