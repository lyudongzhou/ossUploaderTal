import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

import { ElMessage } from 'element-plus'

import qs from 'qs'
/**
 * @description: 处理接口请求错误
 * @param {AxiosInstance} instance
 * @return {*}
 */
function handleError(instance: AxiosInstance): void {
    instance.interceptors.response.use(
        (response) => {
            const { data } = response
            if (data.errcode === 0) {
                // response.data = data.data
            } else if (
                data.errcode === 10510000 ||
                data.errcode === 29999 ||
                data.errcode === 20004
            ) {
                setTimeout(() => {
                    window.localStorage.removeItem('token')
                    window.open(process.env.VUE_APP_LOGINURL, '_self')
                }, 1000)
            } else {
                ElMessage({ type: 'error', message: data.errmsg || '操作失败！' })
            }
            return Promise.resolve(response)
        },
        (err) => {
            ElMessage({ type: 'error', message: err.message || '操作失败！' })
            return Promise.reject(err)
        }
    )
}
/**
 * @description: 为所有请求添加token字段
 * @param {AxiosInstance} instance
 * @return {*}
 */
function setToken(instance: AxiosInstance): void {
    instance.defaults.headers.common.authtoken =
        window.localStorage.getItem('token') || ''
}
export class Interceptors {
    instance: AxiosInstance
    constructor(props, type = 'form') {
        this.instance = axios.create({
            baseURL:
                process.env.NODE_ENV === 'production'
                    ? `https://member.tal.com${props}`
                    : `https://test-member.tal.com${props}`,
            timeout: 10000
        })
        setToken(this.instance)
        this.init(type)
    }

    init(type) {
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // config.headers.common.authtoken = window.localStorage.getItem('token')
                axios.defaults.headers.post['Content-Type'] =
                    'application/x-www-form-urlencoded'
                // config.headers.common.authtoken = window.localStorage.getItem('token')
                if (config.method === 'get') {
                    config.paramsSerializer = (params) => {
                        return qs.stringify(params)
                    }
                }
                if (type === 'form') {
                    if (config.method === 'post') {
                        config.paramsSerializer = (params) => {
                            return qs.stringify(params)
                        }
                        const fd = new FormData()
                        for (const key in config.data) {
                            if (config.data[key] !== undefined) {
                                fd.append(key, config.data[key])
                            }
                        }
                        config.data = fd
                    }
                }
                return config
            },
            (err) => {
                return Promise.reject(err)
            }
        )
        handleError(this.instance)
    }

    getInterceptors() {
        return this.instance
    }
}

type formData = Record<string, string | Blob>
/**
 * http请求封装
 * @class
 * @classdesc
 */
export class InterceptorBase {
    protected instance: AxiosInstance
    /**
     * @constructor
     * @param {string} url 接口组前缀
     * @param {boolean} isLocal 是否使用本地模式
     */
    constructor(url: string, isLocal?: boolean) {
        this.instance = this._init(url, isLocal)
        this._initAuthToken()
        this._initErrCallBack()
    }

    _init(url: string, isLocal?: boolean): AxiosInstance {
        return axios.create({ baseURL: this._initBaseUrl(url, isLocal) })
    }

    private _initBaseUrl(url: string, isLocal?: boolean): string {
        if (isLocal) {
            return url
        } else {
            return process.env.NODE_ENV === 'production'
                ? `https://member.tal.com${url}`
                : `https://test-member.tal.com${url}`
        }
    }

    private _initAuthToken() {
        setToken(this.instance)
    }

    private _initErrCallBack() {
        handleError(this.instance)
    }

    /**
     * @description: 发送get请求
     * @param {string} path 接口后缀
     * @param {object} params 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    get<T = any, R = AxiosResponse<T>, D = any>(
        path: string,
        params?: D,
        config?: AxiosRequestConfig<D>
    ): Promise<R> {
        const configNow = {
            ...config,
            params,
            paramsSerializer: function (params) {
                return qs.stringify(params)
            }
        }
        return this.instance.get(path, configNow)
    }

    /**
     * @description: 发送form格式的post请求
     * @param {string} path 接口后缀
     * @param {object} data 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    postForm<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig<D>
    ): Promise<R> {
        const configNow: AxiosRequestConfig = {
            ...config,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return this.instance.post(url, qs.stringify(data), configNow)
    }

    /**
     * @description: 发送json格式的post请求
     * @param {string} path 接口后缀
     * @param {object} data 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    postJson<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig<D>
    ): Promise<R> {
        const configNow: AxiosRequestConfig = {
            ...config,
            headers: { 'Content-Type': 'application/json' }
        }
        return this.instance.post(url, data, configNow)
    }

    /**
     * @description: 发送form-data格式的post请求
     * @param {string} path 接口后缀
     * @param {formData} data 请求参数
     * @param {AxiosRequestConfig} config http请求参数
     * @return {Promise}
     */
    postFile<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: formData,
        config?: AxiosRequestConfig<formData>
    ): Promise<R> {
        const fd = new FormData()
        for (const key in data) {
            fd.append(key, data[key])
        }
        const configNow: AxiosRequestConfig = {
            ...config,
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        return this.instance.post(url, fd, configNow)
    }
}
