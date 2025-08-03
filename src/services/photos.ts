import axios from "axios";
import type { Photo } from "../types/photo";


axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = import.meta.env.VITE_API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

interface FetchPhotosResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[]
}


export const getPhotos = async (query: string): Promise<FetchPhotosResponse> => {
  const { data } = await axios.get<FetchPhotosResponse>(`/search?query=${query}`);

  return data;
};
