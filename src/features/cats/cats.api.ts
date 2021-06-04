import { config } from '../../constants';
import { CatSummary } from './cats.models';

export interface MakeRequestArgs extends RequestInit {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, string>;
}

interface ApiSearchResponse {
  rows: CatSummary[];
  paginationCount: number;
  paginationLimit: number;
  paginationPage: number;
}

export async function makeCatApiRequest(
  path: string,
  options?: MakeRequestArgs
): Promise<Response> {
  const finalOptions: MakeRequestArgs = {
    ...(options || {
      method: 'GET'
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.catsapi.apiKey
    }
  };

  const url = new URL(config.catsapi.baseUrl + path);
  if (options?.params) {
    url.search = new URLSearchParams(options.params).toString();
  }

  return fetch(url.toString(), finalOptions);
}

export async function search(
  q: string,
  page = 1,
  limit = 10
): Promise<ApiSearchResponse> {
  const searchResponse = await makeCatApiRequest('/images/search', {
    method: 'GET',
    params: {
      page: String(page),
      limit: String(limit)
    }
  });
  const paginationCount = Number(
    searchResponse.headers.get('pagination-count')
  );
  const paginationLimit = Number(
    searchResponse.headers.get('pagination-limit')
  );
  const paginationPage = Number(searchResponse.headers.get('pagination-page'));
  return {
    paginationCount,
    paginationLimit,
    paginationPage,
    rows: (await searchResponse.json()) as CatSummary[]
  };
}
