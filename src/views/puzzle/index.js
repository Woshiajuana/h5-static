
import Toast                        from 'utils/toast.util'
import Router                       from 'utils/router.util'
import Store                        from 'utils/store.util'
import './puzzle'

// 控制器
const Controller = {
    init () {
        // start 方法的参数会覆盖初始化的参数
        // $el.puzzle(options).start(options)
        // puzzle 方法只需调用一次返回 puzzle 实例对象，后续可以用这个对象取初始话参数 let puzzle = $('.app').puzzle(options); puzzle.start(options);
        let level = 2;
        $('.app').puzzle({
            xAxis: level,
            yAxis: level,
            url: 'https://img1.mukewang.com/szimg/5d1032ab08719e0906000338.jpg',
            successCallback: (puzzle) => setTimeout(() => Toast.confirm('再玩一局难的？').then(() => puzzle.start({ xAxis: ++level, yAxis: level })), 300),
        }).start();

    }
};
Controller.init();

