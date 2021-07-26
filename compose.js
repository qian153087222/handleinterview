function a(x) {
    return x + 1;
}

function b(x) {
    return x + 2;
}

function c(x) {
    return x + 3;
}

function d(x) {
    return x + 4;
}

function e(x) {
    return x + 5;
}

//递归 从后往前走
// function compose(...fn){
//     let result;
//     return resu = (x)=>{
//         if(fn.length>0){
//             const last = fn.pop();
//             result = last(x);
//             return resu(result);
//         }
//         return result;

//     }
    
// }

//迭代 从前往后走

// function compose(...fn){
//     let result = fn[0];
//     let man = (f,g)=> (x)=>f(g(x));

//     for (let index = 1; index < fn.length; index++) {
//         result = man(result,fn[index])
//     }

//     return result; 
// }

//reduce

function compose(...fn){
    if(fn.length === 0) return fn=>fn;
    if(fn.length === 1) return fn[0]
    return fn.reduce((f,l)=>(...args)=>f(l(...args)));
}

console.log(compose(e)(1))