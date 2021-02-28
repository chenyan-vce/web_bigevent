$(function () {
    // alert('111')
    // 表单的检验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // \S代表非空白的任意字符
        // \s代表有空白的任意字符
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newpwd: function (value) {
            if ($('#pwd').val() === value) {
                return '新旧密码不能相同'

            }
        },
        renewpwd: function (value) {
            if ($('#newpwd').val() !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 绑定提交事件,发起重置密码请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')

                }
                layer.msg('更新密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})