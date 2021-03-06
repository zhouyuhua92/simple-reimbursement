import request from './requestFetch'
const contentType = 'application/x-www-form-urlencoded;application/json'
//用户登陆
const login = (data, success, fail ) => {
    request.postFetch(`/api/edo-user/login?account=${data.account}&password=${data.password}`, data, success, fail);
}

//获取登陆验证码
const captcha =  (data, success, fail ) => {
  request.getFetch('/api/edo-auth/oauth/captcha', data, success, fail);
} 

//获取和更新Toke
const tokenGain = (data, refresh_token, success, fail ,captcha) => {
  //更新toke
  if(refresh_token){
    data.refresh_token = refresh_token
    data.grant_type = 'refresh_token'
    data.scope = 'all'
    request.postFetch(`/api/edo-auth/oauth/token?account=${data.account}&password=${data.password}&grant_type=${data.grant_type}&refresh_token=${data.refresh_token}&scope=${data.scope}`, data, success, fail);
  }else{//获取token
    data.username = data.account,
    data.password = data.password,
    data.timestamp = new Date().getTime(),
    data.scope = 'all',
    data.type = 'account',
    data.grant_type = 'password'
    request.postFetch(`/api/edo-auth/oauth/token?account=${data.account}&password=${data.password}&grant_type=${data.grant_type}&scope=${data.scope}&timestamp=${data.timestamp}&type=${data.type}&username=${data.username}`, data, success, fail ,captcha);
  }
}
//获取用户信息
const getUserById = (data, success, fail) => {
  request.postFetch(`/api/edo-user/user/getUserById?userId=${data.userId}`, data, success, fail);
}

module.exports = {
  login,
  tokenGain,
  captcha,
  getUserById
}

