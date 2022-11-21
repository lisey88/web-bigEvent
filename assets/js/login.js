$(function () {
  // 点击去注册账号 的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录 的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 如何给表单进行自定义校验规则
  // 1.从layui中获取from对象
  // 只要导入了layui的js，就有了layui这个构造函数
  var form = layui.form
  var layer = layui.layer
  // form.val('formTest', {
  //   username: 'llll'
  // })
  // 2.通过 form.verify() 函数自定义校验规则
  form.verify({
    // 2.1 自定义了一个校验密码的规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 2.2 自定义一个校验 两次密码是否一致 的规则
    repwd: function (value) {
      // 通过形参拿到的是 再次输入密码框中的内容
      // 还需要拿到密码框中的内容
      // 再进行判断，如果失败，则return一个提示消息
      let pwd = $('.reg-box [name=password]').val()
      // console.log(pwd)
      // console.log(value)
      if (pwd != value) {
        return '前后两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1.阻止默认提交行为
    e.preventDefault()
    // 2. 发起ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('恭喜你，注册成功！请登录')
      // 模拟 去登录 按钮的点击行为
      $('#link_login').click()
    })
  })

  //监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    //1.阻止表单的默认提交行为
    e.preventDefault()
    // 2.发起ajax请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('用户名或密码错误，登录失败')
        }
        layer.msg('登录成功!')
        // console.log(res.token)
        //将登录成功得到的 token 字符串，存到localStorage
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
