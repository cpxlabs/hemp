import React, { useMemo } from 'react';
import { View, FlatList, Image, ImageBackground } from 'react-native';
import { CategoryHeader } from '../components/CategoryHeader';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Text } from '../components/ui/text';
import { MOCK_PRODUCTS } from '../services/mockData';

const DiceTowerScreen = () => {
  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.category === 'Dice Tower');
  }, []);

  const featuredProduct = products.find((p) => p.tags.includes('Featured')) || products[0];
  const otherProducts = products.filter((p) => p.id !== featuredProduct?.id);

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <CategoryHeader title="DICE TOWERS" onSearchPress={() => {}} />

      <FlatList
        data={otherProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 40 }}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 16, marginBottom: 16 }}
        ListHeaderComponent={
          <View className="mb-8">
            {featuredProduct && (
              <View className="w-full aspect-[16/10] relative overflow-hidden">
                <Image
                  source={{ uri: featuredProduct.imageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/40" />
                <View className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <View className="bg-primary px-3 py-1 rounded-sm self-start mb-3">
                    <Text className="text-[10px] font-bold text-black uppercase tracking-widest">
                      FEATURED TOWER
                    </Text>
                  </View>
                  <Text className="text-white text-3xl font-extrabold tracking-tight mb-2 uppercase">
                    {featuredProduct.name}
                  </Text>
                  <Text className="text-white/70 text-sm max-w-xs" numberOfLines={2}>
                    {featuredProduct.description}
                  </Text>
                </View>
              </View>
            )}

            <View className="px-6 mt-8">
              <Text className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">
                All Collections
              </Text>
              <View className="h-px bg-white/10 w-full" />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} className="flex-1" />
        )}
        ListEmptyComponent={<EmptyState message="No more dice towers available." />}
      />
    </View>
  );
};

export default DiceTowerScreen;
