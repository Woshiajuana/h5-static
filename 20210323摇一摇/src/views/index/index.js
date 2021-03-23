
import './index.scss'

$(() => {
    // 监听运动传感事件，查看是否支持硬件运动
    console.log('window.DeviceMotionEvent', window.DeviceMotionEvent);
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert("您的设备不支持硬件调用");
    }

    // 变量初始化
    let x = 0,
        y = 0,
        z = 0,
        lastX = 0,
        lastY = 0,
        lastZ = 0,
        curTime = 0,
        lastTime = 0,
        diffTime = 0,
        speed = 0;

    let number = 0;

    // 设置一个阀值
    let SHAKE_THRESHOLD = 5000; // 设定摇晃的阈值为600 运行相应操作


    // 元素
    let $elSpeed = $('#speed');
    let $elNumber = $('#number');

    /*
     * 功能：测算三个方向重力加速度，达到一定值进行相应操作
     * 作者：HTML5学堂、刘国利、陈能堡
     *
     */
    function deviceMotionHandler(eventData){
        // $el.text(`speed: 1112121${speed}`);
        let acceleration = eventData.accelerationIncludingGravity;

        // 获取当前时间
        curTime = new Date().getTime();
        // 计算时间差，当这个差值大于一定值执行计算三个方向的速度
        if ((curTime - lastTime) > 100) {
            // 记录上一次的时间
            diffTime = curTime - lastTime;
            lastTime = curTime;

            // 获取当前三个方向的值
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;

            // 计算速度，为了防止出现负数，进行绝对值
            speed = Math.abs((x + y + z - lastX - lastY - lastZ) / diffTime * 8000);
            if (speed > SHAKE_THRESHOLD) {
                $elSpeed.text(`speed: ${speed}`);
                $elNumber.text(`number: ${++number}`);
            }

            // 记录上一次三个方向的值
            lastX = x;
            lastY = y;
            lastZ = z;
        }
    }
});
