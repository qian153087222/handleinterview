// 题目描述:实现一个方法使多维数组变成一维数组

// 递归
function delayering(arr) {
    if (!Array.isArray(arr)) return arr;
    let result = [];

    for (let index = 0; index < arr.length; index++) {
        result = Array.isArray(arr[index]) ? [...result, ...delayering(arr[index])] : [...result, arr[index]];
    }

    return result;
}

const arr = [1, 1, [2, 3, [9, 11, [23, [22]]]], [5, 6, 7], 8];

//reduce 最常见的递归版本如下：
function delayeringReduce(arr) {
    if (!Array.isArray(arr)) return arr;
    return arr.reduce((f, s) => Array.isArray(s) ? [...f, ...delayeringReduce(s)] : [...f, s], []);
}

//能用迭代的思路去实现吗 ES6扩展运算符... concat可以展开然后添加到数组 减少一维 然后继续 循环 直到没有为止
function delayeringIteration(arr) {
    if (!Array.isArray(arr)) return arr;
    while (arr.some((item) => Array.isArray(item))) {
        console.log(arr)
        arr = [].concat(...arr);
    }
    return arr;

}


//字符串处理方法
function delayeringToString(arr){
    return arr.toString().split(',').map(item=>+item);
}


//新方法flat 
const iii = arr.flat(Infinity)
console.log(delayeringIteration(arr));