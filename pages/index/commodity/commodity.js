// pages/shop/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityData:{
      comImageSrc: '/images/shop1.png',
      comPrice:'45',
      comShop:'京东',
      comWriter:'用户123',
      comName:'梵花不语，可爱手机包韩版学生单肩斜挎手机包',
      comDesc:'京*商城网页或京*特价版下单，此款商品白前活动售价55元，使用会员满减优惠券到手45元包邮（近期好价）',
    },
    
    imageCollect: '/images/tabs/collect.png',
    imageComment: '/images/tabs/message.png',
    imagework:'/images/writer.png',

    disabled: false,   //按钮是否禁用
    
      
    isRadio:'70%',
    notRadio:'30%',
    

    iscollect: false,

    // 评论区
    comments: ['很nice','非常值得买'], // 评论列表
    inputValue: '', // 输入框的值
  },

  changeText: function() {
    this.setData({
      text: "Hello, China!"
    })
  },

  onCollectTap: function() {
    this.iscollect=!this.iscollect;
    if(this.iscollect){
      this.setData({
        imageCollect: '/images/tabs/collect_active.png',
        iscollect: true,
      })
    }
    else{
      this.setData({
        imageCollect: '/images/tabs/collect.png',
        iscollect: false,
      })
    }

    //发送请求
    var iscollect=this.iscollect;
    const comImageSrc=this.data.commodityData.comImageSrc;
    const collect_uesr_id=2023001;
    var now = new Date();
    const time=now;
    wx.request({
      url: 'http://127.0.0.1:5000/collect',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        iscollect: iscollect,
        comImageSrc:comImageSrc,
        collect_user_id:collect_uesr_id,
        collect_time:time,
      },
      success: function(res) {
        console.log(res.data)
      }
    })    


  },

  

  
  
  disableButtons: function(e) {
    // 获取按钮元素和索引
    const comImageSrc=this.data.commodityData.comImageSrc;
    const value_user_id=2023001;
    const index = e.currentTarget.dataset.index;

    var that = this; // 保存当前函数的作用域
    
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:5000/value',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        comImageSrc:comImageSrc,
        value_user_id:value_user_id,
        index: 2-index,
      },
      success: function(res) {
        console.log(res.data)
        // 处理返回结果，并将数据填充到页面中
        var ispercentage = res.data.ispercentage; // 获取返回的 JSON 数据中的 data 列表
        var nopercentage = res.data.nopercentage;
        that.setData({
          disabled: true,
          isRadio: ispercentage,// 更新前端页面中的商品列表
          notRadio: nopercentage,
        });
      }
    })
  },



  onInput: function(e) {
    // 监听输入框的输入事件
    this.setData({
      inputValue: e.detail.value,
    });
  },

  //处理评论输入
  onSubmit: function() {
    // 监听提交按钮的点击事件
    const newComment = this.data.inputValue;
    if (newComment.trim() === '') {
      return;
    }
   
    const comImageSrc=this.data.commodityData.comImageSrc;
    //传送新增数据到数据库
    const comment_user_id=2023001;
    const comments = this.data.comments;   //
    var now = new Date();
    const time=now;
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:5000/comment',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        comImageSrc:comImageSrc,
        comment_user_id:comment_user_id,
        newComment: newComment,
        time:time,

      },
      success: function(res) {
        console.log(res.data)
      }
    })


    comments.push(newComment);
    this.setData({
      comments: comments,
      inputValue: '',
    });
  },
  
  onNavigateToW: function() {
    wx.redirectTo({
      //跳转链接
      url: 'http://www.baidu.com/',
    });
  },

  //页面加载
  onLoad(options) {
    // 发送数据请求
    var that = this; // 保存当前函数的作用域
    console.log(options.imgsrc) // 打印传递的id数据
    const commodity_img=options.imgsrc;
    wx.request({
      url: 'http://127.0.0.1:5000/shop',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        commodity_img: commodity_img
      },
      success(res) {
        console.log(res.data)
        // 处理返回结果，并将数据填充到页面中
        var data = res.data.data[0]; // 获取返回的 JSON 数据中的 data 列表
        var comments=res.data.comments;
        var ispercentage=res.data.percentage_data.ispercentage;
        var nopercentage=res.data.percentage_data.nopercentage;
        var iscollect=res.data.iscollect;

        if(iscollect==true){
          that.setData({
            commodityData: data ,// 更新前端页面中的商品列表
            comments:comments,
            isRadio: ispercentage,// 更新前端页面中的商品列表
            notRadio: nopercentage,
            imageCollect: '/images/tabs/collect_active.png',
          });
        }
        else{
          that.setData({
            commodityData: data ,// 更新前端页面中的商品列表
            comments:comments,
            isRadio: ispercentage,// 更新前端页面中的商品列表
            notRadio: nopercentage,
            imageCollect: '/images/tabs/collect.png'
          });
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        });
      }
    });
  }


})