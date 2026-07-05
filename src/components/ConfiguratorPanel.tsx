import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { ShoppingCart, ChevronDown } from 'lucide-react-native';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTS = [
  { id: 1, name: 'RAMPA PROFISSIONAL', price: 'R$ 899,00' },
  { id: 2, name: 'DECK CARBONIZED', price: 'R$ 349,00' },
  { id: 3, name: 'DICE TOWER HEMP', price: 'R$ 199,00' },
];

const MATERIALS = ['Carbonized Hemp Wood', 'Recycled Polymer', 'Natural Fiber'];
const FINISHES = ['Matte Recycled', 'Glossy Eco', 'Raw Texture'];

const MotionView = motion.div;

const CustomSelect = ({ label, options, value, onChange }: any) => {
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1">
        <Text className="text-[10px] text-white/40 uppercase mb-0">{label}</Text>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '12px',
            width: '100%',
            outline: 'none',
            cursor: 'pointer',
            padding: '2px 0'
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
  return null; // Simplified for web-first verification
};

export const ConfiguratorPanel = () => {
  const [selections, setSelections] = useState(
    PRODUCTS.map(() => ({ material: MATERIALS[0], finish: FINISHES[0] }))
  );

  const updateSelection = (index: number, field: string, value: string) => {
    const newSelections = [...selections];
    newSelections[index] = { ...newSelections[index], [field]: value };
    setSelections(newSelections);
  };

  return (
    <MotionView
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        bottom: 40,
        left: 40,
        zIndex: 40,
        width: 'calc(100% - 80px)',
        maxWidth: 500,
        padding: 24,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Text className="text-2xl font-bold tracking-tighter text-white mb-6 uppercase">
        Configurar seu produto
      </Text>

      <View className="gap-6">
        {PRODUCTS.map((product, idx) => (
          <View key={product.id} className="gap-3 border-b border-white/5 pb-6 last:border-0">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-bold text-white tracking-wide">{product.name}</Text>
              <Text className="text-xs text-primary font-mono">{product.price}</Text>
            </View>

            <View className="flex-row gap-3">
              <CustomSelect
                label="Material"
                options={MATERIALS}
                value={selections[idx].material}
                onChange={(val: string) => updateSelection(idx, 'material', val)}
              />

              <CustomSelect
                label="Acabamento"
                options={FINISHES}
                value={selections[idx].finish}
                onChange={(val: string) => updateSelection(idx, 'finish', val)}
              />

              <Pressable
                className="w-12 items-center justify-center bg-primary rounded active:opacity-70 transition-opacity"
              >
                <ShoppingCart size={18} color="#000" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <Button className="w-full mt-6 h-12 border-0" variant="default">
        <Text className="text-black font-bold uppercase tracking-widest">Finalizar Pedido</Text>
      </Button>
    </MotionView>
  );
};
