import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import Button from './ui/Button';
import generateSeedDb from '../db/seed';
import { useState } from 'react';
import { deleteAllIdentities } from '../db/db';

export function Info({
  refreshTrigger,
  onIdentityGenerated,
}: {
  refreshTrigger: number;
  onIdentityGenerated: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasSeed, setHasSeed] = useState(
    localStorage.getItem('has_seed') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('has_seed', String(hasSeed));
  }, [hasSeed]);

  useEffect(() => {
    setHasSeed(localStorage.getItem('has_seed') === 'true');
  }, [refreshTrigger]);

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
            <p className='w-full text-red-500 font-bold'>
              Note: Data stored on Dexie.js are not sync with server. This is
              just client local database implementation. Data will not same
              across devices, browser, even browser session.
            </p>
            <div className='w-full flex flex-row items-center justify-center gap-4'>
              <Button
                className='w-full'
                onClick={async () => {
                  await generateSeedDb();
                  onIdentityGenerated();
                }}
                disabled={hasSeed}
              >
                Generate Seed
              </Button>
              <Button
                className='w-full'
                buttonType='error'
                onClick={async () => {
                  const isDelete = confirm(
                    'Are you sure to delete all identities?\n\nWARNING: This action cannot be irreversible.',
                  );
                  if (!isDelete) return;

                  await deleteAllIdentities();
                  setHasSeed(false);
                  onIdentityGenerated();
                }}
              >
                Delete All Identity
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
