import React from 'react';
import { View, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Moon, Sun, Languages, BookOpen, Images } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português' },
];
const MIN_DRAWER_PADDING_BOTTOM = 20;

export const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const navigateToHome = () => {
    props.navigation.navigate('Main', { screen: 'Home' });
    props.navigation.closeDrawer();
  };

  const navigateToMenu = () => {
    props.navigation.navigate('Main', { screen: 'Menu' });
    props.navigation.closeDrawer();
  };

  const navigateToAbout = () => {
    props.navigation.navigate('Main', { screen: 'About' });
    props.navigation.closeDrawer();
  };

  const navigateToCategory = (route: string) => {
    props.navigation.navigate('Main', { screen: route });
    props.navigation.closeDrawer();
  };

  const cycleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex].code);
  };

  const currentLanguageLabel =
    LANGUAGES.find((l) => l.code === language)?.label ?? language;

  const iconColor = isDark ? '#fffbe8' : '#0b234a';
  return (
    <View className="flex-1 bg-background">
      {/* Scrollable area: header + navigation only */}
      <DrawerContentScrollView
        {...props}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-transparent px-4">
          {/* Header */}
          <View className="border-b border-border pb-4 mb-2 mt-2">
            <Text className="text-2xl font-bold text-foreground">
              {t('sidemenu.appName')}
            </Text>
          </View>

          {/* Navigation */}
          <View className="gap-1 mt-2">
            <Pressable
              onPress={navigateToHome}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Home size={28} color={iconColor} />
              <Text className="text-lg text-foreground">{t('sidemenu.home')}</Text>
            </Pressable>

            <Pressable
              onPress={navigateToMenu}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Images size={28} color={iconColor} />
              <Text className="text-lg text-foreground">{t('sidemenu.menu')}</Text>
            </Pressable>

            <Pressable
              onPress={navigateToAbout}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <BookOpen size={28} color={iconColor} />
              <Text className="text-lg text-foreground">{t('sidemenu.about')}</Text>
            </Pressable>

            <View className="h-px bg-border my-2 mx-3" />

            <Pressable
              onPress={() => navigateToCategory('Ramps')}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Text className="text-lg text-foreground">Rampas</Text>
            </Pressable>
            <Pressable
              onPress={() => navigateToCategory('Decks')}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Text className="text-lg text-foreground">Decks</Text>
            </Pressable>
            <Pressable
              onPress={() => navigateToCategory('DiceTower')}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Text className="text-lg text-foreground">Dice Tower</Text>
            </Pressable>
            <Pressable
              onPress={() => navigateToCategory('Acessorios')}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Text className="text-lg text-foreground">Acessórios</Text>
            </Pressable>
            <Pressable
              onPress={() => navigateToCategory('Xadrez')}
              className="flex-row items-center gap-3 rounded-md px-3 py-4 active:bg-accent"
            >
              <Text className="text-lg text-foreground">Xadrez</Text>
            </Pressable>
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Fixed bottom settings — outside ScrollView so it always stays visible
          and the bg-background covers the system navigation bar area */}
      <View
        className="border-t border-border px-4 pt-3 gap-2 bg-background"
        style={{ paddingBottom: Math.max(insets.bottom, MIN_DRAWER_PADDING_BOTTOM) }}
      >
        {/* Theme toggle */}
        <View className="flex-row items-center justify-between px-3 py-3">
          <View className="flex-row items-center gap-3">
            {isDark ? (
              <Moon size={28} color={iconColor} />
            ) : (
              <Sun size={28} color={iconColor} />
            )}
            <Text className="text-lg text-foreground">
              {isDark ? t('sidemenu.darkMode') : t('sidemenu.lightMode')}
            </Text>
          </View>
          <Toggle
            value={isDark}
            onValueChange={toggleTheme}
            activeColor="#d3b03b"
            inactiveColor="#3664a0"
          />
        </View>

        {/* Language toggle */}
        <Pressable
          onPress={cycleLanguage}
          className="flex-row items-center justify-between px-3 py-3 rounded-md active:bg-accent"
        >
          <View className="flex-row items-center gap-3">
            <Languages size={28} color={iconColor} />
            <Text className="text-lg text-foreground">{t('sidemenu.language')}</Text>
          </View>
          <Text className="text-base text-muted-foreground">{currentLanguageLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
};
