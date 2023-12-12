import axios from "axios";
import { UploadMixInput, UploadSongInput } from "..";
import { BASE_URL } from "../../../config";

const uploadApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export async function uploadMixFn(formData: UploadMixInput) {
    const response = await uploadApi.post(`upload/mix/`, formData);
    return response.data;
  };

  export async function uploadSongFn(formData: UploadSongInput) {
    const response = await uploadApi.post(`upload/song/`, formData);
    return response.data;
  };
