import { getUserProfile } from "@/lib/data";
import AccountSettingsTemplate from "./AccountSettingsTemplate";

async function AccountSettings() {
  const user = await getUserProfile();

  return <AccountSettingsTemplate user={user} />;
}

export default AccountSettings;
