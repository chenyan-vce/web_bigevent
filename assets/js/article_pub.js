$(function () {
    var layer = layui.layer
    var form = layui.form
    initCate()
    initEditor()



    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                // console.log(res);
                if (res.status !== 0) {
                    layer.msg('加载失败')
                }
                var htmlStr = template('tpl_list', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()

            }


        })

    }


    // 图片裁剪初始化
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 选择文件
    $('#btnChooseImage').on('click', function (e) {
        $('#coverFile').click()
    })
    // 为文件选择框添加change事件替换裁剪区的图片为上传的文件
    $('#coverFile').on('change', function (e) {
        var fileList = e.target.files
        // 如果没有选择图片
        if (fileList.length === 0) {
            return layer.msg('请选择图片')
        }
        // 拿到用户选择的图片
        var file = e.target.files[0]
        // 给文件转化为一个url地址
        var imgURL = URL.createObjectURL(file)

        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区
    })

    // 存为草稿
    var art_state = '已发布'
    $('#btnSave').on('click', function () {
        state = '草稿'
    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault()
        console.log(11111);

        // 基于form表单快速创建formData对象
        var fd = new FormData($(this)[0])
        // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', art_state);
        // 4. 将封面裁剪过后的图片，输出为一个文件对象 
        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布 
            width: 400,
            height: 280
        })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象 
                // 得到文件对象后，进行后续的操作 
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求 
                publishArticle(fd)
            })
            console.log(fd);
            

    })

    // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: res => {
                console.log(res);
                if(res.status!==0){
                    layer.msg('发布失败')
                }
                layer.msg('发布成功')
                // 发布成功后跳转回列表页面
                location.href='/article/article_list.html'
            }
        })
    }

})
