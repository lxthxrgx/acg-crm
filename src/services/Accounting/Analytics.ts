import apiClient from "../ApiClient";
import { IAnalytics } from "../../model/Accounting/analytics";

interface ApiResponse {
  $values: IAnalytics[];
}

export const getAnalytics = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/Analytics");
  return response.data;
};

export const getCounterparty = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/Counterparty");
  return response.data;
};

export const getGuard = async (): Promise<ApiResponse> => {
  const response = await apiClient.get<ApiResponse>("/api/Guard");
  return response.data;
};