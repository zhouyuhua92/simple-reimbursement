import publicConfig from '../utils/pubilc.js'
import auth from '../utils/auth.js'

/*
 * 请求头公用配置
*/
const contentType =  'application/x-www-form-urlencoded'
const header = {
  'Content-Type' : contentType,
  'Authorization' : 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
}
/*
 * 通用POST请求封装
 * @param url {String} 相对地址
 * @param data {Array} 请求数据
 * @param success {Function} 成功后的回调
 * @param fail {Function} 失败后的回调
 * @return void
 */
const postFetch = (url, data, success, fail,captcha = {}) =>{
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
    success: function (res) {
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

      success: function (res) {
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