import axios from "axios";
import { UploadTrackInput } from "..";
import { BASE_URL } from "../../../config";

const uploadApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export async function uploadTrackFn(trackData: UploadTrackInput) {

    const response = await uploadApi.post(`upload/track/`, trackData);
    return response.data;
  };


  export async function searchSoundcloud(searchTerm: string) {

    const response = await uploadApi.get(`/upload/Search?searchTerm=${encodeURIComponent(searchTerm)}`);
    return response.data;
  };
