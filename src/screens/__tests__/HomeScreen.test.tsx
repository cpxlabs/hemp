/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { ConfiguratorProvider } from '../../providers/ConfiguratorProvider';

// Mock ThemeProvider
jest.mock('../../providers/ThemeProvider', () => ({
  useTheme: () => ({
    theme: 'dark',
    isDark: true,
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
  }),
}));

// Mock CartProvider
jest.mock('../../providers/CartProvider', () => ({
  useCart: () => ({
    cartItems: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    totalAmount: 0,
    totalItems: 0,
    isCartOpen: false,
    setIsCartOpen: jest.fn(),
  }),
}));

// Mock Scene3D
jest.mock('../../components/Scene3D', () => {
  const { View } = require('react-native');
  return () => <View testID="mock-scene-3d" />;
});

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { View } = require('react-native');
      return <View {...props}>{children}</View>;
    },
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <ConfiguratorProvider>
        <HomeScreen />
      </ConfiguratorProvider>
    );
    expect(toJSON()).toBeTruthy();
  });

  it('displays Hemp Ramps branding', () => {
    const { getByText } = render(
      <ConfiguratorProvider>
        <HomeScreen />
      </ConfiguratorProvider>
    );
    expect(getByText(/HEMP RAMPS/)).toBeTruthy();
  });

  it('has navigation links', () => {
    const { getByText } = render(
      <ConfiguratorProvider>
        <HomeScreen />
      </ConfiguratorProvider>
    );
    expect(getByText('RAMPAS')).toBeTruthy();
    expect(getByText('DECKS')).toBeTruthy();
    expect(getByText('ACESSÓRIOS')).toBeTruthy();
  });

  it('displays configurator panel', () => {
    const { getAllByText } = render(
      <ConfiguratorProvider>
        <HomeScreen />
      </ConfiguratorProvider>
    );
    expect(getAllByText(/Configurar seu produto/i).length).toBeGreaterThan(0);
  });
});
