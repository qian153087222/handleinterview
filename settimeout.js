// 我们能反过来使用 setinterval 模拟实现 settimeout 吗？

function settimeout(fn, time) {
    let timer = setInterval(() => {
        clearInterval(timer)
        fn();
    }, time);
    return {
        clearInterval: function () {
            clearInterval(timer)
        }
    }
}
const a = settimeout(()=>console.log(222),5000);

a.clearInterval();