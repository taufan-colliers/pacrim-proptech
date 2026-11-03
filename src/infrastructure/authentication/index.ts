import dataTransform from '@/dataTransform';

import authentication from '../../services/authentication';

export default dataTransform.authentication({
  getAccessList: authentication.accessList,
  getUserInfo: authentication.userInfo,
  login: authentication.login,
  verifyOTP: authentication.verifyOTP,
});
