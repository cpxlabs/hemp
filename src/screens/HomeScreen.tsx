import React from 'react';
import { View, ScrollView } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { MenuButton } from '@/components/ui/menu-button';

/**
 * SVG prop colors — direct hex values required by react-native-svg stroke/fill.
 * These mirror the brand palette but cannot be expressed as Tailwind classes.
 */
const C = {
  gold: '#d4af37',
  goldLight: '#e6c280',
  goldDark: '#c59b27',
  sepia: '#7a5030',
  photoFrame: '#3a1e0a',
} as const;

// ─── Tree of Life icon ───────────────────────────────────────────────────────

const TreeOfLifeIcon: React.FC = () => (
  <Svg width={80} height={80} viewBox="0 0 200 200">
    {/* Decorative rings */}
    <Circle cx="100" cy="100" r="93" fill="none" stroke={C.goldLight} strokeWidth="3" />
    <Circle cx="100" cy="100" r="86" fill="none" stroke={C.goldLight} strokeWidth="0.8" opacity="0.4" />

    {/* Trunk (filled teardrop shape) */}
    <Path d="M 96 148 C 95 128 96 112 99 98 C 103 112 105 128 104 148 Z" fill={C.goldDark} />

    {/* ── Upper branches ── */}
    {/* Center-top */}
    <Path d="M 100 100 C 100 82 100 66 100 48" stroke={C.goldDark} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M 100 72 C 95 65 90 58 82 50" stroke={C.goldDark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <Path d="M 100 72 C 105 65 110 58 118 50" stroke={C.goldDark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    {/* Upper-left */}
    <Path d="M 99 97 C 88 82 76 70 60 58" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 78 77 C 72 68 64 60 54 52" stroke={C.goldDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M 78 77 C 70 72 62 68 52 66" stroke={C.goldDark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* Upper-right */}
    <Path d="M 101 97 C 112 82 124 70 140 58" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 122 77 C 128 68 136 60 146 52" stroke={C.goldDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M 122 77 C 130 72 138 68 148 66" stroke={C.goldDark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* Mid-left */}
    <Path d="M 98 100 C 82 92 65 88 46 86" stroke={C.goldDark} strokeWidth="2" fill="none" strokeLinecap="round" />
    <Path d="M 70 91 C 60 87 50 82 40 78" stroke={C.goldDark} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    {/* Mid-right */}
    <Path d="M 102 100 C 118 92 135 88 154 86" stroke={C.goldDark} strokeWidth="2" fill="none" strokeLinecap="round" />
    <Path d="M 130 91 C 140 87 150 82 160 78" stroke={C.goldDark} strokeWidth="1.3" fill="none" strokeLinecap="round" />

    {/* ── Roots (mirror of branches) ── */}
    {/* Center-bottom */}
    <Path d="M 100 100 C 100 118 100 134 100 152" stroke={C.goldDark} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M 100 128 C 95 136 90 143 82 150" stroke={C.goldDark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <Path d="M 100 128 C 105 136 110 143 118 150" stroke={C.goldDark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    {/* Lower-left */}
    <Path d="M 99 103 C 88 118 76 130 60 142" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 78 124 C 72 132 64 140 54 148" stroke={C.goldDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Lower-right */}
    <Path d="M 101 103 C 112 118 124 130 140 142" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 122 124 C 128 132 136 140 146 148" stroke={C.goldDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Mid-left root */}
    <Path d="M 98 100 C 82 108 65 112 46 114" stroke={C.goldDark} strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Mid-right root */}
    <Path d="M 102 100 C 118 108 135 112 154 114" stroke={C.goldDark} strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Leaf/berry dots at branch tips */}
    {(
      [
        [100, 48], [82, 50], [118, 50],
        [60, 58], [54, 52], [52, 66],
        [140, 58], [146, 52], [148, 66],
        [46, 86], [40, 78], [154, 86], [160, 78],
      ] as [number, number][]
    ).map(([cx, cy], i) => (
      <Circle key={i} cx={cx} cy={cy} r="3.5" fill={C.goldLight} />
    ))}
    {/* Root terminal dots */}
    {(
      [
        [100, 152], [82, 150], [118, 150],
        [60, 142], [54, 148],
        [140, 142], [146, 148],
        [46, 114], [154, 114],
      ] as [number, number][]
    ).map(([cx, cy], i) => (
      <Circle key={`r${i}`} cx={cx} cy={cy} r="3" fill={C.goldLight} opacity="0.7" />
    ))}
  </Svg>
);

