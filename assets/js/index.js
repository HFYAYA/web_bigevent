$(function() {
// 调用 getUserInfo 获取用户基本信息
getUserInfo()

  // 获取用户的基本信息
    function getUserInfo() {
      $.ajax({
        type:'GET',
        url:'/my/userinfo',

        // Headers 就是请求头配置对象

        Headers: {
          Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
          if(res.status !== 0) {
            return layui.layer.msg('获取用户信息失败！')
          }
          // 调用 renderAvatar 渲染用户的头像
          renderAvatar(res.data)
        },

        //  在调用有权限接口的时候，指定 complete 回调函数

    // 不论成功还是失败，最终都会调用 complete 回调函数

    // complete: function(res) {
    //   // console.log('执行了 complete 回调');
    //   // console.log(res);
    //   //
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登陆页面
    //     location.href = '/login.html'
    //   }
    // }
      })
    }

    // 渲染用户的头像
    function renderAvatar(user) {
      // 1. 获取用户的名称
      let name = user.nickname || user.username
      // 2. 设置欢迎的文本
      $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
      //  3. 按需渲染用户头像
      if(user.user_pic !== null) {
        //  3.1 渲染用户图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
      } else{
        //  3.2 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
      }
    }


    // 实现退出功能
    let layer = layui.layer

    //  点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
      //  提示用户是否确认退出
      layer.confirm('确定退出登录?', { icon: 3,title: '提示'}, function(index) {
        // console.log(index);
        //  1. 清空本地存储中的 token
        localStorage.removeItem('token')
        //  2. 重新跳转到登录页面
        location.href = '/login.html'

        // 关闭 confirm 询问框
        layer.close(index)
      })
    })


    
})