import { z } from 'zod';

import validateType from '../../../helpers/validateType';
import type { LoginInfoResponse } from '../../../types/apiResponses';

const LoginInfoSchema = z.object({
  accessToken: z.string({ error: 'accessToken should be a string!' }),
});

export type LoginInfo = z.infer<typeof LoginInfoSchema>;

/**
 * Validate the `/token/cfmcrm` payload, keeping only the access token.
 */
export default function login(dto: LoginInfoResponse) {
  return validateType({
    dto,
    schema: LoginInfoSchema,
    schemaName: 'Get Login Token',
  });
}
