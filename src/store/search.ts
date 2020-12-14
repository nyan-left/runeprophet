/* eslint-disable no-restricted-syntax */
import Fuse from 'fuse.js';
import items from './list';

function fuzzySearch(text: any) : { id : number, name : string}[] {
  const fuse = new Fuse(items, {
    includeScore: true,
    keys: ['name'],
    minMatchCharLength: 3,
    threshold: 0.1,
  });
  const result = fuse.search(text, { limit: 10 });

  const response : { id : number, name : string}[] = [];

  for (const res of result) {
    response.push({
      id: res.item.id, name: res.item.name,
    });
  }

  return response;
}

export default fuzzySearch;
