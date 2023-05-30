//my.js
Page( {
  data: {
    userimage:"/images/tabs/my-active2.png",
    collectimg:"/images/collect.png",
    workimg:"/images/work.png",
    
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的推荐',
      isunread: false,
      id:1
    }, {
        icon: '../../images/footer-icon-03.png',
        text: '我的收藏',
        isunread: false,
        id:2
      }, ]
  },
  
  collectPage:function(){
    wx.navigateTo({
      url: 'collect/collect',
    })
  },

  workPage:function(){
    wx.navigateTo({
      url: 'work/work',
    })
  },

  
})

