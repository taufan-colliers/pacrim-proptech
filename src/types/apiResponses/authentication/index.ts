export interface LoginInfoResponse {
  accessToken: string;
  appCode: 'cfmrm';
  authenticationType: 'Bearer Token';
  idWebUser: number;
  isPIC: boolean;
  isTechnician: boolean;
  isUser: boolean;
  name: string;
  tokenExpirationDate: string | Date;
}

export interface UserInfoResponse {
  cfmmcFCMToken: null | string;
  companyName: string;
  emailAddress: string;
  fcmToken: string | null;
  idEmployee: number;
  idWebUser: number;
  isInspectionPIC: boolean;
  isMFARequired: boolean;
  isPIC: boolean;
  isTechnician: boolean;
  isUser: boolean;
  mfaExpiryPeriod: null | number;
  personName: string;
  phoneNumber: string;
  preferred_Client_idClient: number;
  preferred_TimeZone_idTimeZone: number;
}

export interface UserAccessResponse {
  appName: string;
  appAccess: boolean;
  appPackageName: string;
  appIconURL: string;
  appStoreID: string;
  deepLink: string;
}

export interface SimpleResponse {
  status: string;
  message: string;
}
