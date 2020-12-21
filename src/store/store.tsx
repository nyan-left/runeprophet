/* eslint-disable no-unused-vars */
import create from 'zustand';

export {};

type ShowGraph = {
    showGraph : boolean,
    set : (setShowGraph : boolean) => void,
};

const showGraph = create<ShowGraph>((set) => ({
  showGraph: true,
  set: (setShowGraph) => set({ showGraph: setShowGraph }),
}));

type ShowSearch = {
    showSearch : boolean,
    set : (setSearching : boolean) => void,
};

const showSearch = create<ShowSearch>((set) => ({
  showSearch: true,
  set: (setSearching) => set({ showSearch: setSearching }),
}));

const useStore = { showGraph, showSearch };

export default useStore;
