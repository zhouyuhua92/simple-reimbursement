// pages/login/login.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'', //用户名
    password:'', //密码
    key:'', //验证码key
    image:'',//验证码图片
    code:'',//输入的验证码
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取验证码 暂时隐藏
  //   app.reqFetch.log.captcha({},res =>{
  //     this.setData({
  //       key:res.key,
  //       image:res.image
  //     })
  // })
    if (app.auth.getToken() && app.auth.getUser().id) {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
   
  },

  /**
   * 提交登录内容
   */
  handleSubmit() {
   if (this.data.account === '') {
      wx.showToast({
        title: '请输入请填写用户名',
        icon: 'none'
      })
      return;
    }
    if (this.data.password === '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return;
    }
    //获取验证码 暂时隐藏
    // if (this.data.code === '') {
    //   wx.showToast({
    //     title: '请输入验证码',
    //     icon: 'none'
    //   })
    //   return;
    // }
    wx.showLoading({
      title: '正在登陆中',
    })
    let p = {
      account:this.data.account,
      password: this.data.password,
      
    }
    //获取验证码 暂时隐藏
    // let captcha = {
    //   key: this.data.key,
    //   code: this.data.code,
    // }
    app.reqFetch.log.login(p, res =>{
      console.log(res)
        this.getToken(p)
      
    }, fail =>{
      wx.hideLoading();
      console.log('err:',fail)
    })
  },
    /**
   * 获取token
   */
  getToken(p,captcha){
    app.reqFetch.log.tokenGain(p, false,res =>{
      wx.hideLoading();
      console.log(this)
      app.auth.setToken(res) //存储数据
      app.auth.setEndTokenTime(parseFloat(res.expires_in) * 1000 + new Date().getTime()) //存储数据
      this.getUserById(res.user_id)
      wx.reLaunch({
        url: '/pages/index/index',
      })
      
  }, fail =>{
      wx.hideLoading();
      console.log(fail)
    }//,captcha//获取验证码 暂时隐藏
  )
  
},

//获取用户信息
  getUserById(p){
    app.reqFetch.log.getUserById({userId:p},res =>{
      if(res.code === 200){
        app.auth.setUser(res.data)
      }
    })
  },
   /**
   * 响应用户输入
   */
  handleInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
  /**
   * 响应用户输入
   */
  handleInput2(e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 响应用户输入
   */
  handleInput3(e) {
    this.setData({
      code: e.detail.value
    })
  }
  
})