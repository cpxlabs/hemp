import React, { useEffect } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { ShoppingCart, RotateCcw, X, Sliders } from 'lucide-react-native';
import { useConfigurator } from '../providers/ConfiguratorProvider';
import { useTheme } from '../providers/ThemeProvider';
import { useCart } from '../providers/CartProvider';

const PRODUCTS = [
  { id: 1, name: 'RAMPA PROFISSIONAL', price: 'R$ 899,00' },
  { id: 2, name: 'DECK CARBONIZED', price: 'R$ 349,00' },
  { id: 3, name: 'DICE TOWER HEMP', price: 'R$ 199,00' },
];

const MATERIALS = ['Carbonized Hemp Wood', 'Recycled Polymer', 'Natural Fiber'];
const FINISHES = ['Matte Recycled', 'Glossy Eco', 'Raw Texture'];

const CustomSelect = ({ label, options, value, onChange, isDark }: any) => {
  const labelColor = isDark ? 'text-white/40' : 'text-foreground/50';
  const textColor = isDark ? 'white' : '#111111';
  const optionBg = isDark ? '#0A0A0A' : '#f7f0e6';
  const optionColor = isDark ? 'white' : '#111111';
  const containerBorder = isDark ? 'border-white/10 bg-white/5' : 'border-border/30 bg-foreground/5';

  if (Platform.OS === 'web') {
    return (
      <View className={`flex-1 border rounded-lg px-3 py-1.5 ${containerBorder}`}>
        <Text className={`text-[9px] uppercase mb-0.5 font-bold tracking-wider ${labelColor}`}>{label}</Text>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            background: 'transparent',
            color: textColor,
            border: 'none',
            fontSize: '12px',
            width: '100%',
            outline: 'none',
            cursor: 'pointer',
            padding: '2px 0',
            fontWeight: '600'
          }}
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt} style={{ background: optionBg, color: optionColor }}>
              {opt}
            </option>
          ))}
        </select>
      </View>
    );
  }
  return (
    <View className={`flex-1 border rounded-lg px-3 py-1.5 ${containerBorder}`}>
       <Text className={`text-[9px] uppercase mb-0.5 font-bold tracking-wider ${labelColor}`}>{label}</Text>
       <Text className="text-foreground text-xs font-semibold">{value}</Text>
    </View>
  );
};

