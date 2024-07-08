import { config } from "@/config";
import axios from "axios";

const uploadFiles = async (files: File[]) => {
  const url = `${config.API_URL}/file/upload`;

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return axios
    .post<{ fileUrls: string[] }>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

const fileService = {
  uploadFiles,
};

export default fileService;