// ─── Hero corner photos (family silhouettes inside aged photo frames) ─────────

/** Top-left: multi-generational family group */
const FamilyGroupPhoto: React.FC = () => (
  <Svg width={148} height={130} viewBox="0 0 148 130">
    <Rect x="2" y="2" width="144" height="126" rx="4" fill={C.photoFrame} opacity="0.9" />
    <Rect x="2" y="2" width="144" height="126" rx="4" fill="none" stroke={C.goldDark} strokeWidth="1.5" opacity="0.4" />
    {/* Grandparent (leftmost, shorter) */}
    <Circle cx="22" cy="73" r="9" fill={C.sepia} />
    <Path d="M 22 82 C 17 91 16 104 17 118 L 27 118 C 28 104 27 91 22 82 Z" fill={C.sepia} />
    {/* Father (tall) */}
    <Circle cx="44" cy="62" r="11" fill={C.sepia} />
    <Path d="M 44 73 C 37 83 36 98 37 118 L 51 118 C 52 98 51 83 44 73 Z" fill={C.sepia} />
    {/* Mother */}
    <Circle cx="68" cy="65" r="10" fill={C.sepia} />
    <Path d="M 68 75 C 62 85 61 98 62 118 L 74 118 C 75 98 74 85 68 75 Z" fill={C.sepia} />
    {/* Child 1 */}
    <Circle cx="90" cy="76" r="8" fill={C.sepia} />
    <Path d="M 90 84 C 85 93 84 104 85 118 L 95 118 C 96 104 95 93 90 84 Z" fill={C.sepia} />
    {/* Child 2 */}
    <Circle cx="110" cy="83" r="7" fill={C.sepia} />
    <Path d="M 110 90 C 106 98 105 108 106 118 L 114 118 C 115 108 114 98 110 90 Z" fill={C.sepia} />
    {/* Grandchild (smallest) */}
    <Circle cx="128" cy="90" r="5.5" fill={C.sepia} />
    <Path d="M 128 96 C 125 103 124 110 125 118 L 131 118 C 132 110 131 103 128 96 Z" fill={C.sepia} />
  </Svg>
);

/** Top-right: two figures with clasped hands */
const HandsPhoto: React.FC = () => (
  <Svg width={130} height={130} viewBox="0 0 130 130">
    <Rect x="2" y="2" width="126" height="126" rx="4" fill={C.photoFrame} opacity="0.9" />
    <Rect x="2" y="2" width="126" height="126" rx="4" fill="none" stroke={C.goldDark} strokeWidth="1.5" opacity="0.4" />
    {/* Left figure */}
    <Circle cx="32" cy="42" r="14" fill={C.sepia} />
    <Path d="M 32 56 C 24 66 22 84 24 116 L 40 116 C 42 84 40 66 32 56 Z" fill={C.sepia} />
    <Path d="M 40 74 C 50 71 60 69 68 68" stroke={C.sepia} strokeWidth="10" fill="none" strokeLinecap="round" />
    {/* Right figure */}
    <Circle cx="98" cy="42" r="14" fill={C.sepia} />
    <Path d="M 98 56 C 90 66 88 84 90 116 L 106 116 C 108 84 106 66 98 56 Z" fill={C.sepia} />
    <Path d="M 90 74 C 80 71 70 69 62 68" stroke={C.sepia} strokeWidth="10" fill="none" strokeLinecap="round" />
    {/* Clasped hands */}
    <Ellipse cx="65" cy="69" rx="11" ry="7" fill={C.sepia} />
  </Svg>
);

