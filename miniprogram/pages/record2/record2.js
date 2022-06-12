// pages/Record2/record2.js
const recorderManager = wx.getRecorderManager()
const backgroundAudio = wx.getBackgroundAudioManager()
 var util = require('../../utils/util.js');
Page({

  data: {
      
       recordingTimeqwe: 0, //录⾳计时
        setInter: "", //录⾳名称
        soundUrl: "",
        basicsList: [{
          icon: 'roundcheckfill',
          name: 'Step 1'
        }, {
          icon: 'roundcheckfill',
          name: 'Step 2'
        }, {
          icon: 'radioboxfill',
          name: 'Step 3'
        }, {
          icon: 'radioboxfill',
          name: 'Step 4'
        }, ],
        basics: 2
      },
   
   //timer 不能低于1000
  recordingTimer: function() {
   var that = this;
   //将计时器赋值给setInter
        that.data.setInter = setInterval(
   function() {
   var time = that.data.recordingTimeqwe + 1;
            that.setData({
              recordingTimeqwe: time
            })
          }, 1000);
      },
   //开始录⾳
startRecord: function() {
 var that = this;

      const options = {
        duration: 30000, //指定录⾳的时长，单位 ms，最⼤为10分钟（600000），默认为1分钟（60000）
        sampleRate: 16000, //采样率
        numberOfChannels: 1, //录⾳通道数
        encodeBitRate: 96000, //编码码率
        format: 'mp3', //⾳频格式，有效值 aac/mp3
        frameSize: 50, //指定帧⼤⼩，单位 KB
      }
 //开始录⾳计时
      that.recordingTimer();
 //开始录⾳
      recorderManager.start(options);
      recorderManager.onStart(() => {
        console.log('开始录⾳')
      });
 //错误回调
      recorderManager.onError((res) => {
        console.log(res);
      })
    },


 /**
  * 提示
  */
  tip: function(msg){
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  } , 


  //结束录⾳
  stopRecord: function() {
  var that = this;
   
       recorderManager.stop();
       recorderManager.onStop((res) => {
         const that = this
         let timestamp = util.formatTime(new Date());
         console.log('停⽌录⾳', res.tempFilePath)
         const {
           tempFilePath
         } = res;
  //结束录⾳计时
         clearInterval(that.data.setInter);
         wx.cloud.uploadFile({
           cloudPath: "reading_sounds/"+timestamp + '-' + this.randomNum(10000, 99999) + '.mp3',
           filePath: tempFilePath,
  // 成功回调
           success: res => {
            that.tip("录音成功 Finished")
             console.log('上传成功', res)
             that.setData({
               soundUrl: res.fileID,
  // time: util.formatTime1(new Date())
             })
           },
            fail: function (res) {
              //录音失败
              that.tip("录音失败！Fail")
            }
         })
       })
  },




//录⾳播放
playRecord: function(eve) {
  
  // console.log(eve)
 var tempsound = eve.currentTarget.dataset.soundid
      tempsound = "https://6e65-newdj-d79af2-1257790921.tcb.qcloud.la/sounds"+this.midstr(tempsound)
 // console.log(tempsound)
    if(tempsound == ''){
      this.tip("请先录音！Invalid")
      return;
    }
      wx.playBackgroundAudio({
 //播放地址
        dataUrl: tempsound
      })
    },
 
 //⽣成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
 switch (arguments.length) {
 case 1:
 return parseInt(Math.random() * minNum + 1, 10);
 break;
 case 2:
 return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
 break;
 default:
 return 0;
 break;
      }
    },
    midstr(str) {
 var strnum = str.lastIndexOf('/')
 var ministr = str.substr(strnum)
 return ministr
    },

    gotoRecord3: function(){
      wx.navigateTo({
        url: '/pages/record3/record3',
      })
    },
 
})