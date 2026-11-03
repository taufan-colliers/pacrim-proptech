/** Payload for `GET /token/cfmcrm`; encoded as HTTP Basic on the wire. */
export interface LoginPayload {
  username: string;
  password: string;
}

/** Payload for `POST /auth/totp/verify`. */
export interface OTPPayload {
  otp: string;
}

/** Payload for `POST /fcm-token/cfmcrm`. */
export interface NotificationSaveFCMTokenPayload {
  fcmToken: string;
}
