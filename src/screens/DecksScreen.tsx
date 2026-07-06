import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable, ScrollView } from 'react-native';
import { CategoryHeader } from '../components/CategoryHeader';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Text } from '../components/ui/text';
import { MOCK_PRODUCTS } from '../services/mockData';
import { cn } from '@/lib/utils';

const FORMATS = ['All', 'Standard', 'Mini', 'Tarot', 'Double-Sleeved'];

const DecksScreen = () => {
  const [selectedFormat, setSelectedFormat] = useState('All');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.category === 'Decks' &&
        (selectedFormat === 'All' || p.tags.includes(selectedFormat))
    );
  }, [selectedFormat]);

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <CategoryHeader title="DECKS" onSearchPress={() => {}} onFilterPress={() => {}} />

      {/* Format Filters */}
      <View className="py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
        >
          {FORMATS.map((format) => (
            <Pressable
              key={format}
              onPress={() => setSelectedFormat(format)}
              className={cn(
                'px-4 py-2 rounded-full border transition-all',
                selectedFormat === format
                  ? 'bg-primary border-primary'
                  : 'bg-white/5 border-white/10'
              )}
            >
              <Text
                className={cn(
                  'text-xs font-bold tracking-widest uppercase',
                  selectedFormat === format ? 'text-black' : 'text-white/60'
                )}
              >
                {format}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, gap: 20, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <ProductCard product={item} orientation="horizontal" />
        )}
        ListEmptyComponent={<EmptyState message={`No ${selectedFormat} deck boxes found.`} />}
      />
    </View>
  );
};

export default DecksScreen;
