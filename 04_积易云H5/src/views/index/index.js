
import './index.scss'

$('#button').on('click', function () {
    $.ajax({
        type: 'POST',
        url: 'http://192.168.2.133:19083/customer/register',
        dataType: 'json',//返回值类型
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        data: JSON.stringify({
            "checkCode": "123456",
            "imei": "00000000000",
            "loginNo": "13100000000",
            "loginPwd": "qq111111",
            "payPwd": "123456",
            "reqTime": "20210603100404",
            "signature": "a8737745c760e567fb2647a21680ce6f2f5611b23b52e4851040f413651bc76b",
            "traceId": "16226858444488871983"
        }),
        success (res) {
            alert('1')
            console.log(res);
        },
        error (err) {
            alert('2')
            console.log(err);
        }
    })
});
