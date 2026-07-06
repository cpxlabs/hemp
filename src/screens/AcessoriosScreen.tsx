import React, { useMemo } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { CategoryHeader } from '../components/CategoryHeader';
import { ProductCard } from '../components/ProductCard';
import { Text } from '../components/ui/text';
import { MOCK_PRODUCTS } from '../services/mockData';

const SUB_CATEGORIES = ['Para RPG', 'Para Card Games', 'Organizadores', 'Counters', 'Custom Dice'];

const AcessoriosScreen = () => {
  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.category === 'Acessórios');
  }, []);

  const sections = useMemo(() => {
    return SUB_CATEGORIES.map(sub => ({
      title: sub,
      data: products.filter(p => p.tags.includes(sub))
    })).filter(section => section.data.length > 0);
  }, [products]);

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <CategoryHeader title="ACESSÓRIOS" onSearchPress={() => {}} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {sections.map((section) => (
          <View key={section.title} className="mt-8">
            <View className="px-6 flex-row items-center justify-between mb-4">
              <Text className="text-white text-lg font-bold tracking-tight uppercase">
                {section.title}
              </Text>
              <Text className="text-primary text-xs font-bold uppercase tracking-widest">
                See All
              </Text>
            </View>

            <FlatList
              horizontal
              data={section.data}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              renderItem={({ item }) => (
                <ProductCard product={item} className="w-64" />
              )}
            />
          </View>
        ))}

        {sections.length === 0 && (
          <View className="flex-1 items-center justify-center p-20 opacity-20">
             <Text className="text-white text-center italic">No accessories found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AcessoriosScreen;
