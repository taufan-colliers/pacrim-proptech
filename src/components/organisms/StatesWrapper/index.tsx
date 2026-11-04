import ANIMATIONS from '@/assets/animations';

import StateWrapper, { type StateWrapperProps } from '../StateWrapper';

export interface StatesWrapperProps extends Partial<StateWrapperProps> {
  error?: boolean;
  /** Use the smiling face for a positive empty state. */
  goodEmpty?: boolean;
  loading?: boolean;
  /** Render nothing for an intentional empty state. */
  plain?: boolean;
  search?: boolean;
  labels: { loading?: string; error?: string; search?: string; empty?: string };
}

/**
 * State machine for data screens: picks the loading/error/search/empty animation and label
 * from a single set of booleans.
 *
 * Evaluate `loading` and `error` before `plain`/`empty`; the first matching state wins.
 *
 * @example
 * <StatesWrapper
 *   loading={req.isLoading}
 *   error={req.isError}
 *   labels={{ loading: 'Loading...', error: 'Something went wrong' }}
 * />
 */
export default function StatesWrapper({
  loading,
  labels,
  error,
  search,
  goodEmpty,
  plain,
  ...props
}: StatesWrapperProps) {
  if (loading)
    return (
      <StateWrapper
        animation={ANIMATIONS.LoadingBar}
        animationSize="20%"
        {...props}
        stateLabel={labels.loading || ''}
      />
    );

  if (error)
    return (
      <StateWrapper
        testID="state-error"
        animation={ANIMATIONS.Error}
        {...props}
        stateLabel={labels.error || ''}
      />
    );

  if (search)
    return (
      <StateWrapper
        animation={ANIMATIONS.NotFound}
        {...props}
        stateLabel={labels.search || ''}
      />
    );

  if (plain) return null;

  return (
    <StateWrapper
      animation={goodEmpty ? ANIMATIONS.SmileFace : ANIMATIONS.FrownFace}
      animationSize="50%"
      loop={false}
      progress={0.4}
      autoPlay={false}
      {...props}
      stateLabel={labels.empty || ''}
    />
  );
}
