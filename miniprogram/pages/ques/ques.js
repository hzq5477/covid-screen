const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    basicsList: [{
      icon: 'radioboxfill',
      name: 'Step 1'
    }, {
      icon: 'radioboxfill',
      name: 'Step 2'
    }, {
      icon: 'radioboxfill',
      name: 'Step 3'
    }, {
      icon: 'radioboxfill',
      name: 'Step 4'
    }, ],
    basics: 0,
   
    region: ['江苏省', '苏州市', '昆山市'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',

    list: [
      {
        id: 0,
        name: "干咳 Dry cough",
        value: "DryCough"
      },
      {
        id: 1,
        name: "湿咳 Wet cough",
        value: "Wetcough"
      },
      {
        id: 2,
        name: "发烧 Fever",
        value: "Fever"
      },
      {
        id: 3,
        name: "胸闷 Tightness in your chest",
        value: "Tightness"
      }
    ]
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
  handleItemChange(e){
    
  },
  gotoRecord: function(){
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  scrollSteps() {
    this.setData({
      scroll: this.data.scroll == 1
    })
  },
  handlerSubmit:function(evt)
  {
    console.log(evt);
    //acqure form
    let smoke = evt.detail.value.smoke;
    let asthma= evt.detail.value.asthma;
    let  location = evt.detail.value.location;
    let  test = evt.detail.value.test;
    let  symptoms = evt.detail.value.symptoms;
    //database reference 
    const db = wx.cloud.database();
    //collection reference ( like tables in traditional database)
    const userCollection = db.collection("info");
     //add to database
    userCollection.add({
      data:{
        smoke:smoke,
        asthma:asthma,
        location: location,
        test : test,
        symptoms :symptoms
      }
    })
  }
})