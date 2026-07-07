import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Star, ShoppingCart } from 'lucide-react-native';
import { Text } from './ui/text';
import { Card, CardContent } from './ui/card';
import { Product } from '../types/product';
import { cn } from '@/lib/utils';
import { useTheme } from '../providers/ThemeProvider';
import { useCart } from '../providers/CartProvider';

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
  const { isDark } = useTheme();
  const { addToCart } = useCart();

  const accentColor = isDark ? '#39FF14' : '#c49a3a'; // Neon green or Antique brass
  const ratingStarColor = isDark ? '#39FF14' : '#c49a3a';

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      material: product.specs.find(s => s.label === 'Material')?.value || 'Standard',
      finish: product.specs.find(s => s.label === 'Acabamento' || s.label === 'Style' || s.label === 'Closure')?.value || 'Standard',
      imageUrl: product.imageUrl,
      category: product.category
    });
  };

  return (
    <Pressable onPress={onPress} className={cn('active:opacity-95 transition-opacity', className)}>
      <Card className="overflow-hidden border-border/40 bg-card p-0 gap-0 shadow-md">
        <View className={cn('flex', isHorizontal ? 'flex-row' : 'flex-column')}>
          <View className={cn(isHorizontal ? 'w-1/3' : 'w-full')}>
            <Image
              source={{ uri: product.imageUrl }}
              className={cn('bg-foreground/5', isHorizontal ? 'h-full aspect-square' : 'aspect-square w-full')}
              resizeMode="cover"
            />
            <View className="absolute top-2 left-2 flex-row gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <View key={tag} className="bg-primary/95 px-2 py-0.5 rounded-sm shadow-sm">
                  <Text className="text-[9px] font-black text-primary-foreground uppercase tracking-wider">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <CardContent className={cn('p-4 flex-1 justify-between', isHorizontal ? 'px-4' : '')}>
            <View>
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
                  {product.category}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Star size={10} color={ratingStarColor} fill={ratingStarColor} />
                  <Text className="text-foreground text-[10px] font-bold">{product.rating}</Text>
                </View>
              </View>
              <Text className="text-foreground font-black text-base leading-tight mb-2 uppercase tracking-tight italic" numberOfLines={2}>
                {product.name}
              </Text>
              {isHorizontal && (
                <Text className="text-muted-foreground text-xs mb-4" numberOfLines={2}>
                  {product.description}
                </Text>
              )}
            </View>

            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-foreground font-bold text-lg">
                ${product.price.toFixed(2)}
              </Text>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="bg-foreground/5 p-2 rounded-full active:bg-primary/20"
              >
                <ShoppingCart size={16} color={accentColor} />
              </Pressable>
            </View>
          </CardContent>
        </View>
      </Card>
    </Pressable>
  );
};
