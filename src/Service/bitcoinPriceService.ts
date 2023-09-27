import { Response, Request } from "express";
import axios from "axios";
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'


const myCache = new CacheContainer(new MemoryStorage());

interface BitcoinRate {
  code: string;
  rate: string;
}

interface BitcoinResponse {
  disclaimer: string;
  chartName: string;
  bpi: {
    USD: BitcoinRate;
    GBP: BitcoinRate;
    EUR: BitcoinRate;
  };
}
async function fetchBitcoinCotation() {
  try {
    const response = await axios.get<BitcoinResponse>(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    const {
      disclaimer,
      chartName,
      bpi: { USD, GBP, EUR }
    } = response.data;
    
    const bitcoinData = {
      disclaimer,
      chartName,
      rates: {
        USD: { usdRate: USD.rate },
        GBP: { gbpRate: GBP.rate },
        EUR: { eurRate: EUR.rate }
      }
    };
    return bitcoinData;
  } catch (error) {
    throw new Error('erro 404');
  }

}

export async function getBitcoinPrice(currency: string): Promise<any> {
  const cacheKey = `bitcoin-price-${currency}`
  const cachedPrice = await myCache.getItem<string>(cacheKey);
  if (cachedPrice) {
    console.log(cachedPrice)
    return cachedPrice;
  }
  let price;
  let cotation = await fetchBitcoinCotation()
  switch (currency) {
    case 'USD':
      price = cotation?.rates.USD;
      break;

    case 'GBP':
      price = cotation?.rates.GBP;
      break;

    case 'EUR':
      price = cotation?.rates.EUR;
      break;

    default:
      throw new Error('Invalid Currency');
  }

  if (price) {
    await myCache.setItem(cacheKey, price, { ttl: 900 });
  }

  return price;
}
