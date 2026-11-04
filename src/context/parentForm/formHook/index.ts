import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from '../formHookContext';
import TSFField from '../TSFField';

/**
 * App-wide form factory. Screens call `useParentForm` so every form shares the same field
 * components and validation wiring.
 *
 * Only `TSFField` is registered for now — the remaining work-request field types (`TSFList`,
 * `TSFPhotos`, `TSFSelect`) arrive with their feature phase.
 *
 * @example
 * const form = useParentForm({ defaultValues, validators, onSubmit });
 * <form.AppField name="username">
 *   {(field) => <field.TSFField {...loginForm.username} />}
 * </form.AppField>
 */
export const { useAppForm: useParentForm, withForm: withParentForm } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      TSFField,
    },
    formComponents: {},
  });
