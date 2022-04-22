/*
 * @Author: lyudongzhou
 * @Date: 2022-04-22 11:45:29
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-22 14:10:47
 * @Description: 请填写简介
 */
import OSS from "ali-oss";
import { v4 } from "uuid"
import { AxiosResponse } from "axios"
import * as url from "url"
enum EnumRegion {
    HangZhou = "oss-cn-hangzhou",
    ShangHai = "oss-cn-shanghai",
    QingDao = "oss-cn-qingdao",
    BeiJing = "oss-cn-beijing",
    ShenZhen = "oss-cn-shenzhen",
    HongKong = "oss-cn-hongkong"
}
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
export interface AxiosSender {
    postJson: <T = backData<UploadData>, R = AxiosResponse<T>, D = any>(url: string) => Promise<R>;
}
export async function upload(e: { file: File }, axios: AxiosSender) {
    const { data } = await axios!.postJson<backData<UploadData>>("/jzx/api/upload/oss/sts/auth");
    if (data.errcode !== 0) {
        throw new Error(data.errmsg);
    }
    const client = new OSS({
        region: EnumRegion.BeiJing,
        accessKeyId: data.data.AccessKeyId,
        accessKeySecret: data.data.AccessKeySecret,
        stsToken: data.data.SecurityToken,
        bucket: data.data.Bucket,
    });
    const ossData = await client.put(`${v4()}-${e.file.name}`, e.file);
    const urlData = url.parse(ossData.url, true);
    return data.data.HttpsDomain + urlData.path;
}