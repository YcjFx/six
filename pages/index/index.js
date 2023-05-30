//index.js

Page({
  data: {
    searchValue: '',
    currentTab: 0  , // 当前菜单栏选中的选项索引
    list: [
      {
        imageSrc: '/images/shop1.png',
        title: 'Markless男士羽绒服',
        price: '192元',
        eshop: '京东',
      },
      {
        imageSrc: '/images/shop2.png',
        title: 'Baleno班尼路情侣款卫衣',
        price: '178元',
        eshop: '拼多多'
      },
      {
        imageSrc: '/images/shop3.png',
        title: 'Marden马登男士工作外套',
        price: '177元',
        eshop: '淘宝',
      }
    ],

  },
  onInputChange: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  onSearch: function() {
    // 在这里编写搜索逻辑
    console.log('搜索关键词：', this.data.searchValue)
  },

  //菜单栏响应
  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    })
  },  

  //加载图片
  imageError: function (e) {
    console.log('图片加载失败', e)
  },
  
  //主页商品数据点击响应
  shopPage:function(event){
    var index = event.currentTarget.dataset.index
    // var index = 2;
    var imgsrc=this.data.list[index].imageSrc;

    wx.navigateTo({
      url: 'commodity/commodity?imgsrc='+imgsrc,
    })
  },

  //页面加载
  onLoad() {
    // 发送数据请求
    var that = this; // 保存当前函数的作用域
    wx.request({
    url: 'http://127.0.0.1:5000/index',
      method: 'GET',
      success(res) {
        // 处理返回结果，并将数据填充到页面中
        var data = res.data.data; // 获取返回的 JSON 数据中的 data 列表
        var list = []; // 定义一个空列表
        for (var i = 0; i < data.length; i++) {
          var item = {
            imageSrc: data[i].imageSrc, // 将返回的 JSON 数据中的 img 属性赋值给 imageSrc 属性
            title: data[i].title, // 将返回的 JSON 数据中的 name 属性赋值给 title 属性
            price: data[i].price + '元', // 将返回的 JSON 数据中的 price 属性赋值给 price 属性，并添加单位
            eshop: data[i].eshop // 将返回的 JSON 数据中的 shop 属性赋值给 eshop 属性
          };
          list.push(item); // 将每个 item 添加到列表中
        }

        that.setData({
          list: list // 更新前端页面中的商品列表
        });
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