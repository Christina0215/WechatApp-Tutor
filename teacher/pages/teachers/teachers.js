const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    openid:'',
    teachersList:'',
    teachersList_math:[],
    teachersList_chinese:[],
    teachersList_english:[],
    teachersList_physic:[],
    teachersList_biologic:[],
    teachersList_chemistry:[],
    teachersList_history:[],
    teachersList_geography:[],
    teachersList_politic:[],
  },
  onLoad() {
    wx.cloud.init()
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.data.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    let list = [{}];
    for (let i = 0; i < 9; i++) {
      list[i] = {};
      list[i].id = i;
    }
    list[0].name = '数学';
    list[1].name = '语文';
    list[2].name = '英语';
    list[3].name = '物理';
    list[4].name = '化学';
    list[5].name = '生物';
    list[6].name = '历史';
    list[7].name = '地理';
    list[8].name = '政治';
    this.setData({
      list: list,
      listCur: list[0]
    })
    const db = wx.cloud.database()
     // 查询当前用户所有的 counters
     db.collection('Teachers').where({
       _openid: this.data.openid
     }).get({
       success: res => {
         this.setData({
           teachersList: res.data
         })
         console.log('[数据库] [查询记录] 成功: ', res)
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '查询记录失败'
         })
         console.error('[数据库] [查询记录] 失败：', err)
       }
     })
  },
  teachersSelect(){
    this.data.
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})