import { Gap, Icon } from "@/components/atoms";
import {
  AuthenticationHeader,
  Button,
  ForgotPasswordLink,
} from "@/components/molecules";
import { Screen } from "@/components/organisms";
import { loginForm } from "@/constants/forms";
import { useDynamicTextInputRef, useSaveFCMToken, useSignIn } from "@/hooks";
import { ScrollView } from "react-native";

/**
 * Credential entry screen. A successful login either continues to `/verify-session` (MFA) or
 * straight to the home route.
 *
 * The FCM save is a ghost call for now — see `useSaveFCMToken` — but it keeps the same
 * "token → push token → loginStatus" sequence as the source app.
 */
export default function SignIn() {
  const { focusField, registerRef } = useDynamicTextInputRef();

  const reqSaveFCMToken = useSaveFCMToken();

  const {
    form,
    login,
    loginPending,
    onForgotPassword,
    secureTextEntry,
    secureTextEntryToggle,
  } = useSignIn({
    onLoginSuccess() {
      reqSaveFCMToken.mutate();
    },
  });

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthenticationHeader appName="" />
        <Gap vertical={16} />
        <form.AppField name="username">
          {(field) => (
            <field.TSFField
              {...loginForm.username}
              onSubmitEditing={() => focusField("password")}
            />
          )}
        </form.AppField>
        <Gap vertical={8} />
        <form.AppField name="password">
          {(field) => (
            <field.TSFField
              ref={registerRef("password")}
              onSubmitEditing={login}
              rightIconPress={secureTextEntryToggle}
              secureTextEntry={secureTextEntry}
              rightIcon={
                <Icon
                  name={secureTextEntry ? "eye" : "eye-off"}
                  key={`eye-${secureTextEntry}`}
                  color="#333"
                  size={24}
                />
              }
              {...loginForm.password}
            />
          )}
        </form.AppField>
        <Gap vertical={16} />
        <ForgotPasswordLink onPress={onForgotPassword} />
        <Gap vertical={16} />
        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button
              haptic="heavy"
              onPress={login}
              loading={loginPending}
              disabled={!canSubmit}
            >
              Login
            </Button>
          )}
        </form.Subscribe>
      </ScrollView>
    </Screen>
  );
}
