import { Gap, OTPInputWrapper, Phrase, Picture } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { OTPInput, Screen, StatesWrapper } from '@/components/organisms';
import { useUserInfo, useVerifyOTPInput } from '@/hooks';
import { useComponentState } from '@/stores/useComponentState';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import type { OTPInputRef } from '@/components/organisms/OTPInput';

/**
 * Second login step: verifies the TOTP code from the CFM MFA app and stores the local MFA
 * marker before entering the app.
 *
 * When `/user-info` reports that MFA is not required the screen skips the code entirely and
 * resolves the user's role immediately.
 */
export default function VerifySessionScreen() {
  const reqUserInfo = useUserInfo();
  const changeRole = useComponentState((state) => state.changeRole);

  const reqUserInfoData = reqUserInfo?.data;

  const otpInputRef = useRef<OTPInputRef>(null);
  const hasVerified = useRef(false);

  const onVerified = useCallback(() => {
    // The effect below can re-run when `/user-info` refreshes; only navigate once.
    if (hasVerified.current) return;
    hasVerified.current = true;

    if (reqUserInfoData?.isPIC) changeRole('PIC');
    else if (reqUserInfoData?.isUser) changeRole('user');
    else if (reqUserInfoData?.isTechnician) changeRole('technician');

    router.replace('/');
  }, [changeRole, reqUserInfoData]);

  const { OTP, onFilled, verifyCode, pending } = useVerifyOTPInput({
    idWebUser: reqUserInfoData?.idWebUser || 0,
    onError() {
      otpInputRef.current?.clear();
      otpInputRef.current?.setValue('');
      otpInputRef.current?.focus();
    },
    onVerified,
  });

  useEffect(() => {
    // Use strict `false`: `null`/`undefined` mean the profile is still loading.
    if (reqUserInfoData?.isMFARequired === false) onVerified();
  }, [reqUserInfoData?.isMFARequired, onVerified]);

  return (
    <Screen>
      {reqUserInfo.isLoading || reqUserInfo.isError ? (
        <StatesWrapper
          loading={reqUserInfo.isLoading}
          error={reqUserInfo.isError}
          labels={{
            loading: 'Verifying session...',
            empty: 'Please relogin!',
            error: 'Something went wrong\nPlease relogin',
          }}
        />
      ) : (
        <OTPInputWrapper>
          <View style={{ gap: 24 }}>
            <View>
              <Picture
                source={require('../../assets/images/app-logo.png')}
              />
              <Phrase>
                {'Open CFM MFA application and \nenter the code below.'}
              </Phrase>
              <Gap vertical={4} />
            </View>

            <Gap vertical={4} />

            <OTPInput
              ref={otpInputRef}
              onFilled={onFilled}
              numberOfDigits={6}
            />

            <Button
              disabled={!OTP || OTP.length < 6}
              onPress={() => OTP && verifyCode(OTP)}
              loading={pending}
            >
              Verify OTP
            </Button>
          </View>
        </OTPInputWrapper>
      )}
    </Screen>
  );
}
