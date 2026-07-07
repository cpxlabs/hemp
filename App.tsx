import './reanimated-web-polyfill';
import './global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorBoundary from './src/components/ErrorBoundary';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { LanguageProvider } from './src/providers/LanguageProvider';
import { AuthProvider } from './src/providers/AuthProvider';
import { AdProvider } from './src/providers/AdProvider';
import { ToastProvider } from './src/providers/ToastProvider';
import { ConfiguratorProvider } from './src/providers/ConfiguratorProvider';
import { CartProvider } from './src/providers/CartProvider';
import { CartDrawer } from './src/components/CartDrawer';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n';

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <AdProvider>
                <ToastProvider>
                  <ConfiguratorProvider>
                    <CartProvider>
                      <AppNavigator />
                      <CartDrawer />
                    </CartProvider>
                  </ConfiguratorProvider>
                </ToastProvider>
              </AdProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
