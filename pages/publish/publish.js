// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShop: '淘宝',
    inputName: '', // 用户输入的商品名称
    inputUrl:'',
    inputDesc:'',
    inputPrice:'',
    user_id:2023001,
    com_id:1000001,
    is_verify:true,    //先默认为true
  },
  // 输入商品名称
  onInputName: function(event) {
    this.setData({
      inputName: event.detail.value, // 获取用户输入的数据并更新页面数据
    });
  },
  // 输入商品链接
  onInputUrl: function(event) {
    this.setData({
      inputUrl: event.detail.value, // 获取用户输入的数据并更新页面数据
    });
  },
  // 输入商品描述
  onInputDesc: function(event) {
    this.setData({
      inputDesc: event.detail.value, // 获取用户输入的数据并更新页面数据
    });
  },


  // 输入商品价格
  onInputPrice: function(event) {
    this.setData({
      inputPrice: event.detail.value, // 获取用户输入的数据并更新页面数据
    });
  },

  onInputShop: function (event) {
    this.setData({
      inputShop: event.detail.value, // 获取用户输入的数据并更新页面数据
    });
  },

  onSubmit: function() {
    const inputName = this.data.inputName;
    const inputUrl = this.data.inputUrl;
    const inputDesc = this.data.inputDesc;

    const inputPrice = this.data.inputPrice;
    const inputselect=this.data.selectedOption;
    const inputShop=this.data.inputShop;

    const user_id=this.data.user_id;
    const com_id=this.data.com_id;
    const is_verify=this.data.is_verify.toString();

    var now = new Date();
    const release_time=now;
    wx.request({
      url: 'http://127.0.0.1:5000/publish', // Flask 服务器地址
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        inputName: inputName, 
        inputUrl: inputUrl, 
        inputDesc: inputDesc, 
        inputPrice:inputPrice,
        inputselect:inputselect,
        inputShop:inputShop,

        user_id:user_id,
        com_id:com_id,
        is_verify:is_verify, 
        release_time:release_time,
      },
      success: function(res) {
        console.log(res.data); // 处理 Flask 服务器返回的响应数据
      },
      fail: function(res) {
        console.log(res.errMsg); // 处理网络请求失败的情况
      },
    });

    this.data.user_id=this.data.user_id+1;
    this.data.com_id=this.data.com_id+1;
    // 退出页面
    wx.switchTab({
      url: '/pages/index/index', // 导航栏的主页页面路径
      success: function () {
        wx.navigateBack({
          delta: 1, // 返回的页面数
        });
      },
    });
  },

  chooseImage: function() {
    var that = this;
    const com_id=this.data.com_id;

    wx.chooseMedia({
      count: 1, // 最多可选择的文件数，默认为 9
      mediaType: ['image'], // 文件类型，image 为图片，video 为视频，audio 为音频，默认为所有文件
      success: function(res) {
        // 选择成功后，将图片保存到本地并重命名为 001.jpg
        wx.saveFile({
          tempFilePath: res.tempFiles[0].tempFilePath,
          //filePath: wx.env.USER_DATA_PATH + '/001.jpg', // 保存路径为用户文//件目录下的 001.jpg 文件
          filePath: wx.env.USER_DATA_PATH + '/'+com_id.toString()+'.jpg',
          // 保存路径为用户文件
          success: function(res) {
            // 保存成功后，将图片上传到服务器
            wx.uploadFile({
              url: 'http://127.0.0.1:5000/upload',
              filePath: res.savedFilePath,
              name: 'file',
              formData: {
                'name': '001.jpg' // 设置上传文件的名称为 001.jpg
              },
              success: function(res) {
                // 上传成功后的操作
              }
            })
          }
        })
      }
    })
  },
    
  
  onNavigateBack: function () {
    wx.switchTab({
      url: '/pages/index/index', // 导航栏的主页页面路径
      success: function () {
        wx.navigateBack({
          delta: 1, // 返回的页面数
        });
      },
    });
  },

})