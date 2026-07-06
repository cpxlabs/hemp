import React, { useEffect } from 'react';
import { View, Pressable, Platform, ScrollView } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { ShoppingCart, RotateCcw } from 'lucide-react-native';
import { useConfigurator } from '../providers/ConfiguratorProvider';

const PRODUCTS = [
  { id: 1, name: 'RAMPA PROFISSIONAL', price: 'R$ 899,00' },
  { id: 2, name: 'DECK CARBONIZED', price: 'R$ 349,00' },
  { id: 3, name: 'DICE TOWER HEMP', price: 'R$ 199,00' },
];

const MATERIALS = ['Carbonized Hemp Wood', 'Recycled Polymer', 'Natural Fiber'];
const FINISHES = ['Matte Recycled', 'Glossy Eco', 'Raw Texture'];

const CustomSelect = ({ label, options, value, onChange }: any) => {
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
        <Text className="text-[10px] text-white/40 uppercase mb-0.5 font-bold tracking-wider">{label}</Text>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '13px',
            width: '100%',
            outline: 'none',
            cursor: 'pointer',
            padding: '2px 0',
            fontWeight: '500'
          }}
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt} style={{ background: '#0A0A0A', color: 'white' }}>
              {opt}
            </option>
          ))}
        </select>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
       <Text className="text-[10px] text-white/40 uppercase mb-0.5 font-bold tracking-wider">{label}</Text>
       <Text className="text-white text-xs font-medium">{value}</Text>
    </View>
  );
};

export const ConfiguratorPanel = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { selections, setSelections, activeProductIndex, setActiveProductIndex } = useConfigurator();

  useEffect(() => {
    if (selections.length === 0) {
      setSelections(PRODUCTS.map(() => ({ material: MATERIALS[0], finish: FINISHES[0] })));
    }
  }, []);

  const updateSelection = (index: number, field: string, value: string) => {
    const newSelections = [...selections];
    newSelections[index] = { ...newSelections[index], [field]: value };
    setSelections(newSelections);
    setActiveProductIndex(index);
  };

  const resetSelections = () => {
    const defaultSelections = PRODUCTS.map(() => ({ material: MATERIALS[0], finish: FINISHES[0] }));
    setSelections(defaultSelections);
  };

  if (selections.length === 0) return null;

  const containerClasses = isMobile
    ? "absolute bottom-5 left-5 right-5 z-40 p-5 rounded-3xl bg-black/70 backdrop-blur-2xl border border-white/10"
    : "w-full max-w-[500px] p-8 rounded-[32px] bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50";

  return (
    <View className={containerClasses}>
      <Text className={`${isMobile ? 'text-xl' : 'text-3xl'} font-black tracking-tighter text-white mb-6 uppercase italic`}>
        Configurar seu produto
      </Text>

      <View className={`${isMobile ? 'gap-4' : 'gap-8'}`}>
        {PRODUCTS.map((product, idx) => (
          <Pressable
            key={product.id}
            onPress={() => setActiveProductIndex(idx)}
          >
            <View className={`gap-4 border-l-4 pl-4 py-1 ${idx === activeProductIndex ? 'border-primary opacity-100' : 'border-white/5 opacity-40'}`}>
              <View className="flex-row justify-between items-center">
                <Text className={`${isMobile ? 'text-sm' : 'text-lg'} font-black tracking-tight ${idx === activeProductIndex ? 'text-white' : 'text-white/50'}`}>
                  {product.name}
                </Text>
                <Text className={`${isMobile ? 'text-xs' : 'text-base'} text-primary font-mono font-bold tracking-tighter`}>{product.price}</Text>
              </View>

              <View className="flex-row gap-3">
                <CustomSelect
                  label="Material"
                  options={MATERIALS}
                  value={selections[idx]?.material}
                  onChange={(val: string) => updateSelection(idx, 'material', val)}
                />

                <CustomSelect
                  label="Acabamento"
                  options={FINISHES}
                  value={selections[idx]?.finish}
                  onChange={(val: string) => updateSelection(idx, 'finish', val)}
                />

                <Pressable
                  className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} items-center justify-center bg-primary rounded-xl active:scale-90`}
                >
                  <ShoppingCart size={isMobile ? 18 : 22} color="#000" strokeWidth={2.5} />
                </Pressable>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <View className={`flex-row gap-4 ${isMobile ? 'mt-6' : 'mt-12'}`}>
        <Button
          variant="outline"
          onPress={resetSelections}
          className={`flex-1 border-white/10 ${isMobile ? 'h-12' : 'h-16'} bg-white/5 rounded-xl`}
        >
          <RotateCcw size={18} color="white" />
          {!isMobile && <Text className="text-white font-bold uppercase tracking-widest ml-2">Reset</Text>}
        </Button>
        <Button className={`flex-[2] ${isMobile ? 'h-12' : 'h-16'} shadow-2xl shadow-primary/30 rounded-xl`} variant="default">
          <Text className={`text-black font-black uppercase tracking-widest ${isMobile ? 'text-sm' : 'text-lg'}`}>Finalizar Pedido</Text>
        </Button>
      </View>
    </View>
  );
};
