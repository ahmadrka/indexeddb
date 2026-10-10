export default function Button({
  children,
  onClick,
  className,
  disabled,
  buttonType = 'normal',
  type,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  buttonType?: 'normal' | 'error';
  type?: 'submit' | 'button' | 'reset';
}) {
  if (buttonType === 'normal')
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`text-white font-medium bg-neutral-800 rounded-xl p-2 px-4 transition-all whitespace-nowrap ${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-neutral-900 cursor-pointer'}`}
      >
        {children}
      </button>
    );

  if (buttonType === 'error')
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`text-white font-medium bg-red-500 rounded-xl p-2 transition-all whitespace-nowrap ${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-700 cursor-pointer'}`}
      >
        {children}
      </button>
    );
}
