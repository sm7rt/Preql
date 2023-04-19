import Image from 'next/image';

import withErrorBoundary from '../components/hoc/withErrorBoundary';
import { useAuth } from '../hooks/useAuth';
import NavLink from './navLink';

type DashboardWrapperProps = {
  children?: React.ReactNode;
};

function DashboardWrapper({ children }: DashboardWrapperProps) {
  const { onLogOut } = useAuth();

  return (
    <div className="flex h-screen">
      <div className="relative h-screen flex flex-col justify-between shadow-[inset -1px 0px 0px #eeeeee] w-[208px]">
        <div>
          <div className="pt-10 px-6 pb-6 flex">
            <Image alt="Logo" height={24} src="/Logo.svg" width={88} />
          </div>
          <ul>
            <NavLink
              icon="/icons/icon-home.svg"
              label="Home"
              path="/dashboard/home"
            />
            <NavLink
              icon="/icons/definitions.svg"
              label="Definitions"
              path="/dashboard/definitions/metrics"
            />
            <NavLink
              icon="/icons/metrics.svg"
              label="Metrics"
              path="/dashboard/metrics"
            />
            <NavLink
              icon="/icons/reports.svg"
              label="Reports"
              path="/dashboard/reports"
            />
            <NavLink
              icon="/icons/settings.svg"
              label="Settings"
              path="/settings/team"
            />
          </ul>
        </div>

        <div>
          <ul>
            <NavLink
              icon="/icons/icon-log-out.svg"
              label="Log out"
              onClick={onLogOut}
            />
          </ul>
        </div>
      </div>
      <div className="bg-[#F5F5F5] flex-1 h-full overflow-y-auto p-8">
        <div className="rounded-lg h-full p-10">{children}</div>
      </div>
    </div>
  );
}

export default withErrorBoundary(DashboardWrapper);
