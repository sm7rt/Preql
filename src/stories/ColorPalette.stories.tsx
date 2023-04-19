import cn from 'classnames';
import React from 'react';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

const ColorPalette: React.FC<{
  color: string;
}> = ({ color }) => {
  const scale = React.useMemo<number[]>(() => {
    const arr: number[] = [50];
    for (let i = 1; i < 10; i++) {
      arr.push(i * 100);
    }
    return arr;
  }, []);
  return (
    <div>
      <div className="capitalize">
        <span className="font-bold">{color}</span> Color palette
      </div>
      {scale.map((n) => (
        <>
          <div className={cn(`text-${color}-${n}`)}>{`text-${color}-${n}`}</div>
          <div
            className={cn(`bg-${color}-${n}`, 'rounded-lg', 'p-2', 'mt-1')}
            key={n}
            title={`bg-${color}-${n}`}
          >
            {`bg-${color}-${n}`}
          </div>
        </>
      ))}
    </div>
  );
};
type ColorTypes = keyof DefaultColors | string;
const colors: Array<ColorTypes> = [
  'aquamarine',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'cyan',
  'emerald',
  'violet',
  'fuchsia',
  'rose',
  'sky',
  'slate',
  'zinc',
  'neutral',
  'stone',
  'amber',
  'wfbase',
];

export const AllColorPalette: React.FC = () => (
  <div>
    {colors.map((c) => (
      <ColorPalette color={c} key={c} />
    ))}
  </div>
);
export default {
  component: AllColorPalette,

  title: 'Example/ColorPalette',
};
