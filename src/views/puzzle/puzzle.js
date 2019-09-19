
class Puzzle {

    constructor ($el, options = {}) {
        this.$el = $el;
        this.$el.css('position', 'relative');
        this.options = Object.assign({
            xAxis: 3,
            yAxis: 3,
            url: 'https://img1.mukewang.com/szimg/5d1032ab08719e0906000338.jpg',
            successCallback: () => { console.log('成功了') },
        }, options);
        this.init();
    }

    init () {
        this.numElWidth = this.$el.width();
        this.numElHeight = this.$el.height();
        // this.numOffsetTop = this.$el.offset().top;
        // this.numOffsetLeft = this.$el.offset().left;
        this.$el.on('touchstart', this.handleTouchStart.bind(this))
            .on('touchmove', this.handleTouchMove.bind(this))
            .on('touchend', this.handleTouchEnd.bind(this));
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    }

    handleTouchStart (event) {
        let {
            pageX,
            pageY,
        } = event.touches[0];
        let {
            numWidth,
            numHeight,
            arrArrJigSaw,
        } = this;
        let x = parseInt(pageX / numWidth);
        let y = parseInt(pageY / numHeight);
        this.objCurrent = {...arrArrJigSaw[y][x]};
        this.objCurrent.orgPageX = pageX;
        this.objCurrent.orgPageY = pageY;
        this.objStartPosition = { x, y };
        this.objEndPosition = { x, y };
    }

    handleTouchMove (event) {
        let {
            pageX,
            pageY,
        } = event.touches[0];
        let {
            numWidth,
            numHeight,

        } = this;
        let {
            orgTop,
            orgLeft,
            orgPageX,
            orgPageY,
            // numOffsetTop,
            // numOffsetLeft,
        } = this.objCurrent;
        let x = parseInt(pageX / numWidth);
        let y = parseInt(pageY / numHeight);
        this.objCurrent.top = orgTop + pageY - orgPageY;
        this.objCurrent.left = orgLeft + pageX - orgPageX;
        this.objEndPosition = { x, y };
        this.render();
    }

    handleTouchEnd (event) {
        let {
            objCurrent,
            objStartPosition,
            objEndPosition,
            arrArrJigSaw,
        } = this;
        let {
            x: sX,
            y: sY,
        } = objStartPosition;
        let {
            x: eX,
            y: eY,
        } = objEndPosition;
        let objStart = arrArrJigSaw[sY][sX];
        let objEnd = arrArrJigSaw[eY][eX];
        if (objEnd) {
            objStart.urlX = objEnd.urlX;
            objStart.urlY = objEnd.urlY;
            objEnd.urlX = objCurrent.urlX;
            objEnd.urlY = objCurrent.urlY;
            this.objCurrent = objEnd;
        } else {
            this.objCurrent = objStart;
        }
        this.render(true);

        if (JSON.stringify(arrArrJigSaw) === this.strResult) {
            this.options.successCallback(this);
        }
    }

    start (options = {}) {
        this.options = Object.assign({}, this.options, options);
        let { xAxis, yAxis } = this.options;
        if (xAxis + yAxis < 4) throw '初始化错误';
        this.generate();
        this.render(true);
    }

    generate () {
        let {
            xAxis,
            yAxis,
            url,
        } = this.options;
        this.numWidth = this.numElWidth / xAxis;
        this.numHeight = this.numElHeight / yAxis;

        // 初始化二维数组
        let arrArrJigSaw = [];
        for (let x = 0; x < yAxis; x++) {
            arrArrJigSaw[x] = [];
            for (let y = 0; y < xAxis; y++) {
                arrArrJigSaw[x].push({
                    url,
                    width: this.numWidth,
                    height: this.numHeight,
                    orgTop: x * this.numHeight,
                    orgLeft: y * this.numWidth,
                    top: x * this.numHeight,
                    left: y * this.numWidth,
                    urlX: -y * this.numWidth || 0,
                    urlY: -x * this.numHeight || 0,
                    numElWidth: this.numElWidth,
                    numElHeight: this.numElHeight,
                });
            }
        }

        // 正确答案
        this.strResult = JSON.stringify(arrArrJigSaw);

        // 打乱数组图片
        let funRandom;
        (funRandom = () => {
            let arr = arrArrJigSaw.reduce((a, b) => a.concat(b));
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                let cur = { ...arr[j] };
                arr[j].urlX = arr[i].urlX;
                arr[j].urlY = arr[i].urlY;
                arr[i].urlX = cur.urlX;
                arr[i].urlY = cur.urlY;
            }
            arrArrJigSaw = [];
            let a = [];
            for (let i = 0, len = arr.length; i < len; i ++) {
                a.push(arr[i]);
                if (i % xAxis === xAxis - 1) {
                    arrArrJigSaw.push(a);
                    a = [];
                }
            }
            // 如果刚好是一整张图片就重新打乱数据
            if (this.strResult === JSON.stringify(arrArrJigSaw)) funRandom();
        }) ();

        // 初始化当前第一个
        this.objCurrent = arrArrJigSaw[0][0];
        this.arrArrJigSaw = arrArrJigSaw;
    }

    render (type) {
        let {
            arrArrJigSaw,
            objCurrent,
        } = this;
        let strHtml = '';
        let { url, width, height, top, left, urlX, urlY } = objCurrent;
        if (type) {
            arrArrJigSaw.forEach((arrJigSaw) => {
                arrJigSaw.forEach((item) => {
                    let { url, width, height, top, left, urlX, urlY } = item;
                    strHtml += `<div style="position: absolute; width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px; background: url(${url}) no-repeat ${urlX}px ${urlY}px/${this.numElWidth}px ${this.numElHeight}px"></div>`;
                })
            });
            strHtml += `<div class="cur" style="position: absolute; width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px; background: url(${url}) no-repeat ${urlX}px ${urlY}px/${this.numElWidth}px ${this.numElHeight}px"></div>`;

            this.$el.html(strHtml);

        } else {
            this.$el.find('.cur').css({ top: top + 'px', left: left + 'px' });
        }
    }

}

export default Puzzle;

$.fn.puzzle = function (options) {
    return new Puzzle(this, Object.assign({}, options));
};
