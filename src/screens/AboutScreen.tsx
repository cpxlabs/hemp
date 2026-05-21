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
        <View className="bg-primary px-8 pt-20 pb-10 items-center">
          <Text className="text-4xl font-extrabold text-primary-foreground text-center">
            {t('about.title')}
          </Text>
        </View>

        {/* Story */}
        <View className="px-8 py-10 items-center">
          <View className="w-full max-w-lg gap-8">
            <View className="gap-3">
              <Text className="text-2xl font-bold text-foreground">
                {t('about.storyTitle')}
              </Text>
              <Text className="text-base text-muted-foreground leading-6">
                {t('about.storyText')}
              </Text>
            </View>

            <View className="gap-3">
              <Text className="text-2xl font-bold text-foreground">
                {t('about.missionTitle')}
              </Text>
              <Text className="text-base text-muted-foreground leading-6">
                {t('about.missionText')}
              </Text>
            </View>

            {/* Values */}
            <View className="gap-3">
              <Text className="text-2xl font-bold text-foreground">
                {t('about.valuesTitle')}
              </Text>
              <Card className="border-accent/30">
                <CardContent className="gap-3 pt-4">
                  <Text className="text-base text-foreground leading-6">
                    {t('about.valueCraft')}
                  </Text>
                  <Text className="text-base text-foreground leading-6">
                    {t('about.valueCreativity')}
                  </Text>
                  <Text className="text-base text-foreground leading-6">
                    {t('about.valueCommunity')}
                  </Text>
                </CardContent>
              </Card>
            </View>

            {/* Security */}
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="text-secondary-foreground">
                  {t('about.visitTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="gap-2">
                <Text className="text-base text-secondary-foreground/90">
                  {t('about.visitAddress')}
                </Text>
                <Text className="text-base text-secondary-foreground/90">
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
            className="w-full max-w-lg"
          >
            <Text>{t('common.back')}</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
