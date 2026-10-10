import { useCallback, useEffect, useState } from 'react';
import {
  type TypeIdentityByName,
  editIdentity,
  getIdentityById,
} from '../db/db';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import RenderAvatar from './ui/RenderAvatar';

export function EditIdentity({
  onIdentityEdited,
}: {
  onIdentityEdited: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isVisible = location.pathname.split('/')[3] === 'edit';
  const id = location.pathname.split('/')[2];

  const [identity, setIdentity] = useState<
    Partial<TypeIdentityByName | undefined>
  >({});
  const [initialIdentity, setInitialIdentity] = useState<
    Partial<TypeIdentityByName>
  >({});

  useEffect(() => {
    let isMounted = true;
    getIdentityById(id).then((data) => {
      if (isMounted && data) {
        setIdentity(data); // Cukup set data yang dikembalikan dari API
        setInitialIdentity(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id, isVisible]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const result = await editIdentity(identity as TypeIdentityByName);
        alert(result.username + ' edited successfully!');
        setIdentity({
          avatar: new Blob(),
          fullname: '',
          username: '',
          email: '',
          bio: '',
        });
        if (onIdentityEdited) {
          onIdentityEdited();
        }
        navigate(`/profile/${id}${location.search}`);
      } catch (error) {
        console.log(error);
      }
    },
    [identity, onIdentityEdited],
  );

  const isFormChanged =
    identity?.fullname !== initialIdentity.fullname ||
    identity?.username !== initialIdentity.username ||
    identity?.email !== initialIdentity.email ||
    identity?.bio !== initialIdentity.bio ||
    identity?.avatar !== initialIdentity.avatar; // Jika avatar diisi File/Blob baru

  const handleCancel = useCallback(() => {
    if (isFormChanged) {
      if (
        confirm('Are you sure you want to cancel? All changes will be lost.')
      ) {
        setIdentity({
          avatar: new Blob(),
          fullname: '',
          username: '',
          email: '',
          bio: '',
        });
        navigate(`/profile/${id}${location.search}`);
      }
    } else {
      navigate(`/profile/${id}${location.search}`);
    }
  }, [identity, navigate]);

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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ''; // Standard baru untuk memicu pop-up browser
      return '';
    };

    // Event listener HANYA dipasang jika syarat terpenuhi
    if (isVisible && isFormChanged) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Cleanup fungsi ini AKAN SELALU berjalan setiap ada perubahan dependency
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isVisible, isFormChanged]); // Tambahkan isFormChanged di sini

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
            <h1 className='text-xl font-bold'>Add New Identity</h1>
            <form
              onSubmit={handleSubmit}
              className='w-full flex flex-col items-center justify-center gap-y-4'
            >
              <div className='m-10'>
                <div
                  title='Tap to Change Avatar'
                  className='relative w-[150px] h-[150px]'
                >
                  <RenderAvatar
                    src={identity?.avatar as Blob}
                    size={150}
                    alt={identity?.fullname}
                  />
                  <input
                    type='file'
                    accept='image/*'
                    id='avatar'
                    name='avatar'
                    placeholder='Avatar'
                    // value={identity.avatar}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIdentity((prev: any) => ({ ...prev, avatar: file }));
                      }
                    }}
                    className='absolute inset-0 cursor-pointer opacity-0'
                  />
                </div>
                <label
                  htmlFor='avatar'
                  className='block w-full text-sm font-medium text-center'
                >
                  Avatar
                </label>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='fullname'
                  className='block w-full text-sm font-medium'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullname'
                  name='fullname'
                  placeholder='Your Full Name'
                  value={identity?.fullname}
                  onChange={(e) =>
                    setIdentity((prev) => ({
                      ...prev,
                      fullname: e.target.value,
                    }))
                  }
                  className='block p-2 w-full bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text'
                  required
                />
              </div>
              <div className='w-full flex flex-row items-center justify-center gap-4'>
                <div className='w-full'>
                  <label
                    htmlFor='username'
                    className='block w-full text-sm font-medium'
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    placeholder='username'
                    value={identity?.username}
                    onChange={(e) =>
                      setIdentity((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className='block p-2 w-full bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text'
                    required
                  />
                </div>
                <div className='w-full'>
                  <label
                    className='block w-full text-sm font-medium'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='email@example.com'
                    value={identity?.email}
                    onChange={(e) =>
                      setIdentity((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className='block p-2 w-full bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text'
                    required
                  />
                </div>
              </div>
              <div className='w-full'>
                <label
                  className='block w-full text-sm font-medium'
                  htmlFor='bio'
                >
                  Bio
                </label>
                <textarea
                  id='bio'
                  name='bio'
                  placeholder='About yourself'
                  value={identity?.bio}
                  onChange={(e) =>
                    setIdentity((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={4}
                  className='block p-2 w-full min-h-32 max-h-64 bg-neutral-100 rounded-xl border border-neutral-300 transition-all cursor-text resize-none [field-sizing:content]'
                />
              </div>
              <div className='w-full flex flex-row items-center justify-center gap-4'>
                <Button
                  type='button'
                  buttonType='error'
                  onClick={handleCancel}
                  className='w-full'
                >
                  Cancel
                </Button>
                <Button className='w-full'>Edit Indentity</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
