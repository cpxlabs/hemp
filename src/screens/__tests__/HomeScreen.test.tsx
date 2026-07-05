import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

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
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays Hemp Ramps branding', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/HEMP RAMPS/)).toBeTruthy();
  });

  it('has navigation links', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('RAMPAS')).toBeTruthy();
    expect(getByText('DECKS')).toBeTruthy();
    expect(getByText('ACESSÓRIOS')).toBeTruthy();
  });

  it('displays configurator panel', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/Configurar seu produto/i)).toBeTruthy();
  });
});
