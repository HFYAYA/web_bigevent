$(function () {
  let form = layui.form
   let layer = layui.layer

  form.verify({
    ninckname: function(value) {
      if(value.length > 6 ) {
        return '昵称长度必须在1~6个字符'
      }
    }
  })
    initUserInfo()


  // 获取用户的基本信息
  function initUserInfo() {
    $.ajax({
      type:'GET',
      url:'/my/userinfo',
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // console.log(res);

        // 调用 form.val（） 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function(e) {
    // 组织表单的默认行为
    e.preventDefault()
    initUserInfo()
  })

  // 发起请求更新用户信息
  $('.layui-form').on('submit', function(e) {
    // 组织表单的默认行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      type:'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息失败！')
        // 调用父页面中的方法
        window.parent.getUserInfo()
      }
    })
  })
})