export const ConfiguratorPanel = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { selections, setSelections, activeProductIndex, setActiveProductIndex, isRampCollapsed, setIsRampCollapsed, lightsColor, setLightsColor } = useConfigurator();
  const [isMinimized, setIsMinimized] = React.useState(false);
  const { isDark } = useTheme();
  const { addToCart, setIsCartOpen } = useCart();

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

  const handleAddToCart = (idx: number) => {
    const product = PRODUCTS[idx];
    // Parse price: "R$ 899,00" -> 899.00
    const rawPrice = parseFloat(product.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
    addToCart({
      id: `conf-${product.id}`,
      name: product.name,
      price: rawPrice,
      material: selections[idx]?.material || MATERIALS[0],
      finish: selections[idx]?.finish || FINISHES[0],
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
      category: idx === 0 ? 'Ramps' : idx === 1 ? 'Decks' : 'Dice Tower'
    });
  };

  const handleCheckoutFlow = () => {
    handleAddToCart(activeProductIndex);
    setIsCartOpen(true);
  };

  if (selections.length === 0) return null;

  if (isMinimized) {
    const minimizeBtnBg = isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-border/40';
    const minimizeBtnPos = isMobile
      ? 'absolute bottom-5 right-5'
      : 'absolute top-24 right-8';
    
    return (
      <Pressable
        onPress={() => setIsMinimized(false)}
        className={`${minimizeBtnPos} z-40 flex-row items-center gap-2 px-5 py-3 rounded-full border shadow-lg backdrop-blur-md active:scale-95 transition-all ${minimizeBtnBg}`}
      >
        <Sliders size={14} color={isDark ? '#39FF14' : '#000'} />
        <Text className="text-foreground font-black uppercase text-[10px] tracking-widest">
          Customizar
        </Text>
      </Pressable>
    );
  }

  const bgClasses = isDark
    ? "bg-black/60 border-white/10 shadow-2xl shadow-black/50"
    : "bg-white/70 border-border/40 shadow-xl shadow-black/5";

  const containerClasses = isMobile
    ? `absolute bottom-5 left-5 right-5 z-40 p-5 rounded-3xl backdrop-blur-2xl border ${bgClasses}`
    : `w-full max-w-[500px] p-8 rounded-[32px] backdrop-blur-2xl border shadow-2xl ${bgClasses}`;

  const headingColor = isDark ? 'text-white' : 'text-foreground';
  const cartIconColor = isDark ? '#000' : '#fff';
  const resetBtnBorder = isDark ? 'border-white/10 bg-white/5' : 'border-border/30 bg-foreground/5';

  return (
    <View className={containerClasses}>
      <Pressable
        onPress={() => setIsMinimized(true)}
        className="absolute top-4 right-4 z-50 w-8 h-8 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 active:scale-95"
      >
        <X size={16} color={isDark ? '#ffffff' : '#111111'} />
      </Pressable>
      <Text className={`${isMobile ? 'text-xl' : 'text-3xl'} font-black tracking-tighter ${headingColor} mb-6 uppercase italic`}>
        Configurar seu produto
      </Text>

      <View className={`${isMobile ? 'gap-4' : 'gap-8'}`}>
        {PRODUCTS.map((product, idx) => (
          <Pressable
            key={product.id}
            onPress={() => setActiveProductIndex(idx)}
          >
            <View className={`gap-4 border-l-4 pl-4 py-1 ${idx === activeProductIndex ? 'border-primary opacity-100' : 'border-foreground/5 opacity-40'}`}>
              <View className="flex-row justify-between items-center">
                <Text className={`${isMobile ? 'text-sm' : 'text-lg'} font-black tracking-tight ${idx === activeProductIndex ? headingColor : 'text-foreground/50'}`}>
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
                  isDark={isDark}
                />

                <CustomSelect
                  label="Acabamento"
                  options={FINISHES}
                  value={selections[idx]?.finish}
                  onChange={(val: string) => updateSelection(idx, 'finish', val)}
                  isDark={isDark}
                />

                <Pressable
                  onPress={() => handleAddToCart(idx)}
                  className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} items-center justify-center bg-primary rounded-xl active:scale-95 shadow-sm`}
                >
                  <ShoppingCart size={isMobile ? 18 : 20} color={cartIconColor} strokeWidth={2.5} />
                </Pressable>
              </View>
              {idx === 0 && activeProductIndex === 0 && (
                <View className="flex-row items-center justify-between mt-3 bg-foreground/5 rounded-xl px-4 py-2 border border-border/20">
                  <View>
                    <Text className="text-xs font-bold text-foreground">Estrutura Dobrável</Text>
                    <Text className="text-[9px] text-muted-foreground">Recolhe as rampas laterais para transporte</Text>
                  </View>
                  <Pressable
                    onPress={() => setIsRampCollapsed(!isRampCollapsed)}
                    className={`w-10 h-6 rounded-full p-0.5 justify-center ${isRampCollapsed ? 'bg-primary items-end' : 'bg-foreground/25 items-start'}`}
                  >
                    <View className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </Pressable>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>
      
      {/* RGB Lighting Color Selector */}
      <View className="mt-4 px-4 py-3 bg-foreground/5 rounded-xl border border-border/20">
        <Text className="text-[10px] font-bold text-foreground mb-2">COR DAS LUZES RGB (SECUNDÁRIAS)</Text>
        <View className="flex-row gap-3">
          {[
            { name: 'Green', hex: '#39FF14' },
            { name: 'Pink', hex: '#FF1493' },
            { name: 'Blue', hex: '#00E5FF' },
            { name: 'Purple', hex: '#BD00FF' },
            { name: 'Orange', hex: '#FF4500' },
            { name: 'White', hex: '#FFFFFF' }
          ].map((col) => (
            <Pressable
              key={col.hex}
              onPress={() => setLightsColor(col.hex)}
              className="w-8 h-8 rounded-full items-center justify-center active:scale-90 border border-white/20"
              style={{
                backgroundColor: col.hex,
                borderColor: lightsColor === col.hex ? '#ffffff' : 'rgba(255,255,255,0.2)'
              }}
            >
              {lightsColor === col.hex && (
                <View className="w-2.5 h-2.5 rounded-full bg-black/60" />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <View className={`flex-row gap-4 ${isMobile ? 'mt-6' : 'mt-10'}`}>
        <Button
          variant="outline"
          onPress={resetSelections}
          className={`flex-1 ${resetBtnBorder} ${isMobile ? 'h-12' : 'h-14'} rounded-xl`}
        >
          <RotateCcw size={18} color={isDark ? 'white' : 'black'} />
          {!isMobile && <Text className="text-foreground font-bold uppercase tracking-widest ml-2 text-xs">Reset</Text>}
        </Button>
        <Button
          onPress={handleCheckoutFlow}
          className={`flex-[2] ${isMobile ? 'h-12' : 'h-14'} shadow-lg rounded-xl`}
          variant="default"
        >
          <Text className={`text-primary-foreground font-black uppercase tracking-widest ${isMobile ? 'text-xs' : 'text-sm'}`}>Finalizar Pedido</Text>
        </Button>
      </View>
    </View>
  );
};
