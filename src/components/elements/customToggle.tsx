import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

type Option = {
  icon: string;
  value: string;
};
interface ToggleProps {
  options: Option[];
  selected: Option;
  onToggleChange: (any) => void;
}

function Toggle({ options, selected, onToggleChange }: ToggleProps) {
  return (
    <RadioGroup onChange={onToggleChange} value={selected}>
      <div className="block bg-gray-500 rounded shadow border border-gray-400 flex flex-row justify-start">
        {options.map((option, index) => (
          <RadioGroup.Option
            className={classNames(
              index === 0 ? 'rounded-l' : 'rounded-r',
              'block bg-white border-transparent transition duration-300 ease-in-out transform flex justify-center items-center'
            )}
            key={option.value}
            value={option}
          >
            {({ active, checked }) => (
              <div
                aria-hidden="true"
                className={classNames(
                  checked ? 'bg-gray-100' : '',
                  active ? 'bg-gray-100' : '',
                  index === 0 ? 'rounded-l border-r' : 'rounded-r border-l',
                  'w-9 h-9 border-gray-300 cursor-pointer flex items-center justify-center'
                )}
              >
                <Image height="14" src={option.icon} width="14" />
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default Toggle;
