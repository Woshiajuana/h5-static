
import Toast                        from 'utils/toast.util'
import Router                       from 'utils/router.util'
import Store                        from 'utils/store.util'
import './puzzle'
import '../../assets/images/css/puzzle.jpg'

// 控制器
const Controller = {
    timer: null,
    init () {
        this.countTimer();
        this.initPuzzle();
    },
    countTimer (num = 1500) {
        if (num < 0)
            return this.lostCallback();
        let arr = num.toString().split('').reverse();
        let strHtml = `
        <span>0</span>
        <span>0</span>
        <i>:</i>
        <span>${arr[3] || 0}</span>
        <span>${arr[2] || 0}</span>
        <i>:</i>
        <span>${arr[1] || 0}</span>
        <span>${arr[0] || 0}</span>`;
        $('.timer').html(strHtml);
        this.timer = setTimeout(this.countTimer.bind(this), 50, num - 5);
    },
    initPuzzle () {
        let level = 2;
        this.puzzle = $('.main').puzzle({
            xAxis: level,
            yAxis: level,
            url: 'assets/images/puzzle.jpg',
            successCallback: this.winCallback.bind(this),
            touchStartCallback: (puzzle) => { if (puzzle.disabled) this.lostCallback(); },
        }).start();
    },
    lostCallback () {
        Toast.confirm('不服再战一局？').then(() => {
            this.countTimer();
            this.puzzle.start();
        }).catch(() => this.puzzle.stop());
    },
    winCallback () {
        clearTimeout(this.timer);
        setTimeout(() => {
            Toast.confirm('恭喜您赢了，再来一局？').then(() => {
                this.countTimer();
                this.puzzle.start();
            }).null();
        }, 300);
    },
};
Controller.init();

