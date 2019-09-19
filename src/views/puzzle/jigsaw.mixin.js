
// 默认参数
const DEFAULT_OPTIONS = {
    xAxis: 3,
    yAxis: 3,
    url: 'https://img1.mukewang.com/szimg/5d1032ab08719e0906000338.jpg', // 图片
};

let windowWidth = 0, windowHeight = 0, numWidth, numHeight;
//获取屏幕宽度，获取自适应单位
wx.getSystemInfo({
    success: (res) => {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
    },
});

export default {
    data: {
        arrArrJigSaw: [],
        strResult: '',
        objCurrent: {},
        objStartPosition: {},
        objEndPosition: {},
    },

    init (options = {}) {
        let {
            xAxis,
            yAxis,
            url,
        } = Object.assign({}, DEFAULT_OPTIONS, options);
        numWidth = windowWidth / xAxis;
        numHeight = windowHeight / yAxis;

        // 初始化图片
        let arrArrJigSaw = [];
        for (let x = 0; x < yAxis; x++) {
            arrArrJigSaw[x] = [];
            for (let y = 0; y < xAxis; y++) {
                arrArrJigSaw[x].push({
                    width: numWidth,
                    height: numHeight,
                    orgTop: x * numHeight,
                    orgLeft: y * numWidth,
                    top: x * numHeight,
                    left: y * numWidth,
                    urlX: -y * numWidth || 0,
                    urlY: -x * numHeight || 0,
                    url,
                    windowWidth,
                    windowHeight,
                });
            }
        }

        // 正确答案
        let strResult = JSON.stringify(arrArrJigSaw);

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
            if (strResult === JSON.stringify(arrArrJigSaw)) funRandom();
        }) ();

        // 初始化当前第一个
        let objCurrent = arrArrJigSaw[0][0];
        this.setData({ arrArrJigSaw, strResult, objCurrent });
    },

    handleTouchStart (event) {
        let {
            pageX,
            pageY,
        } = event.touches[0];
        let {
            objCurrent,
            arrArrJigSaw,
        } = this.data;
        let x = parseInt(pageX / numWidth);
        let y = parseInt(pageY / numHeight);
        objCurrent = {...arrArrJigSaw[y][x]};
        objCurrent.orgPageX = pageX;
        objCurrent.orgPageY = pageY;
        this.setData({ objCurrent, objStartPosition: { x, y }, objEndPosition: { x, y } });
    },

    handleTouchMove (event) {
        let {
            pageX,
            pageY,
        } = event.touches[0];
        let {
            objCurrent,
        } = this.data;
        let {
            orgTop,
            orgLeft,
            orgPageX,
            orgPageY,
        } = objCurrent;
        let x = parseInt(pageX / numWidth);
        let y = parseInt(pageY / numHeight);
        objCurrent.top = orgTop + pageY - orgPageY;
        objCurrent.left = orgLeft + pageX - orgPageX;
        this.setData({ objCurrent, objEndPosition: { x, y } });
    },

    handleTouchEnd () {
        let {
            objCurrent,
            objStartPosition,
            objEndPosition,
            arrArrJigSaw,
        } = this.data;
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
            objCurrent = objEnd;
        } else {
            objCurrent = objStart;
        }
        this.setData({ objCurrent, arrArrJigSaw});
        this.judgeResult();
    },

    judgeResult () {
        let {
            strResult,
            arrArrJigSaw,
        } = this.data;
        setTimeout(() => {
            if (JSON.stringify(arrArrJigSaw) === strResult) {
                wx.showToast({ title: '通关成功' });
            }
        }, 1000);
    }
}
