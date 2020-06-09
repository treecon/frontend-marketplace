import Api from '@/service/api';

import { AxiosServerResponse, ServerResponse } from '@/model/response';
import { CatalogueQuery, CatalogueQueryResponse, CatalogueItem } from '@/model';
import { AxiosResponse } from 'axios';

export default class CatalogueApi extends Api {
  constructor() {
    super({ withCredentials: true });
  }

  public async find(query: string | CatalogueQuery, page = 0, size = 10): Promise<CatalogueQueryResponse> {
    const url = '/action/catalogue';

    const data: CatalogueQuery = typeof query === 'string' ? { query, page, size } : query;

    return this.post<CatalogueQuery, CatalogueQueryResponse>(url, data)
      .then((response: AxiosResponse<CatalogueQueryResponse>) => {
        const { data: serverResponse } = response;

        return serverResponse;
      });
  }

  public async findOne(id: string): Promise<ServerResponse<CatalogueItem>> {
    const url = `/action/catalogue/${id}`;

    return this.get<ServerResponse<CatalogueItem>>(url)
      .then((response: AxiosServerResponse<CatalogueItem>) => {
        const { data } = response;

        return data;
      });
  }
}