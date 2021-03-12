$(function () {
    // alert('11111')
    //调用用户信息的函数
    getUserinfo()

    // 退出功能的实现
    $('#btnExit').on('click', function () {
        // 提示用户是否退出
        var layer = layui.layer
        layer.confirm('确定要退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            // 退出后的回调函数
            //do something
            // 1、清空本地存储的token
            localStorage.removeItem('token')
            // 2、重新跳转到登录页
            location.href=('/login.html')
            // 关闭询问框
            layer.close(index);
        });
    })


})
// 获取用户的基本信息
function getUserinfo() {
    //发起ajax请求获取用户的基本信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: res => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // console.log(res);
            
            //渲染用户的基本信息 
            renderAvatar(res.data)
        },
    })
}
// 渲染用户的基本信息
function renderAvatar(userinfo) {
    // 渲染用户的名称
    var name = userinfo.nickname || userinfo.username
    $('#welcome').html('欢迎&nbsp,&nbsp' + name)
    // 渲染用户的头像
    if (userinfo.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', userinfo.user_pic)
            .show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // 获取用户名的第一个字
        var frist = name[0]
        $('.text-avatar').html(frist).show()
    }
}