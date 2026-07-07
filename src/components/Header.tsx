import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from './ui/text';
import { motion } from 'framer-motion';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../providers/ThemeProvider';
import { useCart } from '../providers/CartProvider';
import { ShoppingCart, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { key: 'sidemenu.ramps', route: 'Ramps' },
  { key: 'sidemenu.decks', route: 'Decks' },
  { key: 'sidemenu.accessories', route: 'Acessorios' },
  { key: 'sidemenu.diceTower', route: 'DiceTower' },
  { key: 'sidemenu.chess', route: 'Xadrez' },
] as const;

const MotionView = motion.div;

export const Header = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDark } = useTheme();
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useTranslation();

  const headerBgColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(247, 240, 230, 0.85)';
  const borderBottomColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const titleColor = isDark ? 'text-white' : 'text-foreground';
  const subtitleColor = isDark ? 'text-white/50' : 'text-foreground/50';
  const linkColor = isDark ? 'text-white/70' : 'text-foreground/70';
  const btnBorderColor = isDark ? 'border-primary' : 'border-foreground';
  const btnTextColor = isDark ? 'text-primary' : 'text-foreground';
  const iconColor = isDark ? '#39FF14' : '#c49a3a';

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
        backgroundColor: headerBgColor,
        backdropFilter: 'blur(16px)',
        boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.7)' : '0 8px 32px rgba(0, 0, 0, 0.04)',
        height: '80px',
        borderBottom: `1px solid ${borderBottomColor}`
      }}
    >
      <View style={{ flexShrink: 0 }}>
        <Text className={`text-xl font-black tracking-tighter ${titleColor} uppercase italic`}>
          HEMP RAMPS <Text className={`text-[10px] font-bold tracking-widest ${subtitleColor}`}>by CPX Labs</Text>
        </Text>
      </View>

      <View className="hidden flex-row gap-8 md:flex" style={{ flexGrow: 1, justifyContent: 'center' }}>
        {NAV_LINKS.map((link) => (
          <Pressable key={link.route} onPress={() => navigation.navigate(link.route as any)}>
            <Text className={`text-xs font-black tracking-widest ${linkColor} hover:text-primary transition-colors uppercase`}>
              {t(link.key)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row items-center gap-4" style={{ flexShrink: 0 }}>
        {/* Shopping Cart button with floating badge */}
        <Pressable
          onPress={() => setIsCartOpen(true)}
          className="relative w-10 h-10 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition-all"
        >
          <ShoppingCart size={20} color={iconColor} />
          {totalItems > 0 && (
            <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full items-center justify-center shadow-sm">
              <Text className="text-primary-foreground text-[10px] font-black text-center">{totalItems}</Text>
            </View>
          )}
        </Pressable>

        {/* User Account button */}
        <Pressable
          onPress={() => console.log('User Account Clicked')}
          className="w-10 h-10 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition-all"
        >
          <User size={20} color={iconColor} />
        </Pressable>
      </View>
    </MotionView>
  );
};
