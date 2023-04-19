import DashboardWrapper from 'src/dashboard/wrapper';
import SettingsHeader from 'src/settings/header';
import Invites from 'src/settings/invites';
import Members from 'src/settings/members';

function Settings() {
  return (
    <DashboardWrapper>
      <SettingsHeader />
      <Members />
      <Invites />
    </DashboardWrapper>
  );
}

export default Settings;
