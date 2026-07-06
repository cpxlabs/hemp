import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Star, ShoppingCart } from 'lucide-react-native';
import { Text } from './ui/text';
import { Card, CardContent } from './ui/card';
import { Product } from '../types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  className,
  orientation = 'vertical',
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <Pressable onPress={onPress} className={cn('active:opacity-90 transition-opacity', className)}>
      <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-md p-0 gap-0">
        <View className={cn('flex', isHorizontal ? 'flex-row' : 'flex-column')}>
          <View className={cn(isHorizontal ? 'w-1/3' : 'w-full')}>
            <Image
              source={{ uri: product.imageUrl }}
              className={cn('bg-white/10', isHorizontal ? 'h-full aspect-square' : 'aspect-square w-full')}
              resizeMode="cover"
            />
            <View className="absolute top-2 left-2 flex-row gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <View key={tag} className="bg-primary/90 px-2 py-0.5 rounded-sm">
                  <Text className="text-[10px] font-bold text-black uppercase tracking-tighter">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <CardContent className={cn('p-4 flex-1 justify-between', isHorizontal ? 'px-4' : '')}>
            <View>
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-white/50 text-[10px] font-bold tracking-widest uppercase">
                  {product.category}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Star size={10} color="#39FF14" fill="#39FF14" />
                  <Text className="text-primary text-[10px] font-bold">{product.rating}</Text>
                </View>
              </View>
              <Text className="text-white font-bold text-base leading-tight mb-2" numberOfLines={2}>
                {product.name}
              </Text>
              {isHorizontal && (
                <Text className="text-white/60 text-xs mb-4" numberOfLines={2}>
                  {product.description}
                </Text>
              )}
            </View>

            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-primary font-bold text-lg">
                ${product.price.toFixed(2)}
              </Text>
              <Pressable className="bg-white/10 p-2 rounded-full active:bg-primary/20">
                <ShoppingCart size={16} color="#39FF14" />
              </Pressable>
            </View>
          </CardContent>
        </View>
      </Card>
    </Pressable>
  );
};
