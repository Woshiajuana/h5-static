
import './index.scss'
import 'src/utils/es6-promise.util'
import Http                         from 'src/utils/http.util'
import Image                        from 'src/utils/image.util'
import Toast                        from 'src/utils/toast.util'


$(() => {


    $('.upload-button > input').on('change', function (event) {
        let imgFile = event.target.files[0];
        if (!imgFile) return event.target.value = '';
        //后缀选取
        if (!/\/(?:jpeg|jpg|png)/i.test(imgFile.type)) {
            event.target.value = '';
            return Toast.msg('图片格式不支持');
        }
        if (imgFile.size >= 1024 * 1024 * 10) {
            event.target.value = '';
            return Toast.msg('图片格式过大');
        }
        Toast.show();
        let index = 0;
        $('.result dd').text('').css('color', '#000');
        Image.toBase64(imgFile).then(base64 => {
            // return Image.compressQuality(base64, { width: 1024 });
        // }).then(({ base64 }) => {
            $('.upload-button > img').attr('src', base64).show();

            Http(Http.API.DO_OCR_LOGO, {
                ocr_image: base64.split(',')[1],
            }, {
                loading: false,
            }).then(res => {
                $('.result-logo > dd').text(res);
            }).catch(err => {
                $('.result-logo > dd').text(err).css('color', 'red');
            }).finally(() => {
                index++;
                if (index > 1) {
                    Toast.hide();
                }
            });

            Http(Http.API.DO_OCR_FACE, {
                ocr_image: base64.split(',')[1],
            }, {
                loading: false,
            }).then(res => {
                $('.result-face > dd').text(res);
            }).catch(err => {
                $('.result-face > dd').text(err).css('color', 'red');
            }).finally(() => {
                index++;
                if (index > 1) {
                    Toast.hide();
                }
            });
        }).toast();
    });



});
