const app = getApp();
Page({
  data: {
    PageCur: 'form',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker2:['数学','语文','英语','物理','化学','生物','历史','政治','地理','其他'],
    picker: ['一年级', '二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三'],
   
    multiIndex: [0, 0, 0],
    time: '12:01',
    date: '2018-12-25',
    region: ['请选择地址'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'http://ttina.ink/wp-content/uploads/2020/08/u1032369310400280733fm26gp0.jpg'
    }],
  },
  goto: function () {
    wx.navigateTo({
      url: '/pages/teachers/teachers',
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  PickerChange2(e) {
    this.setData({
      index2: e.detail.value
    })
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
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
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
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  formSubmit: function (e) {
    var picker2 = ['数学','语文','英语','物理','化学','生物','历史','政治','地理','其他'];
    var picker =  ['一年级', '二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三'];
    let { Name, Grade, Subject, Location, exLocation,Phone } = e.detail.value;
    var tsGrade = picker[Grade];
    var tsSubject = picker2[Subject];
    this.setData({
      Name, 
      tsGrade,
      tsSubject,
      Location, 
      exLocation,
      Phone
    })
    wx.cloud.init()
    const db = wx.cloud.database()
     db.collection('counters').add({
       data: {
        Name, 
        tsGrade,
        tsSubject,
        Location, 
        exLocation,
        Phone
       },
       success: res => {
         // 在返回结果中会包含新创建的记录的 _id
         this.setData({
           counterId: res._id,
           Name, 
        tsGrade,
        tsSubject,
        Location, 
        exLocation,
        Phone
         })
         wx.showToast({
           title: '提交成功',
         })
         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
       },
  })
  wx.cloud.callFunction({
    data:{
      Name, 
        tsGrade,
        tsSubject,
        Location, 
        exLocation,
        Phone
    },
    name:"mail",
    success(res) {
      console.log("succcess",res)
    },
    fail(res) {
      console.log("fail",res)
    }
  })
}
})