// 题目描述:手写 new 操作符实现

function myNew(fn,...args){

    const obj = Object.create(fn.prototype);
    console.log(fn.call(obj,...args));
}
function Abc(){
    console.log(122);

}
Abc.prototype.say = function(){
    console.log('hello')
}

const c = {
    a:1
}
myNew(c);