// 题目描述:手写 call apply bind 实现

// call

Function.prototype.myCall = function (content, ...args) {
    if (!content) {
        content = Window;
    }
    const fn = Symbol();
    content[fn] = this;
    return content[fn](...args);
}

//apply

Function.prototype.myApply = function (content, args) {
    if (!content) {
        content = Window;
    }
    const fn = Symbol();

    content[fn] = this;

    return content[fn](...args);
}

//bind
new newFn('niu', 23);
Function.prototype.myBind = function (content, ...args) {
    if (!content) {
        content = Window;
    }
    const fn = Symbol();
    content[fn] = this;
    const self = this;
    const result = function (...rewArgs) {
        console.log(...rewArgs)
        // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
        // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
        // this.__proto__ === result.prototype   //this instanceof result =>true
        // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
        console.log(this instanceof self)
        if (this instanceof self) {
            console.log(this, self, '22')
            // result {}Symbol(): ƒ callFn(tool, site)__proto__: callFn ƒ callFn(tool, site) {
            //     console.log(`${this.name}的年纪是${this.age}岁,想坐${tool}去${site}`);
            // } "22"
            // 此时this指向指向result的实例  这时候不需要改变this指向
            this[fn] = self;
            this[fn](...[...args, ...rewArgs]); //这里使用es6的方法让bind支持参数合并
        } else {
            // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的content
            content[fn](...[...args, ...rewArgs]);
            delete content[fn];

        }
    }

    // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
    // 实现继承的方式: 使用Object.create
    result.prototype = Object.create(this.prototype);
    return result;
}


function callFn(tool, site) {
    console.log(`${this.name}的年纪是${this.age}岁,想坐${tool}去${site}`);
}

const obj = {
    name: 'wmz',
    age: 99
}

// callFn.myCall(obj,'车','游乐园');
// callFn.myApply(obj, ['车', '游乐园']);
const newFn = callFn.myBind(obj, '车', '游乐园');
new newFn('niu', 23);
