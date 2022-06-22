const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';

function generateURL(base: string, params: Record<string, string> = {}) {
  const url = new URL(base);

  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  url.searchParams.append('json', '');

  return url;
}

export function getExchangeRate(params?: { valcode?: string; date?: string }) {
  const url = generateURL(API_URL, params);

  return fetch(url).then((response) => response.json());
}
