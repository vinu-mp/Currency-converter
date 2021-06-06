import { configureStore } from '@reduxjs/toolkit';
import currencyListSlice from './currency-list-slice';
import selectSlice from './select-change-slice';

const store = configureStore({
  reducer: { 
    select: selectSlice.reducer, 
    currency: currencyListSlice.reducer 
  }
});

export default store;
