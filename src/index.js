/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 11:16:39
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-22 14:15:54
 * @Description: 请填写简介
 */
import UploadBaodian from "./components/uploadBaodian.vue";
import { upload } from "./upload/index";
const components = [
    UploadBaodian
];
// will install the plugin only once
export const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};
export { UploadBaodian, upload };
//# sourceMappingURL=index.js.map