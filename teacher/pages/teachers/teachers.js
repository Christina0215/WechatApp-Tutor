const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    openid:'',
    teachersList_all:[{
      id:0,
      name:'数学',
      data:[]
},{
      id:1,
      name:'语文',
      data:[]
},{
      id:2,
      name:'英语',
      data:[]
},{
      id:3,
      name:'物理',
      data:[]
},{
      id:4,
      name:'化学',
      data:[]
},{
      id:5,
      name:'生物',
      data:[]
},{
      id:6,
      name:'历史',
      data:[]
},{
      id:7,
      name:'地理',
      data:[]
},{
      id:8,
      name:'政治',
      data:[]
}],
    teachersList:'',
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
    const db = wx.cloud.database()
     // 查询当前用户所有的 counters
     db.collection('Teachers').where({
       _openid: this.data.openid
     }).get({
       success: res => {
         this.setData({
           teachersList: res.data
         })
         this.teachersSelectMath();
         this.teachersSelectBiologic();
         this.teachersSelectChemistry();
         this.teachersSelectChinese();
         this.teachersSelectEnglish();
         this.teachersSelectGeography();
         this.teachersSelectHistory();
         this.teachersSelectPolitic();
         this.teachersSelectphysic();
         this.getfile();
         console.log(this.data.teachersList_all)
         console.log('[数据库] [查询记录] 成功: ',res)
       },
       fail: err => {
         wx.showToast({
           icon: 'none',
           title: '查询记录失败'
         })
         console.error('[数据库] [查询记录] 失败：', err)
       }
     })   
     //console.log(this.data.teachersList_math);
  },
  getfile(){
    for(let i=0;i<9;i++)
    {
      for(let j=0;j<this.data.teachersList_all[i].data.length;j++)
      {
        wx.cloud.getTempFileURL({
          fileList: [this.data.teachersList_all[i].data[j].Cloudpath],
          success: res => {
            // fileList 是一个有如下结构的对象数组
            // [{
            //    fileID: 'cloud://xxx.png', // 文件 ID
            //    tempFileURL: '', // 临时文件网络链接
            //    maxAge: 120 * 60 * 1000, // 有效期
            // }]
            let temp = this.data.teachersList_all
            temp[i].data[j].Cloudpath = res.fileList[0].tempFileURL
            this.setData({
              teachersList_all:temp
            })
          },
          fail: console.error
        })
      }
    }
  },
  teachersSelectMath(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("数学")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[0].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectChinese(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("语文")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[1].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectEnglish(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("英语")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[2].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectphysic(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("物理")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[3].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectBiologic(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("生物")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[4].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectChemistry(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("化学")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[5].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectHistory(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("历史")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[6].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectGeography(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("地理")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[7].data = assest;
    this.setData({
      teachersList_all:tar
    })
  },
  teachersSelectPolitic(){
    let assest = [];
    let tar = this.data.teachersList_all;
    Object.keys(this.data.teachersList).forEach(element => {
      if(Object.values(this.data.teachersList)[element].Good_at.indexOf("政治")!=-1)
        assest.push(Object.values(this.data.teachersList)[element])  
    });
    tar[8].data = assest;
    this.setData({
      teachersList_all:tar
    })
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
    let list = this.data.teachersList_all;
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
        teachersList_all: list
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
  },
  showModal(e) {
    console.log("111")
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})