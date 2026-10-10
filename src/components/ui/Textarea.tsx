export default function Textarea({
  id,
  name,
  value,
  onChange,
  className,
  disabled,
  placeholder,
  label,
  required,
  rows = 4,
}: {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className='block w-full text-sm font-medium'>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={`block p-2 w-full min-h-32 max-h-64 bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text resize-none [field-sizing:content] ${className}`}
        rows={rows}
      />
    </div>
  );
}
