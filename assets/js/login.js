$(function() {
  // 点击"去注册账号"的链接
  $('#link_reg').on('click',function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击 "去登录" 的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

//  自定义校验规则
  // 从layui中 获取 form 对象
  let form = layui.form
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容
      let pwd = $('.reg-box [name=password]').val()

      if(pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

     //监听注册表单的提交事件 
     $('#form_reg').on('submit', function(e) {
      
      // 1.阻止默认行为
      e.preventDefault()
      let data = {
        username:$('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      }

      $.post('/api/reguser', data, function(res) {
          if(res.status !== 0) {
            console.log(111);
            return layer.msg(res.message);
            
          }
          console.log(121);

          layer.msg('注册成功，请登录！');
          // 模拟人的点击行为
          $('#link_login').click()
        }
      )
     })

     let layer = layui.layer

    //  监听登录表单的提交事件
     $('#form_login').submit(function(e) {
      // 阻止默认行为
      e.preventDefault()
      $.ajax({
        type:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success: function(res) {
          if(res.status !== 0) {
            return layer.msg('登陆失败！')
          }
          layer.msg('登陆成功！')

          // 将登陆成功得到的 token 字符串， 保存到 localStorage 中
          localStorage.setItem('token', res.token)
          // 跳转的后台
          location.href = './index.html'
        }
      })
     })
})