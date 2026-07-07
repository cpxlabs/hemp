import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AlbumsScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

type CatalogItem = {
  nameKey: string;
  descKey: string;
};

const CATALOG_SECTIONS: { titleKey: string; items: CatalogItem[] }[] = [
  {
    titleKey: 'albums.portraits',
    items: [
      { nameKey: 'albums.portraitName', descKey: 'albums.portraitDesc' },
      { nameKey: 'albums.couplePortraitName', descKey: 'albums.couplePortraitDesc' },
      { nameKey: 'albums.childrenPortraitName', descKey: 'albums.childrenPortraitDesc' },
    ],
  },
  {
    titleKey: 'albums.milestones',
    items: [
      { nameKey: 'albums.birthdayName', descKey: 'albums.birthdayDesc' },
      { nameKey: 'albums.graduationName', descKey: 'albums.graduationDesc' },
      { nameKey: 'albums.weddingName', descKey: 'albums.weddingDesc' },
    ],
  },
  {
    titleKey: 'albums.traditions',
    items: [
      { nameKey: 'albums.holidayName', descKey: 'albums.holidayDesc' },
      { nameKey: 'albums.recipesName', descKey: 'albums.recipesDesc' },
    ],
  },
  {
    titleKey: 'albums.heritage',
    items: [
      { nameKey: 'albums.vintageName', descKey: 'albums.vintageDesc' },
      { nameKey: 'albums.ancestryName', descKey: 'albums.ancestryDesc' },
    ],
  },
];

const CatalogScreen: React.FC = () => {
  const navigation = useNavigation<AlbumsScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-card border-b border-border/20 px-8 pt-20 pb-10 items-center">
          <Text className="text-5xl font-black text-foreground text-center uppercase tracking-tighter italic">
            {t('albums.title')}
          </Text>
          <Text className="text-sm text-primary font-bold uppercase tracking-widest text-center mt-2">
            {t('albums.subtitle')}
          </Text>
        </View>

        {/* Catalog Sections */}
        <View className="px-6 py-8 items-center">
          <View className="w-full max-w-lg gap-8">
            {CATALOG_SECTIONS.map((section) => (
              <View key={section.titleKey} className="gap-4">
                <Text className="text-2xl font-black text-primary border-b border-border/30 pb-2 uppercase tracking-tight italic">
                  {t(section.titleKey)}
                </Text>
                {section.items.map((item) => (
                  <Card key={item.nameKey} className="w-full border-border/40 bg-card">
                    <CardHeader>
                      <CardTitle className="text-foreground font-bold">{t(item.nameKey)}</CardTitle>
                      <CardDescription className="text-muted-foreground">{t(item.descKey)}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Back Button */}
        <View className="px-8 pb-10 items-center">
          <Button
            variant="outline"
            onPress={() => navigation.goBack()}
            className="w-full max-w-lg border-border/40"
          >
            <Text className="text-foreground font-bold">{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default CatalogScreen;
