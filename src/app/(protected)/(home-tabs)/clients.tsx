import { View } from 'react-native';

import { Gap, Phrase } from '@/components/atoms';
import { Screen } from '@/components/organisms';
import { SCREEN_HR_PADDING } from '@/constants/components';
import { useCurrentClient } from '@/hooks';

/**
 * Company tab placeholder.
 *
 * The full client list + switch flow (`useClientList`, `ClientItem`, `SearchBar`) is ported
 * with the company feature. For now this shows which client the session is scoped to.
 */
export default function ClientsScreen() {
  const reqClientActive = useCurrentClient();

  return (
    <Screen>
      <View style={{ padding: SCREEN_HR_PADDING }}>
        <Phrase type="subheading" color="primary">
          Company
        </Phrase>
        <Gap vertical={8} />
        <Phrase type="content">
          {reqClientActive.data?.clientName ?? 'No company selected.'}
        </Phrase>
        <Gap vertical={8} />
        <Phrase type="caption" color="description">
          Client switching and search arrive with the company feature.
        </Phrase>
      </View>
    </Screen>
  );
}
