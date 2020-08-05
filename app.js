//app.js

import log from './requestAPI/login' //登陆相关接口
import myApproval from './requestAPI/myApproval' //待办相关接口
import auth from './utils/auth' //存储数据
import util from './utils/util' //工具类
App({
  data: {
    valueInput:'app',
       //报销搜索栏单据类型
       orderTypeList: [
        {name: '一般费用申请', orderType: 'sqyb'},
        {name: '差旅申请', orderType: 'sqcl'},
        {name: '一般费用报销', orderType: 'bxyb'},
        {name: '一般费用快速报销', orderType: 'bxybks'},
        {name: '差旅费用报销', orderType: 'bxcl'},
        {name: '差旅费用快速报销', orderType: 'bxclks'},
        {name: '借款', orderType: 'jk'},
        {name: '还款', orderType: 'hk'},
        {name: '预付款', orderType: 'yfk'},
      ],
  },
  onLoad: function (options) {
    
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 绑定请求
  reqFetch:{
    log,
    myApproval
  },
  //存储数据
  auth,
  //工具类
  util,
  globalData: {
    userInfo: null
  }
})