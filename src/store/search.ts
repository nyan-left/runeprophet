import Fuse from 'fuse.js';
import items from './list';

function fuzzySearch(text: any) {
  const fuse = new Fuse(items, {
    includeScore: true,
    keys: ['name'],
    minMatchCharLength: 3,
    threshold: 0.1,
  });
  const result = fuse.search(text);

  return result;
}

export default fuzzySearch;
