import classNames from 'classnames';
import React from 'react';

type Tab = {
  href: string;
  name: string;
};
interface TabsProps {
  tabs: Tab[];
  active: string;
  onTabChange: (any) => void;
}

function Tabs({ tabs, active, onTabChange }: TabsProps) {
  return (
    <div className="mb-5 mt-4 border-b-2 border-gray-300">
      <nav aria-label="Tabs" className="-mb-px flex">
        {tabs.map((tab) => (
          <div
            aria-current={tab.name === active ? 'page' : undefined}
            className={classNames(
              tab.name === active
                ? 'border-indigo-500 text-gray-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-3 px-5 border-b-2 text-lg font-bold'
            )}
            key={tab.name}
            onClick={() => onTabChange(tab)}
          >
            {tab.name}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Tabs;
