import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { CategoryHeader } from '../components/CategoryHeader';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Text } from '../components/ui/text';
import { MOCK_PRODUCTS } from '../services/mockData';
import { cn } from '@/lib/utils';

const FILTERS = ['All', 'Complete Sets', 'Boards Only', 'Pieces Only'];

const XadrezScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.category === 'Xadrez' &&
        (selectedFilter === 'All' || p.tags.includes(selectedFilter))
    );
  }, [selectedFilter]);

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <CategoryHeader title="XADREZ" onSearchPress={() => {}} />

      {/* Elegant Filter Toggle */}
      <View className="px-6 py-6">
        <View className="flex-row bg-white/5 p-1 rounded-lg border border-white/10">
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setSelectedFilter(f)}
              className={cn(
                'flex-1 py-2 rounded-md transition-all items-center justify-center',
                selectedFilter === f ? 'bg-primary' : ''
              )}
            >
              <Text
                className={cn(
                  'text-[10px] font-bold tracking-widest uppercase text-center',
                  selectedFilter === f ? 'text-black' : 'text-white/40'
                )}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View className="gap-4">
             <ProductCard product={item} orientation="horizontal" className="h-48" />
             <View className="flex-row gap-4 px-2">
                {item.specs.map(spec => (
                  <View key={spec.label} className="flex-1">
                    <Text className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">{spec.label}</Text>
                    <Text className="text-xs text-white/80 font-medium" numberOfLines={1}>{spec.value}</Text>
                  </View>
                ))}
             </View>
             <View className="h-px bg-white/5 mt-4" />
          </View>
        )}
        ListEmptyComponent={<EmptyState message={`No ${selectedFilter} items available.`} />}
      />
    </View>
  );
};

export default XadrezScreen;
