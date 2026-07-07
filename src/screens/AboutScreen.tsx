import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AboutScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="bg-card border-b border-border/20 px-8 pt-20 pb-10 items-center">
          <Text className="text-5xl font-black text-foreground text-center uppercase tracking-tighter italic">
            {t('about.title')}
          </Text>
        </View>

        {/* Story */}
        <View className="px-8 py-10 items-center">
          <View className="w-full max-w-lg gap-8">
            <View className="gap-3">
              <Text className="text-2xl font-black text-primary uppercase tracking-tight italic">
                {t('about.storyTitle')}
              </Text>
              <Text className="text-base text-muted-foreground leading-7">
                {t('about.storyText')}
              </Text>
            </View>

            <View className="gap-3">
              <Text className="text-2xl font-black text-primary uppercase tracking-tight italic">
                {t('about.missionTitle')}
              </Text>
              <Text className="text-base text-muted-foreground leading-7">
                {t('about.missionText')}
              </Text>
            </View>

            {/* Values */}
            <View className="gap-3">
              <Text className="text-2xl font-black text-primary uppercase tracking-tight italic">
                {t('about.valuesTitle')}
              </Text>
              <Card className="border-border/40 bg-card">
                <CardContent className="gap-3 pt-4">
                  <Text className="text-sm text-foreground leading-6">
                    • {t('about.valueCraft')}
                  </Text>
                  <Text className="text-sm text-foreground leading-6">
                    • {t('about.valueCreativity')}
                  </Text>
                  <Text className="text-sm text-foreground leading-6">
                    • {t('about.valueCommunity')}
                  </Text>
                </CardContent>
              </Card>
            </View>

            {/* Security info / CPX labs */}
            <Card className="bg-card border-border/40">
              <CardHeader>
                <CardTitle className="text-foreground font-black uppercase tracking-tight text-lg italic">
                  {t('about.visitTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="gap-2">
                <Text className="text-sm text-muted-foreground">
                  {t('about.visitAddress')}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {t('about.visitHours')}
                </Text>
              </CardContent>
            </Card>
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

export default AboutScreen;
