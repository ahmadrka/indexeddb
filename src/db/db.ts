import { Dexie, type Table } from 'dexie';
import { v7 as uuidv7 } from 'uuid';

// Database tables interface for field consistency and data type
export interface TypeIdentityByName {
  id?: string;
  avatar: File | Blob | string | null;
  fullname: string;
  username: string;
  email: string;
  bio: string;
  createdAt?: Date;
}

// Database sort interface for sort data (optional)
export type TypeSort = {
  field: 'fullname' | 'username' | 'email';
  order: 'asc' | 'desc';
};

// Database class
class IdentityManager extends Dexie {
  identities!: Table<TypeIdentityByName>;

  constructor() {
    super('IdentityManager');

    this.version(1).stores({
      // Use ++id for auto-increment primary key (in this case, we using
      // uuidv7 for primary key)
      identities: 'id, username, email, createdAt', // Only for indexes fields
    });
  }
}

// Create database instance from class (you can access db globally)
export const db = new IdentityManager();

// Persist database check
// Use for presisten storage (it will not clear when browser storage quota full)
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((persistent) => {
    console.log(`Storage persistent: ${persistent}`);
  });
}

// ====================================================================
// CRUD: Create, Read, Update, Delete functions for database operations
// ====================================================================

// You can use db operation directly, but with this function make it best
// practice for consistency, reusable, and more type safe.

// CREATE: add new identity to DB
export async function addIdentity(data: TypeIdentityByName) {
  const { username, email } = data;

  // Get username or email if it already exists
  const isUsernameExist = await db.identities.get({ username });
  const isEmailExist = await db.identities.get({ email });

  // Check if username or email already exists
  if (isUsernameExist) {
    alert('Username already exists');
    return null;
  }
  if (isEmailExist) {
    alert('Email already exists');
    return null;
  }

  // Set new identity
  const newIdentity: TypeIdentityByName = {
    ...data,
    id: uuidv7(),
    username: username.trim().toLowerCase(),
    createdAt: new Date(),
  };
  await db.identities.add(newIdentity);

  return newIdentity;
}

// READ: get all identities from DB or search by username or email
export async function getAllIdentities(search?: string, sort?: TypeSort) {
  // Get username or email if search keyword exists
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
    // If no search keyword, get all identities and sort by createdAt (newest first)
    const identities = await db.identities
      .orderBy('createdAt')
      .reverse()
      .toArray();

    return identities;
  }
}

// READ: get identity by id from DB
export async function getIdentityById(id: string) {
  const identity = await db.identities.get(id);

  return identity;
}

// UPDATE: update identity in DB
export async function editIdentity(data: TypeIdentityByName) {
  await db.identities.update(data.id, data);

  return data;
}

// DELETE: hard delete identity from DB by id
export async function deleteIdentity(id: string) {
  await db.identities.delete(id);

  return id;
}

// DELETE: hard delete all identities from DB
export async function deleteAllIdentities() {
  await db.identities.clear(); // Use with caution (can clear all data)
}
