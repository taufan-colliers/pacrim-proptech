import { forwardRef } from 'react';
import type { TextInputInstance } from 'react-native';

import Field, { type FieldProps } from '@/components/molecules/Field';

import { useFieldContext } from '../formHookContext';

/**
 * Bridges a TanStack form string field to the app's `Field` input.
 *
 * Validation errors are joined for display and only surface after the field has been touched,
 * so a fresh form never opens covered in red text.
 *
 * @example
 * <form.AppField name="username">
 *   {(field) => <field.TSFField {...loginForm.username} />}
 * </form.AppField>
 */
const TSFField = forwardRef<TextInputInstance, FieldProps>((props, ref) => {
  const field = useFieldContext<string>();
  return (
    <Field
      ref={ref}
      error={field.state.meta.errors
        .map((error) =>
          typeof error === 'string' ? error : JSON.stringify(error),
        )
        .join('\n')}
      isError={!field.state.meta.isValid && field.state.meta.isTouched}
      onBlur={field.handleBlur}
      onChangeText={field.handleChange}
      value={field.state.value}
      {...props}
    />
  );
});

TSFField.displayName = 'TSFField';

export default TSFField;