/** Bottom-left: couple silhouette */
const CouplePhoto: React.FC = () => (
  <Svg width={120} height={130} viewBox="0 0 120 130">
    <Rect x="2" y="2" width="116" height="126" rx="4" fill={C.photoFrame} opacity="0.9" />
    <Rect x="2" y="2" width="116" height="126" rx="4" fill="none" stroke={C.goldDark} strokeWidth="1.5" opacity="0.4" />
    {/* Taller figure */}
    <Circle cx="40" cy="50" r="13" fill={C.sepia} />
    <Path d="M 40 63 C 32 73 30 90 32 118 L 48 118 C 50 90 48 73 40 63 Z" fill={C.sepia} />
    <Path d="M 48 82 C 54 80 59 79 63 78" stroke={C.sepia} strokeWidth="9" fill="none" strokeLinecap="round" />
    {/* Shorter figure */}
    <Circle cx="78" cy="54" r="11" fill={C.sepia} />
    <Path d="M 78 65 C 72 75 70 90 72 118 L 84 118 C 86 90 84 75 78 65 Z" fill={C.sepia} />
    <Path d="M 72 82 C 66 80 61 79 57 78" stroke={C.sepia} strokeWidth="9" fill="none" strokeLinecap="round" />
    {/* Joined hands */}
    <Circle cx="60" cy="79" r="7" fill={C.sepia} />
  </Svg>
);

/** Bottom-right: elderly person with grandchild */
const GrandparentPhoto: React.FC = () => (
  <Svg width={120} height={130} viewBox="0 0 120 130">
    <Rect x="2" y="2" width="116" height="126" rx="4" fill={C.photoFrame} opacity="0.9" />
    <Rect x="2" y="2" width="116" height="126" rx="4" fill="none" stroke={C.goldDark} strokeWidth="1.5" opacity="0.4" />
    {/* Elderly figure */}
    <Circle cx="40" cy="55" r="13" fill={C.sepia} />
    <Path d="M 40 68 C 32 78 30 96 32 118 L 48 118 C 50 96 48 78 40 68 Z" fill={C.sepia} />
    {/* Walking stick */}
    <Path d="M 30 80 L 22 118" stroke={C.sepia} strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Child (shorter) */}
    <Circle cx="78" cy="72" r="10" fill={C.sepia} />
    <Path d="M 78 82 C 72 91 71 103 72 118 L 84 118 C 85 103 84 91 78 82 Z" fill={C.sepia} />
    {/* Holding hands */}
    <Path d="M 48 90 C 55 88 64 87 70 86" stroke={C.sepia} strokeWidth="7" fill="none" strokeLinecap="round" />
  </Svg>
);

// ─── Card illustrations ───────────────────────────────────────────────────────

/** Card 1 — Portraits & Milestones: vintage camera + photo frames */
const PortraitsIllustration: React.FC = () => (
  <Svg width={110} height={96} viewBox="0 0 110 96" opacity={0.38}>
    {/* Large picture frame */}
    <Rect x="2" y="8" width="58" height="46" rx="3" fill="none" stroke={C.goldLight} strokeWidth="3.5" />
    <Rect x="6" y="12" width="50" height="38" rx="1" fill="none" stroke={C.goldLight} strokeWidth="1" opacity="0.4" />
    {/* Small tilted frame */}
    <Rect x="52" y="52" width="42" height="34" rx="3" fill="none" stroke={C.goldLight} strokeWidth="3" transform="rotate(-12, 73, 69)" />
    {/* Camera body */}
    <Rect x="20" y="60" width="46" height="30" rx="5" fill={C.goldDark} />
    {/* Lens rings */}
    <Circle cx="43" cy="75" r="10" fill="none" stroke={C.goldLight} strokeWidth="2.5" />
    <Circle cx="43" cy="75" r="6" fill="none" stroke={C.goldLight} strokeWidth="1.5" />
    <Circle cx="43" cy="75" r="3" fill={C.goldLight} opacity="0.4" />
    {/* Shutter button */}
    <Rect x="57" y="63" width="8" height="5" rx="2" fill={C.goldLight} />
    {/* Viewfinder bump */}
    <Rect x="25" y="52" width="16" height="10" rx="2" fill={C.goldDark} />
  </Svg>
);

