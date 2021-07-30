// 深拷贝(考虑到复制 Symbol 类型)
// Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组
const first = [1,2,3,4];
const obj = {
    name:'我们在',
    age:'889'
}
// console.log(Reflect.ownKeys(first)) //[ '0', '1', '2', '3', 'length' ]
// console.log(Reflect.ownKeys(obj)) //[ 'name', 'age' ]
// WeakMap
// WeakMap结构与Map结构类似，也是用于生成键值对的集合。

// WeakMap与Map的区别有两点。

// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。

// 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

function deepClone(obj,hash = new WeakMap() ){
    if(typeof obj !== 'object' || obj === null) return obj;

    if(hash.get(obj)) return obj;

    const target = Array.isArray(obj)?[]:{};

    Reflect.ownKeys(obj).forEach(key=>{
        target[key] = deepClone(obj[key],hash);
    });

    return target;
}

function MyDeepClone(obj,hash = WeakMap()){
    if(typeof obj !== 'object' || obj === null) return obj;
    if(hash.get(obj)) return obj;
    const target = Array.isArray(obj)?[]:{};
    hash.set(obj,target);
    Reflect.ownKeys(obj).forEach(key=>{
        target[key] = MyDeepClone(obj[key]);
    });

    return target;
}

console.log(deepClone(obj));