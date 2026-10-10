import { useState, useEffect } from 'react';
import { type TypeIdentityByName, getAllIdentities } from '../db/db';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import avatarPlaceholder from '../assets/avatar-placeholder.svg';
import RenderAvatar from './ui/RenderAvatar';

export function IdentityList({ refreshTrigger }: { refreshTrigger: number }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [identityList, setIdentityList] = useState<TypeIdentityByName[]>([]);

  useEffect(() => {
    let isMounted = true;
    getAllIdentities(searchParams.get('search') || '').then((data) => {
      if (isMounted) {
        setIdentityList(data); // Cukup set data yang dikembalikan dari API
      }
    });

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger, searchParams.get('search')]);

  return (
    <div className='w-full flex flex-col items-center justify-start transition-all duration-300 ease-in-out'>
      <h1 className='mt-4 font-bold text-xl'>All Identities</h1>
      <p>click item identity to show detail</p>
      <div className='w-full mx-auto p-4 flex justify-center flex-wrap gap-4'>
        {identityList.map((item) => (
          <button
            key={item.id}
            className='w-full max-w-md flex flex-row gap-4 bg-white rounded-3xl p-3 cursor-pointer'
            onClick={() => navigate(`/profile/${item.id}${location.search}`)}
          >
            <RenderAvatar
              src={item.avatar as Blob}
              width={100}
              alt={item.fullname}
            />
            <div className='flex flex-col gap-1 items-start'>
              <h2 className='w-75 text-lg text-left font-bold truncate'>
                {item.fullname}
              </h2>
              <p className='text-sm text-center text-gray-600'>
                {item?.username}
              </p>
              <p className='w-75 text-sm text-left line-clamp-2'>
                {item.bio ? <>{item.bio}</> : <i>no bio</i>}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
