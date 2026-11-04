import { Picture } from "@/components/atoms";

interface Props {
  /** Suite name shown under the logo. */
  appName: string;
}

/**
 * Shared login/MFA header: the PacRim PropTech logo, the app-suite name and the login prompt.
 *
 * @example
 * <AuthenticationHeader appName="CFM" />
 */
export default function AuthenticationHeader({ appName }: Props) {
  return (
    <>
      <Picture source={require("../../../../assets/images/app-logo.png")} />
      {/* <Phrase type="heading" color="primary">
        {appName}
      </Phrase> */}
      {/* <Phrase type="content">Please login to continue!</Phrase> */}
    </>
  );
}
