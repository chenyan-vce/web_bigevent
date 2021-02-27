$(function () {
    //登录和注册页面的切换
    $('#goreg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('#goLogin').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    // 登录表单的验证,自定义校验
    var form = layui.form
    var layer = layui.layer
    // console.log(form);
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 比较两次密码的值是否一致
            var pwd = $('.reg-box #pwd').val();
            if (pwd !== value) {
                return '两次密码输入不一致，请重新输入'
            }
            // console.log('注册成功');
        }
    }),

        // 监听注册表单的提交事件
        $('#form_reg').on('submit', function (e) {
            e.preventDefault()
            var data = {
                username: $('.reg-box #username').val(),
                password: $('.reg-box #pwd').val()
            }
            $.post('/api/reguser', data, function (res) {
                // console.log(data);
                //请求失败
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.message('您已注册成功！请登录')
                // 跳转登录页面
                $('#goLogin').click()
            })
        }),
        // 监听登录表单的提交事件
        $('#form_login').submit(function (e) {
            e.preventDefault()
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data:{
                    username:$('.login-box #username').val(),
                    password:$('.login-box #pwd').val()
                },
                success: function (res) {
                    console.log(res);

                    if (res.status !== 0) {
                        return layer.msg('登录失败！')
                    }
                    layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    location.href = '/index.html'
                }
            })
        })
})