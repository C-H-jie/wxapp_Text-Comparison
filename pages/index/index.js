// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    file_name1:'请上传文件',
    file_name2:'请上传文件',

    file1_updataname:'',
    file2_updataname:'',

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

// 按钮一绑定函数
  upload_files_1(){
    var name = "请上传文件";
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      success(res) {
          name = res.tempFiles[0]["name"];
          console.log(name)
          // 设置名字
          that.setData({file_name1:name})
          
          // 将文件上传到服务器
          wx.uploadFile({
            url:"https://www.falvzhushou.cn:8001/api/upload",
            filePath:res.tempFiles[0].path,
            name:res.tempFiles[0].name,
            formData: {
              'wxapp': name
            },
            success(res){
              console.log(res.data);
              var jsonstr = res.data
              // var obj1 = eval('(' + jsonstr + ')');
              var jsonmsg = JSON.parse(jsonstr);
              console.log(jsonmsg.data)

              that.setData({
                file1_updataname:jsonmsg.data
              })
            }

          })
          // 上传结束

      }
    })
  },

  // 按钮二绑定函数
  upload_files_2(){
    var name = "请上传文件";
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      success(res) {
          name = res.tempFiles[0]["name"];
          console.log(name)
          // 设置名字
          that.setData({file_name2:name})
          
          // 将文件上传到服务器
          wx.uploadFile({
            url:"https://www.falvzhushou.cn:8001/api/upload",
            filePath:res.tempFiles[0].path,
            name:res.tempFiles[0].name,
            formData: {
              'wxapp': name
            },
            success(res){
              console.log(res.data);
              var jsonstr = res.data
              // var obj1 = eval('(' + jsonstr + ')');
              var jsonmsg = JSON.parse(jsonstr);
              console.log(jsonmsg.data)

              that.setData({
                file2_updataname:jsonmsg.data
              })
            }

          })
          // 上传结束

      }
    })
  },


  show_results(){
    var that = this;
    wx.request({
      url:"https://www.falvzhushou.cn:8001/api/diff_fuc_more",
      method:"POST",
      // 不知道为啥，好像必须得加这个header，
      header:{
        "content-type":"application/x-www-form-urlencoded",
      },
      // 填写信息
      data:{
        file1:that.data.file1_updataname,
        file2:that.data.file2_updataname
      },
      success(res){
        getApp().globalData.result_text1 = res.data.text1
        getApp().globalData.result_text2 = res.data.text2

        console.log(res.data);
        wx.navigateTo({
          url: '../result/result'
        })

      }
    })

  }


})
