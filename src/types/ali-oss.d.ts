/*
 * @Author: lyudongzhou
 * @Date: 2022-04-15 11:50:30
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-18 10:55:51
 * @Description: 请填写简介
 */
interface anyTypeObject<t> {
  [propName: string]: t;
}
declare module "ali-oss" {
  export enum EnumRegion {
    HangZhou = "oss-cn-hangzhou",
    ShangHai = "oss-cn-shanghai",
    QingDao = "oss-cn-qingdao",
    BeiJing = "oss-cn-beijing",
    ShenZhen = "oss-cn-shenzhen",
    HongKong = "oss-cn-hongkong"
  }
  interface OSSConfig {
    region?: EnumRegion;
    accessKeyId: string;
    accessKeySecret: string;
    stsToken?: string;
    bucket?: string;
    secure?: boolean;
  }
  interface Options {
    timeout?: number;
    mime?: string;
    meta?: anyTypeObject<string | undefined>;
    callback?: {
      url: string;
      host?: string;
      body: string;
      contentType?: string;
      customValue?: anyTypeObject<string | undefined>;
    };
    headers?: {
      "Cache-Control"?: string;
      Authorization?: string;
      [propName: string]: string | undefined;
    };
  }
  interface putReturnValue {
    name: string;
    data: any;
    res: {
      status: number;
      headers: any;
      size: number;
      rt: number;
    };
  }
  export class OSS {
    constructor(config: OSSConfig);
    put(
      filePath: string,
      data: Blob,
      options?: Options
    ): Promise<putReturnValue>;
  }
}
