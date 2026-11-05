import { router } from 'expo-router';
import type { ImageSourcePropType } from 'react-native';
import { ScrollView } from 'react-native';

import { Gap, Phrase } from '@/components/atoms';
import { MainSquareMenuTile } from '@/components/molecules';
import { Screen } from '@/components/organisms';
import { SCREEN_HR_PADDING } from '@/constants/components';

interface HomeTile {
  key: string;
  label: string;
  source: ImageSourcePropType;
  route: '/(protected)/cfm' | '/(protected)/chr';
}

const CFM_LOGO = require('../../../../assets/images/cfm-logo.jpeg');

/**
 * Consolidated launcher. The two product families are CFM and CHR; both use the CFM logo
 * until the CHR branding lands.
 */
const HOME_TILES: HomeTile[] = [
  { key: 'cfm', label: 'CFM', source: CFM_LOGO, route: '/(protected)/cfm' },
  { key: 'chr', label: 'CHR', source: CFM_LOGO, route: '/(protected)/chr' },
];

/**
 * Home tab: exactly two tiles, one per product family.
 *
 * Tapping CFM opens the full CFM service menu; CHR is a placeholder stack for now.
 */
export default function HomeScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingTop: 16 }}>
        <Phrase
          type="subheading"
          color="primary"
          style={{ paddingHorizontal: SCREEN_HR_PADDING }}
        >
          Select a service
        </Phrase>
        <Gap vertical={8} />
        <MainSquareMenuTile>
          {HOME_TILES.map((tile) => (
            <MainSquareMenuTile.Item
              key={tile.key}
              label={tile.label}
              source={tile.source}
              onPress={() => router.navigate(tile.route)}
            />
          ))}
        </MainSquareMenuTile>
      </ScrollView>
    </Screen>
  );
}
