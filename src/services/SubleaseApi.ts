import apiClient from "./ApiClient";
import { ISublease } from "../model/Sublease";

interface ApiResponse {
  $values: ISublease[];
}

export const getSublease = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/Sublease");
  return response.data;
};

// export const createCounterparty = async (menu: ISublease): Promise<ISublease> => {
//   const response = await apiClient.post<ISublease>("/api/Counterparty/add", menu);
//   return response.data;
// };

export const updateCounterparty = async (id: number, menu: Partial<ISublease>): Promise<ISublease> => {
  const response = await apiClient.put<ISublease>(`/api/Counterparty/${id}`, menu);
  return response.data;
};


export const deleteCounterparty = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/Counterparty/${id}`);
};