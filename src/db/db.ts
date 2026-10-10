import { Dexie, type Table } from 'dexie';
import { v7 as uuidv7 } from 'uuid';

export interface TypeIdentityByName {
  id?: string;
  avatar: File | Blob | string | null;
  fullname: string;
  username: string;
  email: string;
  bio: string;
  createdAt?: Date;
}

export class IdentityManager extends Dexie {
  identities!: Table<TypeIdentityByName>;

  constructor() {
    super('IdentityManager');

    this.version(1).stores({
      identities: 'id, username, email, createdAt',
    });
  }
}

export const db = new IdentityManager();

if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((persistent) => {
    console.log(`Storage persistent: ${persistent}`);
  });
}

export type TypeSort = {
  field: 'fullname' | 'username' | 'email';
  order: 'asc' | 'desc';
};

export async function getAllIdentities(search?: string, sort?: TypeSort) {
  if (search) {
    const query = search.toLowerCase().trim();

    const identities = await db.identities
      .filter((identity) => {
        return Object.values(identity).some((val) => {
          if (typeof val === 'string') {
            return val.toLowerCase().includes(query);
          }
          return false;
        });
      })
      .toArray();

    if (sort) {
      // Todo
    }

    return identities;
  } else {
    const identities = await db.identities
      .orderBy('createdAt')
      .reverse()
      .toArray();

    return identities;
  }
}

export async function getIdentityById(id: string) {
  const identity = await db.identities.get(id);

  return identity;
}

export async function addIdentity(data: TypeIdentityByName) {
  const { username, email } = data;

  const isUsernameExist = await db.identities.get({ username });
  const isEmailExist = await db.identities.get({ email });

  if (isUsernameExist) {
    alert('Username already exists');
    return null;
  }

  if (isEmailExist) {
    alert('Email already exists');
    return null;
  }

  const newIdentity: TypeIdentityByName = {
    ...data,
    id: uuidv7(),
    username: username.trim().toLowerCase(),
    createdAt: new Date(),
  };
  await db.identities.add(newIdentity);

  return newIdentity;
}

export async function editIdentity(data: TypeIdentityByName) {
  await db.identities.update(data.id, data);

  return data;
}

export async function deleteIdentity(id: string) {
  await db.identities.delete(id);

  return id;
}

export async function deleteAllIdentities() {
  await db.identities.clear();
}
