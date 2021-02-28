$(function () {
    // console.log(111); 
    // 校验规则
    var fm = layui.form
    var layer = layui.layer
    fm.verify({
        nickname: (value) => {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })
    initUserinfo()

    // 表单重置效果
    $('#btnreset').on('click', e => {
        // console.log('重置成功');
        // 阻止默认重置行为
        e.preventDefault()
        // 重新获取表单的基本信息
        initUserinfo()
    })

    // 为表单绑定提交事件
    $('.layui-form').on('submit', function(e) {
        // console.log(this); 指向的是表单 普通函数
        // console.log(this);指向的是整个document 也就是html 箭头函数
        // 阻止表单的默认行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功！')
                // 更新成功后 重新渲染页面的信息
                window.parent.getUserinfo()
            }
        })
    })
})

// 初始化用户的基本信息
function initUserinfo() {
    var form = layui.form
    var layer = layui.layer
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: res => {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            };
            // 快速为表单赋值
            form.val("formUserInfo", res.data);
        }
    })

}

