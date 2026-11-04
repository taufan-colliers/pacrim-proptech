import type { ImageProps } from 'react-native';
import { Image } from 'react-native';

import styles from './styles';

interface Props extends ImageProps {
  /** Remote image URL. When omitted, a local placeholder is rendered. */
  uri?: string | null;
}

/**
 * Standardised image component for remote or local sources.
 *
 * Remote images go through `uri`; local images are passed as a normal `source`. Both use the
 * same 140×140 default box and `contain` resizing, so tile layouts stay aligned. An empty
 * `uri` falls back to the bundled placeholder while loading (and when the request fails).
 *
 * @example
 * <Picture uri={iconURI} style={{ width: 64, height: 64 }} />
 * <Picture source={require('../../assets/images/logo.png')} />
 */
export default function Picture({ uri, ...props }: Props) {
  return (
    <Image
      source={
        uri
          ? { uri }
          : require('../../../../assets/images/placeholder.jpg')
      }
      defaultSource={require('../../../../assets/images/placeholder.jpg')}
      style={styles.container}
      resizeMode="contain"
      resizeMethod="resize"
      {...props}
    />
  );
}
