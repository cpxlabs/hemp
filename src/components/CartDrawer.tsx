/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { View, Image, Pressable, ScrollView, TextInput, Platform } from 'react-native';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, CheckCircle } from 'lucide-react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { useCart } from '../providers/CartProvider';
import { useTheme } from '../providers/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';

const MotionDiv = motion.div;

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalAmount,
    clearCart
  } = useCart();
  const { isDark } = useTheme();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset steps after brief delay
    setTimeout(() => {
      setCheckoutStep('cart');
    }, 300);
  };

  const handleCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePay = () => {
    // Perform simulated verification
    setCheckoutStep('success');
    clearCart();
  };

  const panelBg = isDark
    ? 'bg-black/90 border-white/10 text-white'
    : 'bg-white/95 border-black/10 text-foreground';

  const accentColor = isDark ? '#39FF14' : '#c49a3a';
  const dividerColor = isDark ? 'border-white/10' : 'border-black/5';

  return (
    <AnimatePresence>
      <View
        style={{
          position: 'fixed' as any,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex' as any,
          justifyContent: 'flex-end',
        }}
      >
        {/* Backdrop clickable area */}
        <Pressable style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onPress={handleClose} />

        <MotionDiv
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`w-full max-w-md h-full flex flex-col border-l shadow-2xl relative z-10 ${panelBg}`}
          style={{ height: '100%' }}
        >
          {/* Header */}
          <View className={`flex-row justify-between items-center px-6 py-5 border-b ${dividerColor}`}>
            <View className="flex-row items-center gap-2">
              <ShoppingBag size={20} color={accentColor} />
              <Text className="text-xl font-black uppercase tracking-tight italic">
                {checkoutStep === 'cart' && 'Carrinho'}
                {checkoutStep === 'checkout' && 'Pagamento'}
                {checkoutStep === 'success' && 'Sucesso!'}
              </Text>
            </View>
            <Pressable onPress={handleClose} className="p-1 rounded-full hover:bg-foreground/10 active:scale-95">
              <X size={22} color={isDark ? 'white' : 'black'} />
            </Pressable>
          </View>

          {/* Cart Step */}
          {checkoutStep === 'cart' && (
            <React.Fragment>
              <ScrollView className="flex-1 px-6 py-4">
                {cartItems.length === 0 ? (
                  <View className="flex-1 items-center justify-center py-20 gap-4 opacity-60">
                    <ShoppingBag size={48} color={isDark ? '#333' : '#bbb'} />
                    <Text className="text-center text-sm font-semibold italic text-muted-foreground">
                      Seu carrinho está vazio.
                    </Text>
                  </View>
                ) : (
                  <View className="gap-4">
                    {cartItems.map((item) => (
                      <View
                        key={`${item.id}-${item.material}-${item.finish}`}
                        className={`flex-row gap-4 p-3 rounded-xl border bg-foreground/5 ${dividerColor}`}
                      >
                        <Image
                          source={{ uri: item.imageUrl }}
                          className="w-16 h-16 rounded-lg bg-foreground/5"
                          resizeMode="cover"
                        />
                        <View className="flex-1 justify-between">
                          <View>
                            <Text className="font-bold text-sm leading-tight text-foreground uppercase tracking-tight">
                              {item.name}
                            </Text>
                            <Text className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                              {item.material} / {item.finish}
                            </Text>
                          </View>
                          <View className="flex-row justify-between items-center mt-2">
                            <View className="flex-row items-center gap-2 border border-border/40 rounded-lg px-2 py-0.5">
                              <Pressable onPress={() => updateQuantity(item.id, item.material, item.finish, item.quantity - 1)}>
                                <Minus size={12} color={isDark ? 'white' : 'black'} />
                              </Pressable>
                              <Text className="text-xs font-bold w-4 text-center">{item.quantity}</Text>
                              <Pressable onPress={() => updateQuantity(item.id, item.material, item.finish, item.quantity + 1)}>
                                <Plus size={12} color={isDark ? 'white' : 'black'} />
                              </Pressable>
                            </View>
                            <View className="flex-row items-center gap-3">
                              <Text className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</Text>
                              <Pressable onPress={() => removeFromCart(item.id, item.material, item.finish)}>
                                <Trash2 size={14} color="#ef4444" />
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>

              {/* Summary */}
              {cartItems.length > 0 && (
                <View className={`p-6 border-t ${dividerColor} bg-foreground/5`}>
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-base font-bold text-muted-foreground uppercase tracking-wider text-xs">Total</Text>
                    <Text className="text-2xl font-black text-foreground">${totalAmount.toFixed(2)}</Text>
                  </View>
                  <Button className="w-full h-12 rounded-xl shadow-lg" variant="default" onPress={handleCheckout}>
                    <Text className="text-primary-foreground font-black uppercase tracking-widest text-sm">Fechar Pedido</Text>
                  </Button>
                </View>
              )}
            </React.Fragment>
          )}

          {/* Checkout Step */}
          {checkoutStep === 'checkout' && (
            <React.Fragment>
              <ScrollView className="flex-1 px-6 py-4 gap-6">
                <Text className="text-sm text-muted-foreground uppercase tracking-widest font-black mb-2">Simulação de Pagamento</Text>
                
                <View className="gap-4">
                  <View className="gap-1">
                    <Text className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Número do Cartão</Text>
                    <TextInput
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      placeholder="4000 1234 5678 9010"
                      placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                      className={`h-11 rounded-lg px-3 text-sm text-foreground bg-foreground/5 border ${dividerColor}`}
                    />
                  </View>

                  <View className="gap-1">
                    <Text className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Nome Impresso</Text>
                    <TextInput
                      value={cardName}
                      onChangeText={setCardName}
                      placeholder="JOÃO SILVA"
                      placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                      className={`h-11 rounded-lg px-3 text-sm text-foreground bg-foreground/5 border ${dividerColor}`}
                    />
                  </View>

                  <View className="flex-row gap-4">
                    <View className="flex-1 gap-1">
                      <Text className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Validade</Text>
                      <TextInput
                        value={cardExpiry}
                        onChangeText={setCardExpiry}
                        placeholder="MM/AA"
                        placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                        className={`h-11 rounded-lg px-3 text-sm text-foreground bg-foreground/5 border ${dividerColor}`}
                      />
                    </View>
                    <View className="flex-1 gap-1">
                      <Text className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">CVV</Text>
                      <TextInput
                        value={cardCvv}
                        onChangeText={setCardCvv}
                        placeholder="123"
                        placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                        className={`h-11 rounded-lg px-3 text-sm text-foreground bg-foreground/5 border ${dividerColor}`}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View className={`p-6 border-t ${dividerColor} bg-foreground/5 gap-3`}>
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Valor total</Text>
                  <Text className="text-xl font-bold text-foreground">${totalAmount.toFixed(2)}</Text>
                </View>
                <Button className="w-full h-12 rounded-xl" variant="default" onPress={handlePay}>
                  <CreditCard size={18} color={isDark ? 'black' : 'white'} />
                  <Text className="text-primary-foreground font-black uppercase tracking-widest text-sm ml-2">Confirmar e Pagar</Text>
                </Button>
                <Button className="w-full h-12 rounded-xl bg-transparent border border-border/40" variant="outline" onPress={() => setCheckoutStep('cart')}>
                  <Text className="text-foreground font-bold uppercase tracking-wider text-xs">Voltar ao Carrinho</Text>
                </Button>
              </View>
            </React.Fragment>
          )}

          {/* Success Step */}
          {checkoutStep === 'success' && (
            <View className="flex-1 justify-center items-center px-6 gap-6">
              <CheckCircle size={64} color={accentColor} />
              <View className="gap-2">
                <Text className="text-2xl font-black text-center uppercase tracking-tight italic">Pedido Confirmado!</Text>
                <Text className="text-sm text-center text-muted-foreground leading-6">
                  Seu pedido de equipamentos Hemp Ramps sustentáveis foi processado com sucesso. A engenharia da CPX Labs já iniciou a produção do seu pedido 3D personalizado!
                </Text>
              </View>
              <Button className="w-full h-12 rounded-xl mt-4" variant="default" onPress={handleClose}>
                <Text className="text-primary-foreground font-black uppercase tracking-widest text-xs">Concluir</Text>
              </Button>
            </View>
          )}
        </MotionDiv>
      </View>
    </AnimatePresence>
  );
};
