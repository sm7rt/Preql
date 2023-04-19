import Image from 'next/image';

type IconButtonProps = {
  label: string;
  icon: string;
  className?: string;
  onClick: () => void;
};

function IconButton({ icon, label, onClick, className }: IconButtonProps) {
  return (
    <button
      className={`inline-flex items-center rounded-md border border-transparent bg-none mt-3 px-3 py-2 space-x-2 text-14 font-medium leading-4 text-wfbase-800 hover:bg-wfbase-200 focus:outline-none focus:ring-1 focus:ring-wfbase-400 focus:ring-offset-0 ${className}`}
      onClick={onClick}
      type="button"
    >
      <Image alt="Icon Button Image" height={12} src={icon} width={12} />
      <span>{label}</span>
    </button>
  );
}

export default IconButton;
