import React from 'react';
import { View, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Camera, BookOpen, TreeDeciduous } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { MenuButton } from '@/components/ui/menu-button';

const GOLD = '#c59b27';
const GOLD_LIGHT = '#e6c280';

/** Stylised family-tree / share-nodes icon (Heroicons outline) */
const FamilyTreeIcon: React.FC = () => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={1.5}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V9.75M12 9.75a3.375 3.375 0 1 1 0-6.75 3.375 3.375 0 0 1 0 6.75ZM21 14.25a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm-13.5 0a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z"
    />
  </Svg>
);

interface CollectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, description, icon }) => (
  <View className="relative overflow-hidden rounded-lg border border-wood-border bg-wood-card p-6 shadow-lg">
    {/* Left gold accent bar */}
    <View className="absolute left-0 top-0 bottom-0 w-1 bg-gold/20 rounded-l-lg" />
    <View className="pl-4 flex-row items-center justify-between">
      <View className="flex-1 mr-4">
        <Text className="font-serif text-lg font-semibold text-gold mb-2">{title}</Text>
        <Text className="text-gold-soft text-sm leading-5">{description}</Text>
      </View>
      <View className="opacity-30">{icon}</View>
    </View>
  </View>
);

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-wood-darkest">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* ── Hero Section ─────────────────────────────────────────── */}
        <View className="bg-wood-mid px-6 pt-20 pb-14 items-center border-b border-wood-border">

          {/* Tree icon badge */}
          <View className="w-16 h-16 rounded-full border border-gold-antique/40 items-center justify-center bg-wood-dark mb-5">
            <FamilyTreeIcon />
          </View>

          <Text className="font-display text-5xl text-gold text-center tracking-wide drop-shadow">
            {t('home.title')}
          </Text>

          <Text className="font-serif italic text-xl text-gold-muted text-center mt-3">
            {t('home.subtitle')}
          </Text>

          <Text className="text-sm text-gold-sand text-center mt-4 max-w-xs leading-6">
            {t('home.heroTagline')}
          </Text>

          <View className="flex-row flex-wrap justify-center gap-3 mt-8">
            <Button
              onPress={() => navigation.navigate('Menu')}
              className="bg-wood-darkest border border-gold/40 px-6"
            >
              <Text className="text-gold font-medium">{t('home.viewAlbums')}</Text>
            </Button>
            <Button
              variant="outline"
              onPress={() => navigation.navigate('About')}
              className="border-gold/30 px-6"
            >
              <Text className="text-gold-muted">{t('home.learnMore')}</Text>
            </Button>
          </View>
        </View>

        {/* ── About Preview ─────────────────────────────────────────── */}
        <View className="items-center px-6 py-12">
          <Text className="font-serif text-2xl text-gold text-center">
            {t('home.aboutTitle')}
          </Text>
          <Text className="text-gold-soft text-base text-center mt-4 max-w-lg leading-7 font-light">
            {t('home.aboutText')}
          </Text>

          {/* Decorative gold separator */}
          <View className="w-24 h-px bg-gold/30 mt-10" />
        </View>

        {/* ── Featured Collections ──────────────────────────────────── */}
        <View className="px-6 pb-12">
          <Text className="font-display text-xl text-gold/80 text-center tracking-widest mb-8">
            {t('home.featuredTitle')}
          </Text>

          <View className="gap-4 max-w-lg mx-auto w-full">
            <CollectionCard
              title={t('home.featuredPortraits')}
              description={t('home.featuredPortraitsDesc')}
              icon={<Camera size={48} color={GOLD_LIGHT} />}
            />
            <CollectionCard
              title={t('home.featuredTraditions')}
              description={t('home.featuredTraditionsDesc')}
              icon={<BookOpen size={48} color={GOLD_LIGHT} />}
            />
            <CollectionCard
              title={t('home.featuredHeritage')}
              description={t('home.featuredHeritageDesc')}
              icon={<TreeDeciduous size={48} color={GOLD_LIGHT} />}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
