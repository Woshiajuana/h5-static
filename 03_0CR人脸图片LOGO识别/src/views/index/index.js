
import './index.scss'
import 'src/utils/es6-promise.util'
import Http                         from 'src/utils/http.util'
import Image                        from 'src/utils/image.util'
import Toast                        from 'src/utils/toast.util'


$(() => {

    $('.upload-button > input').on('change', function (event) {
        let imgFile = event.target.files[0];
        event.target.value = '';
        if (!imgFile) return null;
        //后缀选取
        if (!/\/(?:jpeg|jpg|png)/i.test(imgFile.type)) {
            return Toast.msg('图片格式不支持');
        }
        if (imgFile.size >= 1024 * 1024 * 10) {
            return Toast.msg('图片格式过大');
        }
        Toast.show();
        $('.result dd').text('').css('color', '#000');
        Image.toBase64(imgFile).then(base64 => {
            return Image.compressQuality(base64, { width: 1024 });
        }).then(({ base64 }) => {
            $('.upload-button > img').attr('src', base64).show();
            return Promise.all([
                Http(Http.API.DO_OCR_LOGO, {
                    ocr_image: base64.split(',')[1],
                }, {
                    loading: false,
                }),
                Http(Http.API.DO_OCR_FACE, {
                    ocr_image: base64.split(',')[1],
                }, {
                    loading: false,
                }),
            ]);
        }).then(res => {
            let [ logoResult, faceResult ] = res || [];
            $('.result-logo > dd').text(logoResult).css('color', '#000');
            $('.result-face > dd').text(faceResult).css('color', '#000');
            let isResult = logoResult.toString().includes('嘉实多') || logoResult.toString().toLocaleLowerCase().includes('castrol');
            if (isResult) {
                try {
                    faceResult = JSON.parse(faceResult);
                    isResult = faceResult.result && faceResult.result.face_list && faceResult.result.face_list.length > 0;
                } catch (e) {
                    isResult = false;
                }
            }
            $('.result-total > dd').text(isResult ? '通过！' : '不通过').css('color', isResult ? '#15ab1a' : 'red');
            Toast.confirm({
                content: isResult ? `<span style="color: #15ab1a;">通过!!</span>` : `<span style="color: red;">不通过</span>`,
                type: 'alert',
                sureText: '我知道了'
            });
        }).catch(err => {
            $('.result > dd').text(err).css('color', 'red');
        }).finally(() => {
            Toast.hide();
        });
    });



});
