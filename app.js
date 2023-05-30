//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      // success: res => {
      //   // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
      success: function(res) {
        if (res.code) {
          // 获取用户登录凭证，发送到服务器端换取用户信息
          console.log(res.code);
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    })

    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        console.log(userInfo.nickName)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})