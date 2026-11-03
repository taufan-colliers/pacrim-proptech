import { z } from 'zod';

import { validateType } from '../../../helpers';
import type { ClientPermissionResponse } from '../../../types/apiResponses';

const ClientPermissionSchema = z.object({
  idClient: z.number({ error: 'idClient should be a number!' }),
  clientName: z.string(),
  isSelected: z.boolean(),
});

export type ClientPermission = z.infer<typeof ClientPermissionSchema>;

/**
 * Validate one entry of `GET /client-permissions`.
 */
export default function permissions(dto: ClientPermissionResponse) {
  return validateType({
    dto,
    schema: ClientPermissionSchema,
    schemaName: 'Client Permission',
  });
}
