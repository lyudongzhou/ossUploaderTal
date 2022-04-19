import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
export declare class Interceptors {
    instance: AxiosInstance;
    constructor(props: any, type?: string);
    init(type: any): void;
    getInterceptors(): AxiosInstance;
}
declare type formData = Record<string, string | Blob>;
/**
 * http请求封装
 * @class
 * @classdesc
 */
export declare class InterceptorBase {
    /**
     * @constructor
     * @param {string} url 接口组前缀
     * @param {boolean} isLocal 是否使用本地模式
     */
    constructor(url: string, isLocal?: boolean);
    get<T = any, R = AxiosResponse<T>, D = any>(path: string, params?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    /**
     * @description: 发送form格式的post请求
     * @param {string} path 接口后缀
     * @param {object} data 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    /**
     * @description: 发送json格式的post请求
     * @param {string} path 接口后缀
     * @param {object} data 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    postJson<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    /**
     * @description: 发送form-data格式的post请求
     * @param {string} path 接口后缀
     * @param {formData} data 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    postFile<T = any, R = AxiosResponse<T>>(url: string, data?: formData, config?: AxiosRequestConfig<formData>): Promise<R>;
}
export {};
