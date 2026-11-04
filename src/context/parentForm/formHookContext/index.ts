import { createFormHookContexts } from '@tanstack/react-form';

/**
 * Contexts shared by every form in the app. Kept in their own module so both the field
 * components and `useParentForm` can import them without a cycle.
 */
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();
