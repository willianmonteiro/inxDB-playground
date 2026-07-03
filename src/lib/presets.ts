export interface Preset {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const presets: Preset[] = [
  {
    id: 'add',
    title: 'Add documents',
    description: 'Collections are created on first use',
    code: `// Collections (object stores) are created automatically on first use
await db.collection('users').add({ id: 'u1', name: 'Ana', age: 30 });
await db.collection('users').add({ id: 'u2', name: 'Bia', age: 25 });

// Without an id, InxDB generates a UUID
const caio = await db.collection('users').add({ name: 'Caio', age: 40 });
console.log('generated id:', caio.id);

return db.collection('users').get();
`,
  },
  {
    id: 'get-all',
    title: 'Get all documents',
    description: 'Read a whole collection',
    code: `return db.collection('users').get();
`,
  },
  {
    id: 'get-by-id',
    title: 'Get by id',
    description: 'Look up one document by key',
    code: `return db.collection('users').doc('u1').get();
`,
  },
  {
    id: 'query',
    title: 'Query by criteria',
    description: 'Match fields, including nested ones',
    code: `await db.collection('cities').add({ id: 'c1', name: 'Lisbon', geo: { country: 'PT' } });
await db.collection('cities').add({ id: 'c2', name: 'Porto', geo: { country: 'PT' } });
await db.collection('cities').add({ id: 'c3', name: 'Madrid', geo: { country: 'ES' } });

// First document whose fields all match, nested objects included
return db.collection('cities').doc({ geo: { country: 'ES' } }).get();
`,
  },
  {
    id: 'update',
    title: 'Update a document',
    description: 'Merge changes into a document',
    code: `await db.collection('users').add({ id: 'u1', name: 'Ana', age: 30 });

// Merges the changes and returns the updated document
return db.collection('users').doc('u1').update({ age: 31 });
`,
  },
  {
    id: 'delete-doc',
    title: 'Delete a document',
    description: 'By key or by criteria',
    code: `await db.collection('users').add({ id: 'u1', name: 'Ana', age: 30 });
await db.collection('users').add({ id: 'u2', name: 'Bia', age: 25 });

await db.collection('users').doc('u1').delete();

return db.collection('users').get();
`,
  },
  {
    id: 'set',
    title: 'Replace a collection',
    description: 'set() swaps the entire contents',
    code: `// Clears the collection and inserts these documents in one transaction
return db.collection('users').set([
  { id: 'u1', name: 'Ana', age: 31 },
  { id: 'u2', name: 'Bia', age: 25 },
]);
`,
  },
  {
    id: 'clear',
    title: 'Clear a collection',
    description: 'Delete every document',
    code: `await db.collection('users').delete();

return db.collection('users').get();
`,
  },
  {
    id: 'errors',
    title: 'Error handling',
    description: 'Typed errors for failure cases',
    code: `try {
  await db.collection('users').doc('missing').update({ age: 1 });
} catch (error) {
  // DocumentNotFoundError: no document matches "missing"
  console.error(error.message);
}
`,
  },
  {
    id: 'destroy',
    title: 'Reset the database',
    description: 'Drop everything and start over',
    code: `await db.destroy();
console.log('database deleted');
`,
  },
];
