import { createSlice } from '@reduxjs/toolkit';

const currencyList =  [
  {
    country: 'Unites States',
    Currency: 'Dollar',
    short: 'USD'
  },
  {
    country: 'Canada',
    Currency: 'Canadian Dollar',
    short: 'CAD'
  },
  {
    country: 'China',
    Currency: 'Chinese Yuan',
    short: 'CNY'
  },
  {
    country: 'Czech Republic',
    Currency: 'Czech koruna',
    short: 'CZK'
  },
  {
    country: 'Denmark',
    Currency: 'Danish Krone',
    short: 'DKK'
  },
  {
    country: 'European Union',
    Currency: 'Euro',
    short: 'EUR'
  },
  {
    country: 'United Kingdom',
    Currency: 'Pound Sterling',
    short: 'GBP'
  },
  {
    country: 'Japan',
    Currency: 'Japanese Yen',
    short: 'JPY'
  },
  {
    country: 'Norway',
    Currency: 'Norwegian Krone',
    short: 'NOK'
  },
  {
    country: 'New Zealand',
    Currency: 'New Zealand Dollar',
    short: 'NZD'
  },
  {
    country: 'Australia',
    Currency: 'Australia Dollar',
    short: 'AUD'
  }
]

const initialState = {
  from: currencyList[0].short,
  to: currencyList[5].short,
  currencyList: currencyList
}

const selectSlice = createSlice({
  name: 'select',
  initialState: initialState,
  reducers: {
    selectChange(state, action) {
      state[action.payload.fieldType] = action.payload.currency;
    }
  }
});

export const selectAction = selectSlice.actions;
export default selectSlice;