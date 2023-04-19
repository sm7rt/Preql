type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button
      className={`bg-primary text-white px-6 py-2 rounded-md text-sm font-bold ${className}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export default Button;
