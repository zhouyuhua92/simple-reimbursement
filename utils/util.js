const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//时间戳转换方法    date:时间戳数字
const formatDate = (date)=>  {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD ;
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const numbuerS = function (val, number = 2, isThousands = true ) {
  val =  parseFloat(val).toString()
  if (val) {
    let n = number,
      s = val;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    let t = "";

    for (var i = 0; i < l.length; i++) {
      if(isThousands) {
        if(l.length - 2 == i && l[l.length - 1] == '-') {
          t += l[i] + "";
        } else {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
      } else {
        t += l[i] + "";
      }
    }
    return t.split('').reverse().join('') + "." + r;
  }
  //parseFloat(row.localCurrency).toString()
  return '0.00';
}
module.exports = {
  formatTime: formatTime,
  numbuerS,
  formatDate
}
