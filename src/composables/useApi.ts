import axios, {AxiosError, type AxiosInstance, type AxiosRequestConfig, type CreateAxiosDefaults,} from "axios";
import {ref} from "vue";

import {useAuthStore} from "@/modules/auth/store";
import {generateFingerprint, getCookie} from "@/utils/browser";

export const useApi = (apiUrl?: string) => {
    const baseURL = apiUrl || (import.meta.env.VITE_APP_BASE_URL as string);
    const locale = getCookie("locale");
    const loading = ref(false);
    const authStore = useAuthStore();

    function $service(options?: CreateAxiosDefaults): AxiosInstance {
        const getHeaders = (): {
            Authorization: string;
            "Device-Id": string;
            "Accept-Language": string;
        } => ({
            ...options?.headers,
            "Accept-Language": locale || "uz",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMDk5NjgzLCJpYXQiOjE3MzIwODg4ODMsImp0aSI6IjMxNTY3OTMyZjExYzQzMTQ5NWU1NzgwYTgxNjY2MWVhIiwidXNlcl9pZCI6Ijc2NzYxNzRmLTc2YTQtNDExOC1hODc5LTJmNTBmMjc4ZjBjZiJ9.jljdzoG6BN9p_7NE5EFSc89AfgEo9JM2_CB7Vi-0NHQ",
            "Device-Id": generateFingerprint(),
        });

        const instance = axios.create({
            baseURL,
            ...options,
            headers: getHeaders(),
        });
        instance.interceptors.response.use(
            null,
            async function (error: AxiosError) {
                if (
                    error.response?.status === 401 &&
                    error.config?.url !== "/auth/token/refresh/"
                ) {
                    try {
                        // DO REFRESH TOKEN LOGIC HERE in authStore
                        return axios.request({
                            ...error.config,
                            headers: getHeaders(),
                        });
                    } catch (err: object) {
                        console.error(err);
                        authStore.logout();
                        return Promise.reject(error);
                    }
                } else {
                    return Promise.reject(error);
                }
            }
        );
        return instance;
    }

    function $get<T = never>(
        endpoint: string,
        options?: CreateAxiosDefaults
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            loading.value = true;
            $service(options)
                .get(endpoint)
                .then((response: T | object) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response);
                })
                .finally(() => {
                    loading.value = false;
                });
        });
    }

    function $post<T = never, D = Record<string, object> | FormData>(
        endpoint: string,
        data?: D,
        options?: AxiosRequestConfig,
        axiosOptions?: CreateAxiosDefaults
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            $service(axiosOptions)
                .post(endpoint, data, options)
                .then((response: T | object) => {
                    resolve(response.data);
                })
                .catch((error) => reject(error.response))
                .finally(() => {
                    loading.value = false;
                });
        });
    }

    function $put<T = never, D = Record<string, object> | FormData>(
        endpoint: string,
        data?: D,
        options?: AxiosRequestConfig,
        axiosOptions?: CreateAxiosDefaults
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            $service(axiosOptions)
                .put(endpoint, data, options)
                .then((response: T | object) => {
                    resolve(response.data);
                })
                .catch((error) => reject(error.response))
                .finally(() => {
                    loading.value = false;
                });
        });
    }

    function $patch<T = never, D = Record<string, object> | FormData>(
        endpoint: string,
        data?: D,
        options?: AxiosRequestConfig,
        axiosOptions?: CreateAxiosDefaults
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            $service(axiosOptions)
                .patch(endpoint, data, options)
                .then((response: T | object) => {
                    resolve(response.data);
                })
                .catch((error) => reject(error.response))
                .finally(() => {
                    loading.value = false;
                });
        });
    }

    function $delete<T = never>(
        endpoint: string,
        options?: AxiosRequestConfig,
        axiosOptions?: CreateAxiosDefaults
    ): Promise<T> {
        return new Promise((resolve, reject) => {
            $service(axiosOptions)
                .delete(endpoint, options)
                .then((response: T | object) => {
                    resolve(response.data);
                })
                .catch((error) => reject(error.response))
                .finally(() => {
                    loading.value = false;
                });
        });
    }

    return {
        loading,
        baseURL,
        $get,
        $post,
        $put,
        $patch,
        $delete,
    };
};
