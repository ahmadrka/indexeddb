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

export default async function generateSeedDb() {
  const isConfirm = confirm(
    "Are you sure to generate seed data?\n\nNOTE: Current identities wouldn't be deleted.",
  );
  if (!isConfirm) return;

  await db.identities.bulkAdd([
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar12),
      username: 'johndoe',
      fullname: 'John Doe',
      email: 'johndoe@example.com',
      bio: 'Turning coffee into clean code ☕💻 | Open source enthusiast & late-night debugger.',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar6),
      username: 'janedoe',
      fullname: 'Jane Doe',
      email: 'janedoe@example.com',
      bio: 'Digital Nomad ✈️ | Crafting pixel-perfect UIs & exploring local coffee shops around the globe 🌍',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar7),
      username: 'fulan',
      fullname: 'Fulan bin Fulan',
      email: 'fulan@example.com',
      bio: 'Cybersecurity researcher by day, indie game developer by night 🎮🔐',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar8),
      username: 'fulanah',
      fullname: 'Fulanah binti Fulanah',
      email: 'fulanah@example.com',
      bio: 'Product Designer 🎨 | Obsessed with micro-interactions, dark mode, and minimal design ✨',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar13),
      username: 'johnsmith',
      fullname: 'John Smith',
      email: 'johnsmith@example.com',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar9),
      username: 'michaelbrown',
      fullname: 'Michael Brown',
      email: 'michaelbrown@example.com',
      bio: 'DevOps Alchemist 🧙‍♂️ | Automating infrastructure & keeping servers online 24/7 🚀',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar4),
      username: 'yamadatarou',
      fullname: 'J山田太郎',
      email: 'yamadatarou@example.com',
      bio: '熱しやすく冷めやすい、好奇心旺盛なクリエイター。最近はAIと画像生成にハマってます 🤖✨',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar14),
      username: 'emilyjones',
      fullname: 'Emily Jones',
      email: 'emilyjones@example.com',
      bio: 'AI & Machine Learning Explorer 🤖 | Training models and prompt engineering 🔮',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar10),
      username: 'davidwilson',
      fullname: 'David Wilson',
      email: 'davidwilson@example.com',
      bio: 'Fullstack Architect 🏗️ | Building scalable web apps with React & Node.js 🚀',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar11),
      username: 'honggildong',
      fullname: '홍길동',
      email: 'honggildong@example.com',
      bio: '데이터 분석가 📈 | 통계와 인사이트로 비즈니스를 성장시키는 전문가 💼',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar16),
      username: 'parkchulsu',
      fullname: '박철수',
      email: 'parkchulsu@example.com',
      bio: '백엔드 엔지니어 🛠️ | 안정적이고 효율적인 서버 아키텍처 설계 및 구축 전문가 🔐',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar15),
      username: 'parkminjun',
      fullname: '박민준',
      email: 'parkminjun@example.com',
      bio: 'UX/UI 디자이너 ✨ | 사용자의 마음을 사로잡는 매력적인 인터페이스를 만듭니다 🎨',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar5),
      username: 'rikayulianti',
      fullname: 'Rika Yulianti',
      email: 'rikayulianti@example.com',
      bio: 'Digital Marketing & Content Creator ✨',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9n25a_GFmL4qxJmEkoaQpTxnuAhGj8XfpJrI4fui88nPJBJlFl5Git6ivZdgCxafZE9NvBWc57pxDo_b4JABc6Z8SZ1uAzXLdfz8PCAWdLg&s=10',
      ),
      username: 'bambangpamungkas',
      fullname: 'Bambang Pamungkas',
      email: 'bambangpamungkas@example.com',
      bio: 'Legenda sepak bola Indonesia',
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
      bio: 'I love learning new thinks and imagine "how the world works".',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar2),
      username: 'qwerty',
      fullname: 'qwerty',
      email: 'qwerty@mail.com',
      bio: 'ASMR Mechanical Keyboard Enthusiast ⌨️',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar1),
      username: 'asdf',
      fullname: 'asdf',
      email: 'asdf@mail.com',
      bio: 'Ethical Hacker 🛡️ | Finding bugs before the bad guys do | Bug Bounty Hunter 🎯',
      createdAt: new Date(),
    },
    {
      id: uuidv7(),
      avatar: await fetchImageAsBlob(avatar3),
      username: 'zxc',
      fullname: 'zxc',
      email: 'zxc@mail.com',
      bio: 'Digital Fashion Designer ✨ | Blending code & creativity to craft virtual haute couture 🤖👗',
      createdAt: new Date(),
    },
  ]);

  localStorage.setItem('has_seed', 'true');
  return `Success seed ${await db.identities.count()} identities`;
}
