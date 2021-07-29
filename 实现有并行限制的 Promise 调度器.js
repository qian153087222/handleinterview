// 题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
// 的输出顺序是：2 3 1 4

// 整个的完整执行流程：

// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4

// class Scheduler {
//     constructor(limit) {
//         this.queue = [];
//         this.max = limit;
//         this.run = 0;
//     }

//     add(time, order) {
//         const fn = () => {
//             return new Promise(resove => {
//                 setTimeout(() => {
//                     resove(order);
//                 }, time)
//             })
//         }
//         this.queue.push(fn);
//     }

//     runStart() {
//         for (let index = 0; index < this.max; index++) {
//             this.queueMan();
//         }
//     }

//     queueMan() {
//         if (!this.queue || !this.queue.length || this.run >= this.max) {
//             return;
//         }
//         this.run++;
//         this.queue.shift()().then(res => {
//             console.log(res)

//             this.run--;
//             this.queueMan();
//         })
//     }
// }

// const scheduler = new Scheduler(2);
// const addTask = (time, order) => {
//     scheduler.add(time, order);
// };
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
// scheduler.runStart();




function MyScheduler(limit) {
    this.queue = [];
    this.maxCount = limit;
    this.runCount = 0;
}

MyScheduler.prototype.add = function (time, number) {
    console.log(time, number)
    const promiseFn = () => new Promise(resove => setTimeout(() => resove(number), time));
    this.queue.push(promiseFn);
}

MyScheduler.prototype.runStart = function () {
    for (let index = 0; index < this.maxCount.length; index++) {
        this.runQueue();
    }
}

MyScheduler.prototype.runQueue = function () {
    if (!this.queue || !this.queue.length || this.runCount >= this.maxCount) return;
    const first = this.queue.shift()();
    this.runCount++;
    first.then(res => {
        console.log(res);
        this.runCount--;
        this.runQueue();
    })
}

const myScheduler = new MyScheduler(2);

const addTask = (...args) => myScheduler.add(...args);

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

