import { z } from 'zod';

import captureError from '../captureError';

interface ValidateConfig<T extends z.ZodTypeAny> {
  dto: unknown;
  schema: T;
  schemaName: string;
}

/**
 * Validate an API payload against a Zod schema.
 *
 * Reports the failure through `captureError` and rethrows the `ZodError`, which the global
 * query cache turns into an "Invalid server response!" toast.
 */
export default function validateType<T extends z.ZodTypeAny>(
  config: ValidateConfig<T>,
): z.infer<T> {
  const { data, success, error } = config.schema.safeParse(config.dto);

  if (success) {
    return data;
  } else {
    captureError({
      extra: JSON.stringify(error),
      payload: error.message,
      location: 'validateType',
      attributes: { parser: config.schemaName },
      error: error,
    });

    throw error;
  }
}
