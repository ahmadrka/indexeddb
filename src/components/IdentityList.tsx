import { useState, useEffect } from 'react';
import { type TypeIdentityByName, getAllIdentities } from '../db/db';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import RenderAvatar from './ui/RenderAvatar';
import Button from './ui/Button';
import generateSeedDb from '../db/seed';

export default function IdentityList({
  refreshTrigger,
  onIdentityGenerated,
}: {
  refreshTrigger: number;
  onIdentityGenerated: () => void;
}) {
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

  if (identityList.length !== 0) {
    return (
      <div className='mt-16 lg:mt-4 w-full flex flex-col items-center justify-start transition-all duration-300 ease-in-out'>
        <h1 className='font-bold text-xl'>All Identities</h1>
        <p>click item identity to show detail</p>
        <div className='w-full mx-auto p-4 flex justify-center flex-wrap gap-4'>
          {identityList.map((item) => (
            <button
              key={item.id}
              className='w-full max-w-md flex flex-row gap-4 bg-white rounded-3xl p-3 cursor-pointer'
              onClick={() => navigate(`/profile/${item.id}${location.search}`)}
            >
              <RenderAvatar
                src={item?.avatar as Blob}
                size={100}
                alt={item?.fullname}
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
  } else if (searchParams.get('search') && identityList.length === 0) {
    return (
      <div className='mt-16 lg:mt-4 w-full flex flex-col items-center justify-start transition-all duration-300 ease-in-out'>
        <h1 className='font-bold text-xl'>No Identities Found</h1>
        <p>try to search with another keyword</p>
      </div>
    );
  } else {
    return (
      <div className='mt-16 lg:mt-4 w-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out'>
        <h1 className='font-bold text-xl'>No Identities</h1>
        <p>click add identity to add new identity, or generate db seed.</p>
        <Button
          className='m-4'
          onClick={async () => {
            await generateSeedDb();
            onIdentityGenerated();
          }}
        >
          Generate Seed
        </Button>
      </div>
    );
  }
}
