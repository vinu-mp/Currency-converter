import { createSlice } from '@reduxjs/toolkit';

// Accomodating inverse here itself inorder to reduce computation and ease JSON lookup
const CURRENCY_MAP = {
  AUD: { 
    direct: { USD: 0.8371 },
    lookUp: {
      USD: ['CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'JPY', 'NOK', 'NZD']
    }
  },
  CAD: { 
    direct: { USD: 0.8711 },
    lookUp: {
      USD: ['AUD', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'JPY', 'NOK', 'NZD']
    }
  },
  GBP: { 
    direct: { USD: 1.5683 },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'JPY', 'NOK', 'NZD']
    }
  },
  NZD: { 
    direct: { USD: 0.7750 },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'JPY', 'NOK', 'GBP']
    }
  },
  NOK: { 
    direct: { EUR: 0.1154 },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'GBP', 'JPY', 'NZD'],
      EUR: ['CZK','DKK', 'USD']
    }
  },
  DKK: { 
    direct: { EUR: 0.1343 },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'EUR', 'GBP', 'JPY', 'NZD'],
      EUR: ['CZK','NOK', 'USD']
    }
  },
  CZK: { 
    direct: { EUR: 0.0362 },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'EUR', 'GBP', 'JPY', 'NZD'],
      EUR: ['DKK','NOK', 'USD']
    }
  },
  CNY: { 
    direct: { USD: 0.1620 },
    lookUp: {
      USD: ['CAD', 'AUD', 'CZK', 'DKK', 'EUR', 'GBP', 'JPY', 'NOK', 'NZD']
    }
  },
  JPY: { 
    direct: { USD: 0.0083 },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'NOK', 'NZD']
    }
  },
  USD: {
    direct: { 
      CNY: 6.1715,
      AUD: 1.1946,
      CAD: 1.1479,
      EUR: 0.8120,
      GBP: 0.6376,
      NZD: 1.2903,
      JPY: 119.95
    },
    lookUp: {
      EUR: ['CZK','DKK', 'NOK']
    }
  },
  EUR: {
    direct: { 
      USD: 1.2315,
      CZK: 27.6028,
      DKK: 7.4406,
      NOK: 8.6651
    },
    lookUp: {
      USD: ['AUD', 'CAD', 'CNY', 'GBP', 'JPY', 'NZD']
    }
  }
}

const initialState = { currencyMap: {...CURRENCY_MAP}}
const currencyListSlice = createSlice({
  name: 'currencyList',
  initialState: initialState,
  // No need for reducers as of now
  reducers: {}
});

export default currencyListSlice;