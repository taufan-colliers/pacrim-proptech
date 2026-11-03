import logger from '../logger';

/**
 * Analytics events used across the CFM apps.
 *
 * Values are kept stable — they match the events the existing apps send.
 */
export const ANALYTIC_EVENTS = {
  DELETE_UPLOADED_PHOTO: 'delete_uploaded_photo',
  DISAPPROVE_WORK: 'disapprove_work',

  GIVE_RATING: 'give_rating',

  OPEN_CFM_INSPECT: 'open_cfm_inspect',
  OPEN_CFM_ASSET: 'open_cfm_asset',

  VIEW_NOTIFICATION_LIST: 'view_notification_list',
  VIEW_TICKET_PROGRESS_DETAIL: 'view_ticket_progress_detail',

  CHANGE_LANGUAGE_TO_EN: 'change_language_to_en',
  CHANGE_LANGUAGE_TO_ID: 'change_language_to_id',
  CHANGE_THEME_TO_DARK: 'change_theme_to_dark',
  CHANGE_THEME_TO_LIGHT: 'change_theme_to_light',

  EDIT_PHOTO_GALLERY: 'edit_photo_gallery',
  EDIT_PHOTO_QUESTION_UPLOADED: 'edit_photo_question_uploaded',
  EDIT_PHOTO_QUESTION_LOCAL: 'edit_photo_question_local',

  FORGOT_PASSWORD: 'forgot_password',

  FORM_DETAIL_NAVIGATION_PREV: 'form_detail_navigtion_prev',
  FORM_DETAIL_NAVIGATION_NEXT: 'form_detail_navigtion_next',
  FORM_DETAIL_NAVIGATION_FINISH: 'form_detail_navigtion_finish',

  GO_INSPECTING_BY_HEADING: 'go_inspecting_by_heading',
  GO_INSPECTING_BY_BUTTON: 'go_inspecting_by_button',

  INSPECT_REMINDER: 'inspect_reminder',
  INSPECT_REMINDER_NOTIF: 'inspect_reminder_notif',

  LOGOUT: 'manual_logout',

  SHARE_APP_VERSION: 'share_app_version',

  TOGGLE_CRASHLYTICS_ON: 'toggle_crashlytics_on',
  TOGGLE_CRASHLYTICS_OFF: 'toggle_crashlytics_off',
} as const;

export type PayloadMap = {
  GIVE_RATING: { rating: string | undefined };
  SHARE_APP_VERSION: { activity?: string; appVersion: string };
};

export type DefaultPayload = Record<string, unknown>;

/**
 * Send an analytics event.
 *
 * TODO(replace-firebase): currently a dev log only. Swap the body for Firebase Analytics once
 * the new app's Firebase project is configured — the signature must stay identical.
 */
export default async function logAnalytic<
  T extends keyof typeof ANALYTIC_EVENTS,
>(
  eventName: T,
  payload: T extends keyof PayloadMap
    ? PayloadMap[T]
    : DefaultPayload | undefined,
) {
  logger(
    ANALYTIC_EVENTS[eventName],
    payload,
    'helpers/logAnalytic (ghost)',
    'success',
  );
}
