import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchField } from '@/types/types';

interface SearchState {
  value: string;
  selectedField: SearchField; // ya no es un array
  orderBy: { field: string; direction: 'asc' | 'desc' } | null;
  activeFilters: string[];
}

const initialState: SearchState = {
  value: '',
  selectedField: 'nombre',
  orderBy: null,
  activeFilters: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setSelectedField(state, action: PayloadAction<SearchField>) {
      state.selectedField = action.payload;
    },
    setOrderBy(state, action: PayloadAction<{ field: string; direction: 'asc' | 'desc' } | null>) {
      state.orderBy = action.payload;
    },
    clearSearch(state) {
      state.value = '';
      state.selectedField = 'nombre';
      state.orderBy = null;
    },
    toggleFilter(state, action: PayloadAction<string>) {
      const f = action.payload;
      if (state.activeFilters.includes(f)) {
        state.activeFilters = state.activeFilters.filter(x => x !== f);
      } else {
        state.activeFilters.push(f);
      }
    },
    setFilters(state, action: PayloadAction<string[]>) {
      state.activeFilters = action.payload;
    },
    clearFilters(state) {
      state.activeFilters = [];
    },
  },
});

export const {
  setSearchValue,
  setSelectedField,
  setOrderBy,
  clearSearch,
  toggleFilter,
  setFilters,
  clearFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
