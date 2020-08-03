const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    picker: ['男','女'],
    multiArray: [
      ['数学', '语文', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
      ['数学', '语文', '英语', '物理', '化学', '生物', '历史', '地理', '政治'],
      ['数学', '语文', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
    ],
    multiIndex: [0, 1, 2],
    region: ['请选择地址'],
    imgList: [],
    textareaAValue: '',
    textareaBValue: '',
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
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
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
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      content: '确定删除？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    const Register = true;
    const Good_at = [this.data.multiArray[0][this.data.multiIndex[0]],this.data.multiArray[1][this.data.multiIndex[1]],this.data.multiArray[2][this.data.multiIndex[2]]];
    let { Name, Gender, Phone, School, Subject,QQ,Information } = e.detail.value;
    var tsGender = this.data.picker[Gender];
    this.setData({
      Name, 
      tsGender, 
      Phone, 
      School, 
      Subject,
      QQ,
      Good_at,
      Information,
    })
    wx.cloud.init()
    const db = wx.cloud.database()
     db.collection('Teachers').add({
       data: {
        Name, 
        tsGender, 
        Phone, 
        School, 
        Subject,
        QQ,
        Good_at,
        Information,
       },
       success: res => {
         // 在返回结果中会包含新创建的记录的 _id
         this.setData({
           counterId: res._id,
           Name, 
        tsGender, 
        Phone, 
        School, 
        Subject,
        QQ,
        Good_at,
        Information,
         })
         wx.showToast({
           title: '提交成功',
         })
         console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
       },
  })
  const filePath = this.data.imgList[0]
        
        // 上传图片
        const cloudPath = Name + QQ + filePath.match(/\.[^.]+?$/)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
        })
  wx.cloud.callFunction({
    data:{
      Register,
      Name, 
        tsGender, 
        Phone, 
        School, 
        Subject,
        QQ,
        Information,
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