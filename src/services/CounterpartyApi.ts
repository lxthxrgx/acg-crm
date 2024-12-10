import apiClient from "./ApiClient";
import { Counterparty } from "../model/counterparty";

interface ApiResponse {
  $values: Counterparty[];
}

export const getCounterparty = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/Counterparty");
  return response.data;
};

export const createCounterparty = async (menu: Counterparty): Promise<Counterparty> => {
  const response = await apiClient.post<Counterparty>("/api/Counterparty/add", menu);
  return response.data;
};

export const updateCounterparty = async (id: number, menu: Partial<Counterparty>): Promise<Counterparty> => {
  const response = await apiClient.put<Counterparty>(`/api/Counterparty/${id}`, menu);
  return response.data;
};


export const deleteCounterparty = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/Counterparty/${id}`);
};