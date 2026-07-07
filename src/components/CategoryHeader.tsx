import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Search, Filter, ShoppingCart } from 'lucide-react-native';
import { Text } from './ui/text';
import { cn } from '@/lib/utils';
import { useTheme } from '../providers/ThemeProvider';
import { useCart } from '../providers/CartProvider';

interface CategoryHeaderProps {
  title: string;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
  className?: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  onSearchPress,
  onFilterPress,
  className,
}) => {
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const { totalItems, setIsCartOpen } = useCart();

  const iconColor = isDark ? '#39FF14' : '#111111';
  const utilityIconColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  return (
    <View
      className={cn(
        'flex-row items-center justify-between px-6 pt-14 pb-6 bg-card border-b border-border/20',
        className
      )}
    >
      <View className="flex-row items-center gap-4">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-foreground/5 active:bg-foreground/10"
        >
          <ChevronLeft size={24} color={iconColor} />
        </Pressable>
        <Text className="text-2xl font-black tracking-tight text-foreground uppercase italic">
          {title}
        </Text>
      </View>

      <View className="flex-row gap-2">
        {onSearchPress && (
          <Pressable
            onPress={onSearchPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-foreground/5 active:bg-foreground/10"
          >
            <Search size={20} color={utilityIconColor} />
          </Pressable>
        )}
        {onFilterPress && (
          <Pressable
            onPress={onFilterPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-foreground/5 active:bg-foreground/10"
          >
            <Filter size={20} color={utilityIconColor} />
          </Pressable>
        )}
        
        {/* Cart Toggle button in CategoryHeader */}
        <Pressable
          onPress={() => setIsCartOpen(true)}
          className="relative w-10 h-10 items-center justify-center rounded-full bg-foreground/5 active:bg-foreground/10"
        >
          <ShoppingCart size={20} color={iconColor} />
          {totalItems > 0 && (
            <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full items-center justify-center shadow-sm">
              <Text className="text-primary-foreground text-[9px] font-black text-center">{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};