/** Card 2 — Family Traditions: candelabras + stacked books */
const TraditionsIllustration: React.FC = () => (
  <Svg width={110} height={96} viewBox="0 0 110 96" opacity={0.38}>
    {/* Left candle */}
    <Rect x="10" y="32" width="13" height="50" rx="2" fill={C.goldDark} />
    <Path d="M 16 32 C 14 23 18 16 16 8 C 21 16 21 23 16 32 Z" fill={C.goldLight} />
    <Ellipse cx="16" cy="83" rx="11" ry="4.5" fill={C.goldDark} />
    <Rect x="10" y="81" width="13" height="9" rx="2" fill={C.goldDark} />
    {/* Right candle */}
    <Rect x="85" y="36" width="12" height="46" rx="2" fill={C.goldDark} />
    <Path d="M 91 36 C 89 28 93 21 91 14 C 96 21 96 28 91 36 Z" fill={C.goldLight} />
    <Ellipse cx="91" cy="83" rx="10" ry="4" fill={C.goldDark} />
    <Rect x="85" y="81" width="12" height="8" rx="2" fill={C.goldDark} />
    {/* Stacked books */}
    <Rect x="27" y="60" width="50" height="15" rx="2" fill={C.goldDark} />
    <Rect x="30" y="47" width="44" height="14" rx="2" fill={C.goldDark} opacity="0.8" />
    <Rect x="34" y="36" width="36" height="12" rx="2" fill={C.goldDark} opacity="0.65" />
    {/* Book spine accents */}
    <Path d="M 27 60 L 27 75 M 77 60 L 77 75" stroke={C.goldLight} strokeWidth="1" opacity="0.4" />
    <Path d="M 30 47 L 30 61 M 74 47 L 74 61" stroke={C.goldLight} strokeWidth="1" opacity="0.4" />
  </Svg>
);

/** Card 3 — Heritage & Roots: gnarled tree with spreading roots */
const HeritageIllustration: React.FC = () => (
  <Svg width={110} height={96} viewBox="0 0 110 96" opacity={0.38}>
    {/* Trunk */}
    <Path d="M 48 96 C 46 78 46 62 50 46 C 54 62 56 78 54 96 Z" fill={C.goldDark} />
    {/* Roots */}
    <Path d="M 50 88 C 40 90 28 94 14 98" stroke={C.goldDark} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    <Path d="M 50 88 C 60 90 72 94 84 98" stroke={C.goldDark} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    <Path d="M 47 92 C 38 95 26 98 12 102" stroke={C.goldDark} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M 53 92 C 62 95 74 98 86 102" stroke={C.goldDark} strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Left main branch */}
    <Path d="M 49 56 C 38 49 24 42 10 32" stroke={C.goldDark} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M 28 45 C 22 38 16 32 8 24" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 28 45 C 22 42 16 40 8 40" stroke={C.goldDark} strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Right main branch */}
    <Path d="M 51 56 C 62 49 76 42 90 32" stroke={C.goldDark} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M 70 45 C 76 38 82 32 88 24" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 70 45 C 76 42 82 40 88 40" stroke={C.goldDark} strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Center top branch */}
    <Path d="M 50 50 C 50 38 50 26 50 14" stroke={C.goldDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M 50 30 C 44 24 38 18 30 12" stroke={C.goldDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M 50 30 C 56 24 62 18 68 12" stroke={C.goldDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Leaf dots */}
    <Circle cx="10" cy="32" r="3" fill={C.goldLight} />
    <Circle cx="8" cy="24" r="2" fill={C.goldLight} />
    <Circle cx="8" cy="40" r="2" fill={C.goldLight} />
    <Circle cx="90" cy="32" r="3" fill={C.goldLight} />
    <Circle cx="88" cy="24" r="2" fill={C.goldLight} />
    <Circle cx="88" cy="40" r="2" fill={C.goldLight} />
    <Circle cx="50" cy="14" r="3" fill={C.goldLight} />
    <Circle cx="30" cy="12" r="2" fill={C.goldLight} />
    <Circle cx="68" cy="12" r="2" fill={C.goldLight} />
  </Svg>
);

