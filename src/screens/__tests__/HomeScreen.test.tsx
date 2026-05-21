import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.title': 'Saudade',
        'home.subtitle': 'A Digital Heirloom of Family Love',
        'home.heroTagline': 'Preserve, share, and celebrate your most treasured family memories — safely and beautifully.',
        'home.aboutTitle': "Your Family's Story Lives Here",
        'home.aboutText': 'Saudade was born from the longing to keep loved ones close.',
        'home.featuredTitle': 'Cherished Collections',
        'home.featuredPortraits': 'Portraits & Milestones',
        'home.featuredPortraitsDesc': 'Birthdays, graduations, weddings — the moments that mark a life well lived.',
        'home.featuredTraditions': 'Family Traditions',
        'home.featuredTraditionsDesc': 'Holiday gatherings, Sunday dinners, and the rituals that bind generations together.',
        'home.featuredHeritage': 'Heritage & Roots',
        'home.featuredHeritageDesc': 'Vintage scans and ancestral photographs kept vivid for those who come after.',
        'home.viewAlbums': 'Explore Albums',
        'home.learnMore': 'Our Story',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays expected translated text', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Saudade')).toBeTruthy();
    expect(getByText('Preserve, share, and celebrate your most treasured family memories — safely and beautifully.')).toBeTruthy();
  });

  it('has navigation buttons', () => {
    const { getAllByText } = render(<HomeScreen />);
    const albumButtons = getAllByText('Explore Albums');
    expect(albumButtons.length).toBeGreaterThan(0);
  });

  it('displays featured collections', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Cherished Collections')).toBeTruthy();
    expect(getByText('Portraits & Milestones')).toBeTruthy();
    expect(getByText('Family Traditions')).toBeTruthy();
    expect(getByText('Heritage & Roots')).toBeTruthy();
  });
});
