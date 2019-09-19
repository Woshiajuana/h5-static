
class Puzzle {

    constructor (options = {}) {
        this.options = Object.assign({
            xAxis: 3,
            yAxis: 3,
            imageUrl: 'https://img1.mukewang.com/szimg/5d1032ab08719e0906000338.jpg',
        }, options);
        this.init();
    }

    init () {

    }

    start (options = {}) {
        this.options = Object.assign({}, options);
    }

    generate () {

    }

    render () {

    }

}

export default Puzzle;

$.fn.extend({
    puzzle (options = {}) {
        console.log(this);
        return new Puzzle(Object.assign({
            $el: $(this),
        }, options));
    }
});
