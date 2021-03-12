$(function () {
    // initList()
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条 
        cate_id: '', // 文章分类的 Id 
        state: '' // 文章的发布状态 
    }
    initList()
    initCate()
    // 获取文章列表
    function initList() {

        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg('获取列表失败')
                }
                var strHtml = template('tpl_list', res)
                $('tbody').html(strHtml)
                // 获取分页
                renderPage(res.total)
            }
        })
    }

    //获取文章分类的列表
    function initCate() {
        var layer = layui.layer
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl_cate', res)
                $('#cate_id').html(htmlStr)
                // 通知 layui 重新渲染表单区域的UI结构
                form.render()

            }
        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询对象q中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选方式重新渲染页面
        initList()

    })

    // 定义渲染分页的方法
    function renderPage(total) {
        // console.log(total);
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页切换时，触发jump函数
            jump: function (obj, frist) {
                // console.log(obj.curr);//得到当前页
                // console.log(obj.limit);//得到每页显示的条数
                // 把当前的页码值赋值给q.pagenum
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!frist) {
                    initCate()
                }
            }

        })


    }



    // 删除功能的实现
    $('tbody').on('click', '.btn-delete', function () {
        // console.log(1111);
        // 询问用户是否要删除当前页
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: res => {
                    console.log(res);
                    if (res.status === 0) {
                        layer.msg('删除文章成功')
                    }
                    layer.msg('删除文章失败')
                    // 删除后重新渲染页面
                    initList()
                }
            })
            // 关闭询问框
            layer.close(index)
        })

    })






})



