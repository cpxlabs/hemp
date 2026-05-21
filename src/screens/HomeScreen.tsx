import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <View className="bg-primary px-8 pt-20 pb-12 items-center">
          <Text className="text-5xl font-extrabold text-primary-foreground text-center tracking-tight">
            {t('home.title')}
          </Text>
          <Text className="text-xl text-primary-foreground/80 text-center mt-3 italic">
            {t('home.subtitle')}
          </Text>
          <Text className="text-base text-primary-foreground/70 text-center mt-4 max-w-md">
            {t('home.heroTagline')}
          </Text>
          <View className="flex-row gap-3 mt-6">
            <Button
              onPress={() => navigation.navigate('Menu')}
              className="bg-accent"
            >
              <Text className="text-accent-foreground font-semibold">{t('home.viewAlbums')}</Text>
            </Button>
            <Button
              variant="outline"
              onPress={() => navigation.navigate('About')}
              className="border-primary-foreground/30"
            >
              <Text className="text-primary-foreground">{t('home.learnMore')}</Text>
            </Button>
          </View>
        </View>

        {/* About Preview */}
        <View className="px-8 py-10 items-center">
          <Text className="text-2xl font-bold text-foreground text-center">
            {t('home.aboutTitle')}
          </Text>
          <Text className="text-base text-muted-foreground text-center mt-3 max-w-lg leading-6">
            {t('home.aboutText')}
          </Text>
        </View>

        {/* Featured Collections */}
        <View className="px-8 pb-10 items-center">
          <Text className="text-2xl font-bold text-foreground text-center mb-6">
            {t('home.featuredTitle')}
          </Text>
          <View className="w-full max-w-lg gap-4">
            <Card className="w-full border-accent/30">
              <CardHeader>
                <CardTitle className="text-secondary">{t('home.featuredPortraits')}</CardTitle>
                <CardDescription>{t('home.featuredPortraitsDesc')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-full border-accent/30">
              <CardHeader>
                <CardTitle className="text-secondary">{t('home.featuredTraditions')}</CardTitle>
                <CardDescription>{t('home.featuredTraditionsDesc')}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-full border-accent/30">
              <CardHeader>
                <CardTitle className="text-secondary">{t('home.featuredHeritage')}</CardTitle>
                <CardDescription>{t('home.featuredHeritageDesc')}</CardDescription>
              </CardHeader>
            </Card>
          </View>

          <Button
            onPress={() => navigation.navigate('Menu')}
            className="mt-6"
          >
            <Text>{t('home.viewAlbums')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
