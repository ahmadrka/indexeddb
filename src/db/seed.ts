import { db } from './db';
import { v7 as uuidv7 } from 'uuid';

// All this image from https://thispersonnotexist.org/
import avatar1 from '../assets/random-avatar/avatar1.jpeg';
import avatar2 from '../assets/random-avatar/avatar2.jpeg';
import avatar3 from '../assets/random-avatar/avatar3.jpeg';
import avatar4 from '../assets/random-avatar/avatar4.jpeg';
import avatar5 from '../assets/random-avatar/avatar5.jpeg';
import avatar6 from '../assets/random-avatar/avatar6.jpeg';
import avatar7 from '../assets/random-avatar/avatar7.jpeg';
import avatar8 from '../assets/random-avatar/avatar8.jpeg';
import avatar9 from '../assets/random-avatar/avatar9.jpeg';
import avatar10 from '../assets/random-avatar/avatar10.jpeg';
import avatar11 from '../assets/random-avatar/avatar11.jpeg';
import avatar12 from '../assets/random-avatar/avatar12.jpeg';
import avatar13 from '../assets/random-avatar/avatar13.jpeg';
import avatar14 from '../assets/random-avatar/avatar14.jpeg';
import avatar15 from '../assets/random-avatar/avatar15.jpeg';
import avatar16 from '../assets/random-avatar/avatar16.jpeg';

async function fetchImageAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}

export default async function seedDb() {
  await db.identities.bulkAdd([
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar12),
      username: 'johndoe',
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar6),
      username: 'janedoe',
      fullname: 'Jane Doe',
      email: 'janedoe@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar7),
      username: 'fulan',
      fullname: 'Fulan bin Fulan',
      email: 'fulan@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar8),
      username: 'fulanah',
      fullname: 'Fulanah binti Fulanah',
      email: 'fulanah@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar13),
      username: 'johnsmith',
      fullname: 'John Smith',
      email: 'johnsmith@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar9),
      username: 'michaelbrown',
      fullname: 'Michael Brown',
      email: 'michaelbrown@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar4),
      username: 'yamadatarou',
      fullname: 'J山田太郎',
      email: 'yamadatarou@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar14),
      username: 'emilyjones',
      fullname: 'Emily Jones',
      email: 'emilyjones@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar5),
      username: 'davidwilson',
      fullname: 'David Wilson',
      email: 'davidwilson@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar11),
      username: 'honggildong',
      fullname: '홍길동',
      email: 'honggildong@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar16),
      username: 'parkchulsu',
      fullname: '박철수',
      email: 'parkchulsu@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar15),
      username: 'parkminjun',
      fullname: '박민준',
      email: 'parkminjun@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar10),
      username: 'davidwilson',
      fullname: 'David Wilson',
      email: 'davidwilson@example.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(
        'https://media.licdn.com/dms/image/v2/D5603AQGfCzysTbb44w/profile-displayphoto-scale_200_200/B56aBnUTLkJkAc-/0/1788439773576?e=2147483647&v=beta&t=FlDL0eECiR0uYrUxaJeBnX_sfsy_Hd3NZ9-Zdz2vJMM',
      ),
      username: 'ahmadrka',
      fullname: 'Ahmad Arkan',
      email: 'hi@ahmadrka.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar2),
      username: 'qwerty',
      fullname: 'qwerty',
      email: 'qwerty@mail.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar1),
      username: 'asdf',
      fullname: 'asdf',
      email: 'asdf@mail.com',
      bio: '',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar3),
      username: 'zxc',
      fullname: 'zxc',
      email: 'zxc@mail.com',
      bio: '',
      createdAt: new Date(),
    },
  ]);

  return `Success seed ${await db.identities.count()} identities`;
}
