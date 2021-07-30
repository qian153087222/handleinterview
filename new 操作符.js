// 题目描述:手写 new 操作符实现

function myNew(fn,...args){

    const obj = Object.create(fn.prototype);
    const res = fn.apply(obj,args);
    if(res && (typeof res === 'object' || typeof res === 'function')) return res;

    return obj
}
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.say = function(){
    console.log(`${this.name}的年纪是${this.age}岁`);
}
const person =  myNew(Person,'王麻子',19);

console.log(person.name)

person.say()