const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
   
    region: ['江苏省', '苏州市', '昆山市'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },


  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  gotoRecord: function(){
    wx.navigateTo({
      url: '/pages/record/record',
    })
  }
})