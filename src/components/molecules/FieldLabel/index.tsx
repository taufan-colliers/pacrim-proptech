import type { PropsWithChildren } from 'react';

import Phrase, { type PhraseProps } from '@/components/atoms/Phrase';
import RequiredIndicator from '@/components/atoms/RequiredIndicator';

/**
 * Consistent label used above form fields.
 *
 * When `required` is set it appends a red asterisk. Extra `Phrase` props (colour, type) pass
 * through, so a label can match the surrounding form.
 *
 * @example
 * <FieldLabel required>Username</FieldLabel>
 */
export default function FieldLabel({
  children,
  required,
  ...props
}: PropsWithChildren<{ required?: boolean } & PhraseProps>) {
  return (
    <Phrase {...props}>
      {children}
      {required && <RequiredIndicator />}
    </Phrase>
  );
}
