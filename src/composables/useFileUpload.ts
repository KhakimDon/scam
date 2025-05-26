import { useApi } from "@/composables/useApi";
import { ICDNFile } from "@/types/common";

export const useFileUpload = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  function upload(file: File): Promise<ICDNFile> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      useApi(baseUrl)
        .$post<ICDNFile>("/cdn/api/v1/UploadFile/", formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function getFile(id: string): Promise<ICDNFile> {
    return new Promise((resolve, reject) => {
      useApi(baseUrl)
        .$get<ICDNFile>("/cdn/api/v1/UploadFile/" + id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return { upload, getFile };
};
