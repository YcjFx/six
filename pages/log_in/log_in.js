// pages/log_in/log_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: true,
    userInfo: {}
  },

  onAgreeChange: function () {
    this.setData({
      isAgree: true,
    });
  },

  onLogin: function () {
    //输出微信号
    // var that = this
    // wx.getUserInfo({
    //   success: function(res) {
    //     that.setData({
    //       userInfo: res.userInfo.nickName
    //     })
    //   }
    // });
    // wx.showToast({
    //   title: userInfo,
    //   icon: 'none',
    // });
    // wx.request({
    //   url: 'http://127.0.0.1:5000/wechat',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     '1': '123'
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //   }
    // })



    // 跳转页面
    if (this.data.isAgree) {
      wx.reLaunch({
        url: '/pages/index/index',
      });
    } else {
      wx.showToast({
        title: '请先同意用户协议',
        icon: 'none',
      });
    }
  },

  
  
})