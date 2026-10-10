export default function Input({
  id,
  name,
  value,
  onChange,
  className,
  disabled,
  placeholder,
  type,
  label,
  required,
  autoFocus,
  ref,
  onKeyDown,
}: {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  label?: string;
  required?: boolean;
  autoFocus?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className='block w-full text-sm font-medium'>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        ref={ref}
        onKeyDown={onKeyDown}
        className='block p-2 w-full bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text'
      />
    </div>
  );
}
