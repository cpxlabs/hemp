import React from 'react';
import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Search, Filter } from 'lucide-react-native';
import { Text } from './ui/text';
import { cn } from '@/lib/utils';

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

  return (
    <View
      className={cn(
        'flex-row items-center justify-between px-6 pt-14 pb-6 bg-black/60 backdrop-blur-xl border-b border-white/5',
        className
      )}
    >
      <View className="flex-row items-center gap-4">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10"
        >
          <ChevronLeft size={24} color="#39FF14" />
        </Pressable>
        <Text className="text-2xl font-bold tracking-tight text-white uppercase">
          {title}
        </Text>
      </View>

      <View className="flex-row gap-2">
        {onSearchPress && (
          <Pressable
            onPress={onSearchPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10"
          >
            <Search size={20} color="rgba(255,255,255,0.7)" />
          </Pressable>
        )}
        {onFilterPress && (
          <Pressable
            onPress={onFilterPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10"
          >
            <Filter size={20} color="rgba(255,255,255,0.7)" />
          </Pressable>
        )}
      </View>
    </View>
  );
};
