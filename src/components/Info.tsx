import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';

export function Info() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isVisible = searchParams.get('info') === 'true';
  const onClose = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('info');
      return newParams;
    });
  };

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleCancel]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className='z-100 fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm'
          onClick={handleCancel}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='w-xl max-h-full overflow-y-auto p-6 flex flex-col items-center justify-start gap-3 rounded-3xl shadow-md bg-white'
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='text-xl font-bold'>About Project</h1>
            <p className='text-neutral-600 text-center'>
              Identity Manager is Simple IndexedDB API Implementation With
              Minimalist Dexie.js Wrapper. Built by{' '}
              <a
                href='https://ahmadrka.com'
                target='_blank'
                className='underline'
              >
                Ahmadrka
              </a>{' '}
              with React (Vite), TypeScript, TailwindCSS, and IndexedDB
              (Dexie.js).
            </p>
            <p>
              <a
                href='https://github.com/ahmadrka/indexeddb'
                target='_blank'
                className='underline'
              >
                See on Github -{'>'}
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
