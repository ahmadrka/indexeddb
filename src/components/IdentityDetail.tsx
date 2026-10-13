import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteIdentity,
  getIdentityById,
  type TypeIdentityByName,
} from '../db/db';
import { useCallback, useEffect, useState } from 'react';
import Button from './ui/Button';
import RenderAvatar from './ui/RenderAvatar';

export default function IdentityDetail({
  refreshTrigger,
  onIdentityDeleted,
}: {
  refreshTrigger: number;
  onIdentityDeleted: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isVisible = location.pathname.startsWith('/profile');
  const [identity, setIdentity] = useState<TypeIdentityByName>();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    let isMounted = true;
    getIdentityById(id).then((data) => {
      if (!data) {
        navigate(`/${location.search}`);
        return;
      }
      if (isMounted) {
        setIdentity(data); // Cukup set data yang dikembalikan dari API
      }
    });

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger, id]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(`/${location.search}`, { replace: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const handleDelete = useCallback(async () => {
    if (
      confirm('Are you sure you want to delete this identity?') &&
      identity?.id
    ) {
      await deleteIdentity(identity.id);
      onIdentityDeleted();
      navigate(`/${location.search}`);
    }
  }, [identity, navigate, onIdentityDeleted]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ translateX: '100%' }}
          animate={{ translateX: '0%' }}
          exit={{ translateX: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='lg:w-xl fixed w-full inset-0 z-10 lg:mt-4 mr-4 mb-4 lg:relative flex items-center lg:items-start justify-center bg-black/25 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none'
        >
          <div className='lg:sticky lg:w-lg lg:top-24 p-6 flex flex-col items-start justify-start gap-10 rounded-3xl bg-white'>
            <div className='pt-10 w-full flex flex-col items-center justify-center gap-4'>
              <RenderAvatar
                src={identity?.avatar as Blob}
                alt={identity?.fullname}
                size={150}
              />
              <div>
                <h1 className='text-xl text-center font-bold'>
                  {identity?.fullname}
                </h1>
                <p className='text-md text-center text-gray-600'>
                  {identity?.username}
                </p>
              </div>
            </div>
            <div className='w-full flex flex-col gap-2'>
              <p className='text-md'>
                <b>Bio:</b>{' '}
                {identity?.bio ? <>{identity?.bio}</> : <i>no bio</i>}
              </p>
              <p className='text-md'>
                <b>Email:</b>{' '}
                {identity?.email ? (
                  <a
                    href={`mailto:${identity?.email}`}
                    className='text-blue-600 hover:text-blue-800 underline'
                  >
                    {identity?.email}
                  </a>
                ) : (
                  <i>no email</i>
                )}
              </p>
              <p className='text-md'>
                <b>Created At:</b>{' '}
                {identity?.createdAt &&
                  identity?.createdAt.toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                  })}
              </p>
              <p className='text-md'>
                <b>Identity ID:</b>{' '}
                <code className='text-sm bg-gray-100 text-gray-600 p-1 rounded-sm'>
                  {identity?.id}
                </code>
              </p>
            </div>
            <div className='w-full flex flex-row items-center justify-center gap-4'>
              <Button
                className='w-full'
                onClick={() =>
                  navigate(`/profile/${identity?.id}/edit${location.search}`)
                }
              >
                Edit Identity
              </Button>
              <Button
                className='w-full'
                buttonType='error'
                onClick={handleDelete}
              >
                Delete Identity
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
