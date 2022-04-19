/*
 * @Author: lyudongzhou
 * @Date: 2022-04-18 11:16:39
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-18 19:04:31
 * @Description: 请填写简介
 */
const arrowFun = () => {
    console.log("hi")
};
export class Person {
    private name: string;
    constructor() {
        this.name = "lyudongzhou";

    }
    play(): void {
        console.log(`this.name${this.name}`);
        arrowFun();
    }
    stand() {
        return new Promise((resolve) => {
            setTimeout(resolve)
        });
    }
}