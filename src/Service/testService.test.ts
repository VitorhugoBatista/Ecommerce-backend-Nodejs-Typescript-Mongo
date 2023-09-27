import { getBitcoinPrice } from './bitcoinPriceService';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new AxiosMockAdapter(axios);

describe("getBitcoinPrice Service", () => {
  it("should return a bitcoin price for USD", async () => {
    const mockResponse = {
      disclaimer: "This is a test",
      chartName: "Bitcoin",
      bpi: {
        USD: { code: "USD", rate: "60000.00" },
        GBP: { code: "GBP", rate: "40000.00" },
        EUR: { code: "EUR", rate: "50000.00" },
      },
    };

    mock.onGet('https://api.coindesk.com/v1/bpi/currentprice.json').reply(200, mockResponse);

    const result = await getBitcoinPrice("USD")
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("usdRate");
    expect(result.usdRate).toBe("60000.00");
  });

  it("should throw an error for invalid currency", async () => {
    await expect(getBitcoinPrice("INVALID")).rejects.toThrow("Invalid Currency");
  });
});