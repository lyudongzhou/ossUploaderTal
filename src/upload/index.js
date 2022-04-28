var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
 * @Author: lyudongzhou
 * @Date: 2022-04-22 11:45:29
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-22 14:10:47
 * @Description: 请填写简介
 */
import OSS from "ali-oss";
import { v4 } from "uuid";
import * as url from "url";
var EnumRegion;
(function (EnumRegion) {
    EnumRegion["HangZhou"] = "oss-cn-hangzhou";
    EnumRegion["ShangHai"] = "oss-cn-shanghai";
    EnumRegion["QingDao"] = "oss-cn-qingdao";
    EnumRegion["BeiJing"] = "oss-cn-beijing";
    EnumRegion["ShenZhen"] = "oss-cn-shenzhen";
    EnumRegion["HongKong"] = "oss-cn-hongkong";
})(EnumRegion || (EnumRegion = {}));
export function upload(e, axios) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.postJson("/jzx/api/upload/oss/sts/auth");
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
        const ossData = yield client.put(`${v4()}-${e.file.name}`, e.file);
        const urlData = url.parse(ossData.url, true);
        return data.data.HttpsDomain + urlData.path;
    });
}
//# sourceMappingURL=index.js.map