import { AxiosResponse } from "axios";
interface UploadData {
    AccessKeyId: string;
    AccessKeySecret: string;
    Bucket: string;
    Domain: string;
    Expiration: string;
    SecurityToken: string;
    HttpsDomain: string;
}
interface backData<t> {
    errcode: number;
    errmsg: string;
    data: t;
    trace: string;
}
interface AxiosSender {
    postJson: <T = backData<UploadData>, R = AxiosResponse<T>, D = any>(url: string) => Promise<R>;
}
export declare function upload(e: {
    file: File;
}, axios: AxiosSender): Promise<string>;
export {};
