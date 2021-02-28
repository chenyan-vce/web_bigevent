// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 为每个有权限的接口指定请求头
    if (options.url.indexOf("/my/" !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token' || '')
        }
    }
    // 为每个有权限的接口挂在comolete函数
    options.complete = res => {
        // console.log('执行了complate');
        // console.log(res);
        // res.responseJSON拿到服务器响应回来的数据
        // console.log(res.responseJSON);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1、强制清空token
            localStorage.removeItem('token')
            // 2、强制到登录页面
            location.href = '/login.html'
        }
    }
})