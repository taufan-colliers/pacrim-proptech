import { z } from 'zod';

import validateType from '../../../helpers/validateType';
import type { UserInfoResponse } from '../../../types/apiResponses';

const UserInfoSchema = z.object({
  companyName: z.union([z.string(), z.undefined()]).nullable(),
  emailAddress: z.union([z.string(), z.undefined()]).nullable(),
  idClient: z.number(),
  idWebUser: z.number({ error: 'idWebUser should be a number!' }),
  isMFARequired: z.union([z.boolean(), z.null()]).optional(),
  isPIC: z.union([z.boolean(), z.null()]).optional(),
  isUser: z.union([z.boolean(), z.null()]).optional(),
  isTechnician: z.union([z.boolean(), z.null()]).optional(),
  mfaExpiryPeriod: z.union([z.number(), z.null()]).optional(),
  personName: z.union([z.string(), z.undefined()]),
  phoneNumber: z.union([z.string(), z.undefined()]).nullable(),
  idEmployee: z.number({
    error: 'idEmployee should be a number!',
  }),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

/**
 * Map the raw `/user-info` response to the app's user shape.
 *
 * `preferred_Client_idClient` is normalised to `idClient` here; the rest is passed through.
 */
export default function userInfo(dto: UserInfoResponse) {
  return validateType({
    dto: {
      companyName: dto.companyName,
      emailAddress: dto.emailAddress,
      idClient: dto.preferred_Client_idClient,
      idEmployee: dto.idEmployee,
      idWebUser: dto.idWebUser,
      isMFARequired: dto.isMFARequired,
      isPIC: dto.isPIC,
      isUser: dto.isUser,
      isTechnician: dto.isTechnician,
      mfaExpiryPeriod: dto.mfaExpiryPeriod,
      personName: dto.personName,
      phoneNumber: dto.phoneNumber,
    },
    schema: UserInfoSchema,
    schemaName: 'User Info',
  });
}
