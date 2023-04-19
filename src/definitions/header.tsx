import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tabs from 'src/components/elements/tabs';

const tabs = [
  { href: '/dashboard/definitions/metrics', name: 'Metrics' },
  { href: '/dashboard/definitions/dimensions', name: 'Dimensions' },
];

function DefinitionsHeader() {
  const router = useRouter();
  const [active, setActive] = useState<string>('Metrics');

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.href === router.asPath);
    if (activeTab) {
      setActive(activeTab.name);
    }
  }, [router.asPath, router.pathname]);

  const onTabChange = (tab: any) => {
    setActive(tab.name);
    router.push(tab.href);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Definitions</h1>
      <p className="text-md mt-3">
        Manage your metric and dimension definitions
      </p>
      <Tabs active={active} onTabChange={onTabChange} tabs={tabs} />
    </>
  );
}

export default DefinitionsHeader;
