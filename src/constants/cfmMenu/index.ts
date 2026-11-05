import type { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons';
import type { Href } from 'expo-router';

export interface CfmMenuItem {
  /** Source `appPackageName`, kept as the stable key. */
  key: string;
  label: string;
  icon: MaterialDesignIconsIconName;
  route: Href;
}

/**
 * CFM service menu, hardcoded for Phase 1b.
 *
 * Replaces the API-driven `useGetAccessList` rendering until the access list is ported again
 * (or the CFM services ship as separate routes). The order and destinations mirror the
 * `appAccess` map in `cfm-ticket/app/(protected)/(home-tabs)/index.tsx`.
 *
 * `cfmfi` / `cfmam` used to be `cfmfi://` and `cfmam://` deep links; they now open in-app
 * placeholder routes until those apps are ported.
 */
export const CFM_MENU: CfmMenuItem[] = [
  {
    key: 'cfmcrm',
    label: 'CFM Ticket',
    icon: 'ticket-confirmation',
    route: '/work-request/status/outstanding-wr',
  },
  {
    key: 'cfmam',
    label: 'CFM Asset',
    icon: 'package-variant',
    route: '/(protected)/asset',
  },
  {
    key: 'cfmfi',
    label: 'CFM Inspector',
    icon: 'clipboard-search',
    route: '/(protected)/inspector',
  },
  {
    key: 'Dashboard',
    label: 'Dashboard',
    icon: 'view-dashboard',
    route: '/reports',
  },
  {
    key: 'CostApproval',
    label: 'Cost Approval',
    icon: 'cash-check',
    route: '/cost-approval/requests/outstanding-ca',
  },
];
