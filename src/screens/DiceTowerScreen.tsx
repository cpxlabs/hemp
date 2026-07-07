import React, { useState, useMemo } from 'react';
import { View, Pressable, ScrollView, FlatList } from 'react-native';
import { CategoryHeader } from '../components/CategoryHeader';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Text } from '../components/ui/text';
import Scene3D from '../components/Scene3D';
import { MOCK_PRODUCTS } from '../services/mockData';
import { cn } from '@/lib/utils';

const FILTERS = ['All', 'Wood', 'Resin', 'Featured'];

const DiceTowerScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.category === 'Dice Tower' &&
        (selectedFilter === 'All' || p.tags.includes(selectedFilter))
    );
  }, [selectedFilter]);

  const [activeProduct, setActiveProduct] = useState(filteredProducts[0] || MOCK_PRODUCTS[0]);

  React.useEffect(() => {
    if (filteredProducts.length > 0 && !filteredProducts.find(p => p.id === activeProduct.id)) {
      setActiveProduct(filteredProducts[0]);
    }
  }, [filteredProducts, activeProduct.id]);

  return (
    <View className="flex-1 bg-background">
      <CategoryHeader title="DICE TOWERS" />

      <View className="flex-1 flex-col lg:flex-row">
        {/* Immersive 3D Viewer */}
        <View className="flex-[1.5] lg:order-2 relative bg-black/20">
          <Scene3D
            category="Dice Tower"
            activeProductId={activeProduct.id}
            material={activeProduct.specs.find(s => s.label === 'Material')?.value || selectedFilter}
          />
          {activeProduct && (
            <View className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-none">
              <Text className="text-primary text-[10px] font-black tracking-widest uppercase mb-1">
                Visualização 3D
              </Text>
              <Text className="text-white text-lg font-bold uppercase">{activeProduct.name}</Text>
              <Text className="text-white/60 text-xs mt-1">{activeProduct.description}</Text>
            </View>
          )}
        </View>

        {/* Side Catalog Overlay */}
        <View className="flex-1 lg:order-1 border-r border-border/20 bg-card/60 backdrop-blur-xl p-6">
          <Text className="text-2xl font-black text-foreground uppercase tracking-tight italic mb-4">
            Catálogo de Torres
          </Text>

          {/* Filters */}
          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {FILTERS.map((f) => (
                <Pressable
                  key={f}
                  onPress={() => setSelectedFilter(f)}
                  className={cn(
                    'px-4 py-2 rounded-full border transition-all',
                    selectedFilter === f
                      ? 'bg-primary border-primary'
                      : 'bg-white/5 border-white/10'
                  )}
                >
                  <Text
                    className={cn(
                      'text-[10px] font-bold tracking-widest uppercase',
                      selectedFilter === f ? 'text-black' : 'text-foreground/60'
                    )}
                  >
                    {f}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Product Cards List */}
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => setActiveProduct(item)}
                className={cn(
                  'border-2 rounded-xl transition-all',
                  activeProduct.id === item.id ? 'border-primary' : 'border-transparent'
                )}
              />
            )}
            ListEmptyComponent={<EmptyState message={`Nenhuma torre de dados encontrada.`} />}
          />
        </View>
      </View>
    </View>
  );
};

export default DiceTowerScreen;
