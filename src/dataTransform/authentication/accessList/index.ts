import type { UserAccess } from '@/types/components/authentication';
import type { AuthenticationService } from '../../../types/infrastructures/authentication';

/**
 * Reduce `/user-accessList` entries to the fields the Home grid needs.
 */
export default async function accessList(
  service: AuthenticationService,
): Promise<UserAccess[]> {
  const { data } = await service.getAccessList();

  return data.map((access) => ({
    appAccess: access.appAccess,
    appIconURL: access.appIconURL,
    appName: access.appName,
    appPackageName: access.appPackageName,
  }));
}
