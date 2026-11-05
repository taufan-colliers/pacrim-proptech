import type { ImageProps } from 'react-native';
import { Image } from 'react-native';

import styles from './styles';

interface Props extends ImageProps {
  /** Remote image URL. Ignored when `source` is provided. */
  uri?: string | null;
}

/**
 * Standardised image component for remote or local sources.
 *
 * Remote images go through `uri`; local images are passed as a normal `source`. Both use the
 * same 140×140 default box and `contain` resizing, so tile layouts stay aligned. When neither
 * is provided (or a remote image is still loading) the bundled placeholder is used instead.
 *
 * @example
 * <Picture uri={iconURI} style={{ width: 64, height: 64 }} />
 * <Picture source={require('../../assets/images/logo.png')} />
 */
export default function Picture({ uri, source, ...props }: Props) {
  const placeholder = require('../../../../assets/images/placeholder.jpg');

  return (
    <Image
      source={source ?? (uri ? { uri } : placeholder)}
      defaultSource={placeholder}
      style={styles.container}
      resizeMode="contain"
      resizeMethod="resize"
      {...props}
    />
  );
}
