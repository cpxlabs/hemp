import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable, ScrollView } from 'react-native';
import { CategoryHeader } from '../components/CategoryHeader';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Text } from '../components/ui/text';
import { MOCK_PRODUCTS } from '../services/mockData';
import { cn } from '@/lib/utils';

const MATERIALS = ['All', 'Wood', 'Acrylic', 'Felt-lined', '3D Printed'];

const RampsScreen = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('All');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.category === 'Ramps' &&
        (selectedMaterial === 'All' || p.tags.includes(selectedMaterial))
    );
  }, [selectedMaterial]);

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <CategoryHeader title="RAMPAS" onSearchPress={() => {}} />

      {/* Filters */}
      <View className="py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
        >
          {MATERIALS.map((material) => (
            <Pressable
              key={material}
              onPress={() => setSelectedMaterial(material)}
              className={cn(
                'px-4 py-2 rounded-full border transition-all',
                selectedMaterial === material
                  ? 'bg-primary border-primary'
                  : 'bg-white/5 border-white/10'
              )}
            >
              <Text
                className={cn(
                  'text-xs font-bold tracking-widest uppercase',
                  selectedMaterial === material ? 'text-black' : 'text-white/60'
                )}
              >
                {material}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 40 }}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <ProductCard product={item} className="flex-1" />
        )}
        ListEmptyComponent={<EmptyState message={`No ${selectedMaterial} ramps found.`} />}
      />
    </View>
  );
};

export default RampsScreen;
