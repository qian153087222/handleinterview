// settimeout 模拟实现 setinterval(带清除定时器的版本)
// 题目描述:setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗

function setInterval(fn, time) {
    let timer = null;
    function interval() {
        fn();
        timer = setTimeout(interval, time);
    }

    interval();
    return function () {
        timer && clearTimeout(timer);
    }
};

const a = setInterval(() => console.log(111), 1000);
setTimeout(()=>{
    a.clearInerTime();
},5000)