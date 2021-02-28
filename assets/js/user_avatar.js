$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域 w100和w50
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)



    // 为上传按钮添加点击事件
    $('#btnuploadImg').on('click', function () {
        // console.log('点击了');
        // 模拟点击文件上传按钮
        $('#file').click()

    })

    // 为文件选择框添加change事件替换裁剪区的图片为上传的文件
    $('#file').on('change', function (e) {
        // console.log(e.target);
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg('请选择文件')
        }

        // 2更换裁剪的图片
        //2.1拿到用户上传的文件
        var file = filelist[0];
        //2.2给文件转化为一个url地址
        var imgUrl = URL.createObjectURL(file)
        //2.3重新初始化裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgUrl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 调用接口把裁剪完成的图片上传到服务器
    $('#btnupload').on('click', function () {
        // 3、将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: res => {
                if (res.status !== 0) {
                    return layui.layer.msg('上传失败')
                }
                layui.layer.msg('上传成功')
                // 重新渲染页面
                window.parent.getUserinfo()
            }
        })

    })

})