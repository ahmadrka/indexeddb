import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from './ui/Button';
import Input from './ui/Input';

const DEBOUNCE_DELAY = 500; // ms

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );

  const submitSearch = useCallback(() => {
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
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      submitSearch();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [searchTerm, submitSearch]);

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
    <div className='fixed z-10 top-0 right-0 left-0 p-4 w-full flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-sm border-b border-gray-300'>
      <h1 className='text-2xl font-bold'>Identity Manager</h1>
      <menu className='w-full lg:w-2/5 flex flex-row items-center justify-center gap-4 overflow-auto'>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
          ref={inputRef}
          type='text'
          placeholder='Search...'
          className='w-full'
        />
        <Button
          onClick={() =>
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set('add', 'true');
              return newParams;
            })
          }
        >
          New Identity
        </Button>
        <Button
          onClick={() =>
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set('info', 'true');
              return newParams;
            })
          }
        >
          Info
        </Button>
      </menu>
    </div>
  );
}
