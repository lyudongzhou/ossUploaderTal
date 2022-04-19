/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 11:16:39
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-19 16:59:59
 * @Description: 请填写简介
 */
import { OSS, EnumRegion } from "ali-oss";
import { InterceptorBase } from "./axios"
import { v4 } from "uuid"
let axios: InterceptorBase = new InterceptorBase("/jzx/api/upload", true);
interface UploadData {
    AccessKeyId: string;
    AccessKeySecret: string;
    Bucket: string;
    Domain: string;
    Expiration: string;
    SecurityToken: string;
}
interface backData<t> {
    errcode: number;
    errmsg: string;
    data: t;
    trace: string;
}
export async function upload(e: { file: File }) {
    const { data } = await axios!.postJson<backData<UploadData>>("/oss/sts/auth");
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
    await client.put(`${v4()}-${e.file.name}`, e.file);
    return data.data.Domain;
}