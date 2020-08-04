import publicConfig from '../utils/pubilc.js'
import auth from '../utils/auth.js'

/*
 * 请求头公用配置
*/
const contentType =  'application/json;charset=UTF-8'
const header = {
  'Content-Type' : contentType,
  'Authorization' : 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
}
/*
 * 超时时间配置
*/
const timeout = 600000
/*



 * 通用POST请求封装
 * @param url {String} 相对地址
 * @param data {Array} 请求数据
 * @param success {Function} 成功后的回调
 * @param fail {Function} 失败后的回调
 * @param captcha {object} 登陆页面输入验证码
 * @return void
 */
const postFetch = (url, data, success, fail, contentType,captcha = {}) =>{
  header['Blade-Auth'] = auth.getToken().access_token ? 'bearer ' + auth.getToken().access_token : ''
  //验证码
  if(captcha.key){
    header['Captcha-Key'] =  captcha.key
    header['Captcha-Code'] =  captcha.code
  }
  wx.request({
    url: publicConfig.baseUrl + url,
    method: 'POST',
    data: data,
    header: header,
    timeout: timeout,
    success: function (res) {
      if(res.data.code ===  401 ){
        wx.clearStorageSync()
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
      // if (res.data.errorCode == -1006) {
      //   wx.reLaunch({
      //     url: '/pages/login/login',
      //   })
      //   return;
      // } if (res.data.errorCode == -1001) {
      //   wx.reLaunch({
      //     url: '/pages/banned/banned',
      //   })
      //   return;
      // }
    
      if (success) {
        success(res.data);
      }
    },
    fail:function (err) {
      console.log(err)
    }

  })
}
/*
 * 通用GET请求封装
 * @param url {String} 相对地址
 * @param data {Array} 请求数据
 * @param success {Function} 成功后的回调
 * @param fail {Function} 失败后的回调
 * @return void
 */
const getFetch = (url, data, success, fail) => {
  header['Blade-Auth'] = auth.getToken().access_token ? 'bearer ' + auth.getToken().access_token : ''
   wx.request({
      url:  publicConfig.baseUrl + url,
      method: 'GET',
      data: data,
      header: header,
      timeout: timeout,
      success: function (res) {
        console.log(res,'res')
      if(res.data.code ===  401 ){
        wx.clearStorageSync()
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
        // if (res.data.errorCode == -1006) {
        //   wx.reLaunch({
        //     url: '/pages/login/login',
        //   })
        //   return;
        // } if (res.data.errorCode == -1001) {
        //   wx.reLaunch({
        //     url: '/pages/banned/banned',
        //   })
        //   return;
        // }
        if (success) {
          success(res.data);
        }
      }
    })
};


module.exports = {
  postFetch,
  getFetch
}