import { useCallback, useEffect, useState } from 'react';
import { type TypeIdentityByName, addIdentity } from '../db/db';
import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import avatarPlaceholder from '../assets/avatar-placeholder.svg';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import RenderAvatar from './ui/RenderAvatar';

export function AddIdentity({
  onIdentityAdded,
}: {
  onIdentityAdded: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [identity, setIdentity] = useState<Partial<TypeIdentityByName>>({
    avatar: new Blob(),
    fullname: '',
    username: '',
    email: '',
    bio: '',
  });

  const isVisible = searchParams.get('add') === 'true';
  const onClose = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('add');
      return newParams;
    });
  };

  const isFormFilled = Object.values(identity).some((val) => {
    // Jika value bernilai string (input teks)
    if (typeof val === 'string' && val.trim() !== '') {
      return true;
    }
    // Jika value berupa Blob/File (input avatar) dan ukurannya > 0
    if (val instanceof Blob && val.size > 0) {
      return true;
    }
    return false;
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const result = await addIdentity(identity as TypeIdentityByName);
        alert(result.username + ' added successfully!');
        setIdentity({
          avatar: new Blob(),
          fullname: '',
          username: '',
          email: '',
          bio: '',
        });
        if (onIdentityAdded) {
          onIdentityAdded();
        }
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [identity, onIdentityAdded],
  );

  const handleCancel = useCallback(() => {
    if (isFormFilled) {
      if (confirm('Are you sure you want to cancel? All data will be lost.')) {
        setIdentity({
          avatar: new Blob(),
          fullname: '',
          username: '',
          email: '',
          bio: '',
        });
        onClose();
      }
    } else {
      onClose();
    }
  }, [identity, onClose]);

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
    if (isVisible && isFormFilled) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Cleanup fungsi ini AKAN SELALU berjalan setiap ada perubahan dependency
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isVisible, isFormFilled]); // Tambahkan isFormFilled di sini

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
                  title='Tap to Add Avatar'
                  className='relative w-[150px] h-[150px]'
                >
                  <RenderAvatar
                    src={identity.avatar as Blob}
                    width={150}
                    alt={identity.fullname}
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
              <Input
                label='Full Name'
                type='text'
                id='fullname'
                name='fullname'
                placeholder='Your Full Name'
                className='w-full'
                value={identity.fullname}
                onChange={(e) =>
                  setIdentity((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
                required
              />
              <div className='w-full flex flex-row items-center justify-center gap-4'>
                <Input
                  label='Username'
                  type='text'
                  id='username'
                  name='username'
                  placeholder='username'
                  className='w-full'
                  value={identity.username}
                  onChange={(e) =>
                    setIdentity((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  label='Email'
                  type='email'
                  id='email'
                  name='email'
                  placeholder='email@example.com'
                  className='w-full'
                  value={identity.email}
                  onChange={(e) =>
                    setIdentity((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className='w-full'>
                <label
                  className='block w-full text-sm font-medium'
                  htmlFor='bio'
                >
                  Bio
                </label>
                <Textarea
                  id='bio'
                  name='bio'
                  placeholder='About yourself'
                  value={identity.bio}
                  onChange={(e) =>
                    setIdentity((prev) => ({ ...prev, bio: e.target.value }))
                  }
                />
              </div>
              <div className='w-full flex flex-row items-center justify-center gap-4'>
                <Button
                  buttonType='error'
                  onClick={handleCancel}
                  type='button'
                  className='w-full'
                >
                  Cancel
                </Button>
                <Button className='w-full'>Add New Identity</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
