// 题目描述:实现一个方法使多维数组变成一维数组

// 迭代+递归
function delayering(arr) {
    if(!Array.isArray(arr)) return arr;
    let result = [];
    
    for (let index = 0; index < arr.length; index++) {
        result = Array.isArray(arr[index]) ? [...result, ...delayering(arr[index])] : [...result, arr[index]];
    }

    return result;
}

const arr = [1, 1, [2, 3, [9,11,[23,[22]]]], [5, 6, 7], 8];

//reduce 最常见的递归版本如下：
function delayeringReduce(arr) {
    if(!Array.isArray(arr)) return arr;
    return arr.reduce((f,s)=>Array.isArray(s)?[...f,...delayeringReduce(s)]:[...f,s],[]);
}



console.log(delayeringReduce(arr));