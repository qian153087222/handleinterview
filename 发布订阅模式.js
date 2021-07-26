// 题目描述:实现一个发布订阅模式拥有 on emit once off 方法

class EventEmitter {
    constructor() {
        this.events = {};
    }
    // 绑定
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback];
        } else {
            this.events[type].push(callback);
        }
    }
    //解绑
    off(type, callback) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter(item => item != callback);
    }
    //使用一次
    once(type, callback) {
        const fn = ()=> {
            callback();
            this.off(type, fn);
        }
        this.on(type, fn);
    }

    //执行
    emit(type) {
        this.events[type] && this.events[type].forEach(callback => callback());
    }

}

const events = new EventEmitter();
events.on(1, () => console.log(1));
events.on(1, () => console.log(2));
events.on(2, () => console.log('21'));

events.emit(2);
