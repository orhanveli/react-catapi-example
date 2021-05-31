import { config } from '../../constants';

export interface MakeRequestArgs extends RequestInit {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
}

export async function makeCatApiRequest<T = unknown>(
  path: string,
  options?: MakeRequestArgs
): Promise<T> {
  const finalOptions: MakeRequestArgs = {
    ...(options || {
      method: 'GET'
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.catsapi.apiKey
    }
  };

  const url = new URL(config.catsapi.apiKey + path);
  if (options?.params) {
    url.search = new URLSearchParams(options.params).toString();
  }

  const apiResponse = await fetch(url.toString(), finalOptions);
  return apiResponse.json() as Promise<T>;
}

export async function search(q: string, page = 1, limit = 10) {
  const searchResponse = makeCatApiRequest('/images/search', {
    method: 'GET',
    params: {
      page: String(page),
      limit: String(limit)
    }
  });
  return searchResponse;
}
