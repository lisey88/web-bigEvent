$(function () {
  // 调用 getUserInfo 函数获取用户信息
  getUserInfo()

  // 点击退出按钮 实现退出功能
  var layer = layui.layer

  $('.logout').on('click', function () {
    // 弹出提示框 提示用户是否确认退出
    layer.confirm(
      '你确定要退出吗?',
      { icon: 3, title: '退出提示' },
      function (index) {
        // 1.清空本地储存中的token
        localStorage.removeItem('token')
        // 2.重新跳转到登录页面
        location.href = '/login.html'

        // 关闭 confirm 询问框，勿删！！
        layer.close(index)
      }
    )
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置对象
    // headers: {
    //   // 如果没有token的话，就给个空字符串
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用renderAvator函数渲染用户头像
      renderAvator(res.data)
    }
    // 不论成功还是失败，最终都会调用 complete回调函数
    // complete: function (res) {
    //   // console.log('执行了complete回调函数')
    //   console.log(res)
    //   // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     // 1.强制清空token
    //     localStorage.removeItem('token')
    //     // 2.强制跳转登录页
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 渲染用户头像  renderAvator函数
function renderAvator(user) {
  // 1.获取用户昵称
  let name = user.nickname || user.username
  // 2.设置用户的欢迎文本
  $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
  // 3.按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('#text-avator').hide()
  } else {
    // 3.2 渲染文字头像
    $('.layui-nav-img').hide()

    let first = name[0].toUpperCase()
    $('#text-avator').html(first).show()
  }
}
