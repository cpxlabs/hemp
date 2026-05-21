import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MenuScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

type AlbumItem = {
  nameKey: string;
  descKey: string;
};

const ALBUM_SECTIONS: { titleKey: string; items: AlbumItem[] }[] = [
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

const AlbumsScreen: React.FC = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-secondary px-8 pt-20 pb-10 items-center">
          <Text className="text-4xl font-extrabold text-secondary-foreground text-center">
            {t('albums.title')}
          </Text>
          <Text className="text-lg text-secondary-foreground/80 text-center mt-2 italic">
            {t('albums.subtitle')}
          </Text>
        </View>

        {/* Album Sections */}
        <View className="px-6 py-8 items-center">
          <View className="w-full max-w-lg gap-8">
            {ALBUM_SECTIONS.map((section) => (
              <View key={section.titleKey} className="gap-4">
                <Text className="text-xl font-bold text-accent border-b border-accent/30 pb-2">
                  {t(section.titleKey)}
                </Text>
                {section.items.map((item) => (
                  <Card key={item.nameKey} className="w-full">
                    <CardHeader>
                      <CardTitle>{t(item.nameKey)}</CardTitle>
                      <CardDescription>{t(item.descKey)}</CardDescription>
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
            className="w-full max-w-lg"
          >
            <Text>{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AlbumsScreen;
