$(function () {
    // 初始化页面
    initArtCateList()


    // 添加类别
    var layer = layui.layer
    var form = layui.form
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        // 每一个layer弹出框都会返回一个索引
        indexAdd = layer.open({
            type: 1,
            // 宽和高
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#formHtml').html()
        })
    })
    // 添加文章分类功能的实现
    $('body').on('submit', '#addform', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                // 重新渲染页面
                initArtCateList()
                layer.msg('添加成功')
                // 关闭添加框 根据弹出框的索引关闭弹出框
                layer.close(indexAdd)
            }
        })
    })

    //编辑功能的实现
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 每一个layer弹出框都会返回一个索引
        indexEdit = layer.open({
            type: 1,
            // 宽和高
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#formEdit').html()
        })

        // 获取当前数据的id号
        var id = $(this).attr('data-id')
        //发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取失败')
                }
                // 给layer弹出框自动填充当前列表的数据
                form.val('form-edit', res.data)
            }
        })
    })
    // 提交修改操作
    $('body').on('submit', '#updataform', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                // 重新渲染列表
                if (res.status !== 0) {
                    layer.msg('修改失败')
                }
                layer.msg('修改成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })

    })


    // 删除功能的实现
    $('tbody').on('click', '.btn-del', function () {
        // console.log(111);
        // 获取id
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: res => {
                // console.log(res);
                if (res.status !== 0) {
                    layer.msg('删除失败')
                }
                layer.msg('删除成功')
                // 重新渲染页面
                initArtCateList()

            }
        })
    })
})

//初始化列表
function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: res => {
            // console.log(res);
            var strHTml = template('tpl_table', res)
            $('tbody').html(strHTml)
        }
    })
}

