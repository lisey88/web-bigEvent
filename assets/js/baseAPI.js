// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会吓你调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的ajax请求之前，同意拼接请求的根路径??? console.log(options.url）好像也能打印出真正的访问的地址
  // options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  // console.log(options.url)

  options.url = 'http://api-breakingnews-web.itheima.net' + options.url

  // 统一为有权限的接口，设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载 complete回调函数
  options.complete = function (res) {
    // console.log('执行了complete回调函数')
    // console.log(res)
    // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // 1.强制清空token
      localStorage.removeItem('token')
      // 2.强制跳转登录页
      location.href = '/login.html'
    }
  }
})
