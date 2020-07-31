import website from './website'
import Base64  from './base64'
//存储token对象
function setToken (tokenValue) {
  return wx.setStorageSync('token', tokenValue);
}
//获取token对象
function getToken () {
  return wx.getStorageSync('token')
}
//存储过期时间
function setEndTokenTime (tokenValue){
  return wx.setStorageSync('endTokenTime', tokenValue);
}
//获取过期时间
function getEndTokenTime (){
  return wx.getStorageSync('endTokenTime')
}
//存储用户个资料对象
function setUser (tokenValue) {
  return wx.setStorageSync('userMsg', tokenValue);
}
//获取用户个资料对象
function getUser () {
  return wx.getStorageSync('userMsg');
}
//请求头参公共数
function getAuthorization () {
  return `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`
}
module.exports = {
  setToken,
  getToken,
  setEndTokenTime,
  getEndTokenTime,
  setUser,
  getUser,
  getAuthorization
}