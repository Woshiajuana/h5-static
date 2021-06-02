
export default {
    // 压缩
    compressQuality: (path, opt = {}) => new Promise((resolve, reject) =>  {
        let {
            width,
            height,
            quality,
        } = Object.assign({
            quality: 0.6,
            width: 1024,
        }, opt);
        let img = new Image();
        img.src = path;
        img.onload = function() {
            let that = this;
            // 默认按比例压缩
            let w = that.width,
                h = that.height,
                scale = w / h;
            w = width > w ? w : width;
            h = height || (w / scale);
            // 生成canvas
            let canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
            canvas.width = w;
            canvas.height = h;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(that, 0, 0, w, h);
            // 回调函数返回base64的值
            let base64 = canvas.toDataURL('image/jpeg', quality);
            resolve({base64, w, h});
        }
    }),
    // 转 base64
    toBase64: (file) => new Promise((resolve, reject) => {
        let imgRender = new FileReader();
        imgRender.readAsDataURL(file);
        imgRender.onload = function(e) {
            resolve(this.result);
        }
    }),
    // 转成File
    toFile(dataUrl, type) {
        let binaryString = window.atob(dataUrl.split(',')[1]),
            arrayBuffer = new ArrayBuffer(binaryString.length),
            intArray = new Uint8Array(arrayBuffer);
        for (let i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }
        let data = [intArray], blob;
        try {
            blob = new Blob(data);
        } catch (e) {
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (e.name === 'TypeError' && window.BlobBuilder) {
                let builder = new BlobBuilder();
                builder.append(arrayBuffer);
                blob = builder.getBlob(type);
            } else {
                throw '版本过低，不支持图片压缩上传';
            }
        }
        return blob;
    }
}
