/**
 * 全局配置文件
 */
export default {
  title: "edo",
  logo: "S",
  key: 'saber',//配置主键,目前用于存储
  indexTitle: '费用共享系统',
  clientId: 'xcx', // 客户端id,pd 为:saber ,若是手机端:为 app ,xcx : 小程序
  clientSecret: 'app_secret', // 客户端密钥pd 为:saber_secret  ,若是手机端:为 app_secret
  tenantMode: true, // 是否开启租户模式
  lockPage: '/lock',
  tokenTime: 3000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  },
  // 流程设计器地址
  flowDesignUrl: 'http://localhost:9999',
}