// ─── Collection card component ────────────────────────────────────────────────

interface CollectionCardProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, description, illustration }) => (
  <View
    className="relative overflow-hidden rounded-lg border border-wood-border bg-wood-card shadow-lg"
    style={{ minHeight: 96 }}
  >
    <View className="p-5 pr-28">
      <Text className="font-serif text-base font-semibold text-gold mb-1.5">{title}</Text>
      <Text className="text-gold-soft text-sm leading-5">{description}</Text>
    </View>
    {/* Illustration: anchored to bottom-right, fades out via opacity on the SVG itself */}
    <View className="absolute right-0 bottom-0">{illustration}</View>
  </View>
);

// ─── Main screen ──────────────────────────────────────────────────────────────

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-wood-darkest">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <View
          className="relative overflow-hidden bg-wood-mid items-center px-6 pt-16 pb-14 border-b border-wood-border"
          style={{ minHeight: 340 }}
        >
          {/* Scattered family photo corners */}
          <View className="absolute" style={{ top: -12, left: -22, transform: [{ rotate: '-8deg' }] }}>
            <FamilyGroupPhoto />
          </View>
          <View className="absolute" style={{ top: -12, right: -22, transform: [{ rotate: '8deg' }] }}>
            <HandsPhoto />
          </View>
          <View className="absolute" style={{ bottom: -12, left: -18, transform: [{ rotate: '6deg' }] }}>
            <CouplePhoto />
          </View>
          <View className="absolute" style={{ bottom: -12, right: -18, transform: [{ rotate: '-6deg' }] }}>
            <GrandparentPhoto />
          </View>

          {/* Tree of Life badge */}
          <View className="w-20 h-20 rounded-full border border-gold/30 items-center justify-center bg-wood-dark mb-4">
            <TreeOfLifeIcon />
          </View>

          {/* Title */}
          <Text className="font-display text-5xl text-gold text-center tracking-wide">
            {t('home.title')}
          </Text>

          {/* Tagline */}
          <Text className="text-sm text-gold-muted text-center mt-4 max-w-xs leading-6 font-light">
            {t('home.heroTagline')}
          </Text>

          {/* CTA buttons */}
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

        {/* ── About preview ─────────────────────────────────────────────── */}
        <View className="items-center px-6 py-12">
          <Text className="font-serif text-2xl font-semibold text-foreground text-center">
            {t('home.aboutTitle')}
          </Text>
          <Text className="text-muted-foreground text-base text-center mt-4 max-w-lg leading-7 font-light">
            {t('home.aboutText')}
          </Text>
          {/* Gold separator */}
          <View className="w-24 h-px bg-gold/30 mt-10" />
        </View>

        {/* ── Featured collections ──────────────────────────────────────── */}
        <View className="px-6 pb-12">
          <Text className="font-display text-2xl text-foreground text-center tracking-wide mb-8">
            {t('home.featuredTitle')}
          </Text>

          <View className="gap-4 max-w-lg mx-auto w-full">
            <CollectionCard
              title={t('home.featuredPortraits')}
              description={t('home.featuredPortraitsDesc')}
              illustration={<PortraitsIllustration />}
            />
            <CollectionCard
              title={t('home.featuredTraditions')}
              description={t('home.featuredTraditionsDesc')}
              illustration={<TraditionsIllustration />}
            />
            <CollectionCard
              title={t('home.featuredHeritage')}
              description={t('home.featuredHeritageDesc')}
              illustration={<HeritageIllustration />}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

