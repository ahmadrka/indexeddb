import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEBOUNCE_DELAY = 500; // ms

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = searchTerm.trim();

      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (trimmed) {
          newParams.set('search', trimmed); // 👈 Memperbarui/menambah 'search' tanpa menghapus parameter lain seperti 'add'
        } else {
          newParams.delete('search');
        }
        return newParams;
      });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [searchTerm, setSearchParams]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyK') {
        inputRef.current?.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className='fixed z-10 top-0 right-0 left-0 p-4 w-full flex flex-row justify-between items-center bg-white/50 backdrop-blur-sm border-b border-gray-300'>
      <h1 className='text-2xl font-bold'>Identity Manager</h1>
      <menu className='w-2/5 flex flex-row items-center gap-4'>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          ref={inputRef}
          type='text'
          placeholder='Search   [Ctrl + K]'
          className='flex-1 block p-2 bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text'
        />
        <button
          onClick={() =>
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set('add', 'true');
              return newParams;
            })
          }
          className='text-white font-medium bg-neutral-800 rounded-xl p-2 px-4 transition-all hover:bg-neutral-900 cursor-pointer whitespace-nowrap'
        >
          New Identity
        </button>
        <button
          onClick={() =>
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set('info', 'true');
              return newParams;
            })
          }
          className='text-white font-medium bg-neutral-800 rounded-xl p-2 px-4 transition-all hover:bg-neutral-900 cursor-pointer whitespace-nowrap'
        >
          Info
        </button>
      </menu>
    </div>
  );
}
