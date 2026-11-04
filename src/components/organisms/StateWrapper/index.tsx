import LottieView, { type AnimationObject } from 'lottie-react-native';
import { View, type DimensionValue } from 'react-native';

import { Phrase } from '@/components/atoms';
import { Button } from '@/components/molecules';

import styles from './styles';

export interface StateWrapperProps {
  /** Lottie animation JSON. */
  animation?: string | AnimationObject;
  /** Message shown under the animation. */
  stateLabel: string;
  /** Action fired by the optional button. */
  statePress?: () => void;
  /** When set, renders a button under the label. */
  stateButtonLabel?: string;
  /** Use the taller (70%) page height instead of the default 50%. */
  fullPage?: boolean;
  testID?: string;
  autoPlay?: boolean;
  loop?: boolean;
  animationSize?: DimensionValue;
  progress?: number;
  containerSize?: number;
  aspectRatio?: number;
}

/**
 * Presentation shell for empty/loading/error/success states: a Lottie illustration, a
 * message and an optional action button.
 *
 * Usually rendered through `StatesWrapper`, which picks the right animation for you.
 *
 * @example
 * <StateWrapper animation={ANIMATIONS.NotFound} stateLabel="No tickets found" />
 */
export default function StateWrapper({
  stateLabel,
  animation,
  autoPlay = true,
  fullPage,
  loop = true,
  stateButtonLabel,
  statePress,
  testID,
  animationSize = '100%',
  progress,
  containerSize,
  aspectRatio,
}: StateWrapperProps) {
  const style = styles({ fullPage, animationSize, containerSize, aspectRatio });

  return (
    <View style={style.container} testID={testID}>
      <View style={style.containerContent}>
        <View style={style.containerAnimation}>
          <LottieView
            progress={progress}
            source={animation}
            style={style.animation}
            autoPlay={autoPlay}
            loop={loop}
          />
        </View>
        <View style={style.containerDetails}>
          <Phrase align="center">{stateLabel}</Phrase>
          {!!stateButtonLabel && (
            <View style={style.containerButton}>
              <Button type="solid" onPress={statePress}>
                {stateButtonLabel}
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
