// components/myapproval/search/search.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    actionShow:false,
    timeShow:false,
    actions: app.data.orderTypeList,
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    openType:'',//日历打开的位置 开始or结束
    from:{
      orderType:'',
      orderTypeName:'',
      orderCode:'',
      applyName:'',
      costOrgName:'',
      enterpriseName:'',
      projectName:'',
      queryTimeStart: '',// 开始申请日期
      queryTimeEnd: '', // 结束申请日期
    },
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //输入框监听负值
    watchValue(e){
      let id = e.currentTarget.dataset['id']
      //调用父组件方法，并且传值
      switch(id) {
          case 'orderCode':
            this.setData({
              "from.orderCode" : e.detail.value || e.detail
             })
           break;
            case 'applyName':
            this.setData({
              'from.applyName':e.detail
             })
             this.triggerEvent('search',{params: this.data.from},{})
           break;
           case 'costOrgName':
            this.setData({
              'from.costOrgName':e.detail.value || e.detail
             })
           break;
           case 'enterpriseName':
            this.setData({
              'from.enterpriseName':e.detail.value || e.detail
             })
           break;
           case 'projectName':
            this.setData({
              'from.projectName':e.detail.value || e.detail
             })
           break;
        default:
          this.setData({
            'from.applyName':e.detail.value 
           })
           this.triggerEvent('search',{params: this.data.from},{})
      } 
    },
    //重置 取消
    cancal(){
      this.setData({
        "from.orderType":"",
        "from.orderTypeName":"",
        "from.orderCode":"",
        "from.applyName":"",
        "from.costOrgName":"",
        "from.enterpriseName":"",
        "from.projectName":"",
        "from.queryTimeStart":"",
        "from.queryTimeEnd":"",
      })
      this.onClose()
      this.triggerEvent('search',{params: this.data.from},{})
    },
     //查询
     submit(){
        this.onClose()
        this.triggerEvent('search',{params: this.data.from},{})
    },
    //搜索弹窗
    showPopup() {
      this.setData({ 
        show: true ,
      });
    },
    onClose() {
      this.setData({ show: false });
    },
   
    //申请类型
    onActionShow() {
      this.setData({ actionShow: true });
    },
    onActionClose() {
      this.setData({ actionShow: false });
    },
    onActionSelect(e) {
      let name = e.currentTarget.dataset['name']
      console.log(name)
      this.setData({ 
        'from.orderTypeName':name.name,
        'from.orderType' :name.orderType,
        actionShow: false ,
      });
    },
    //日期
    onTimeShow(e){
      this.setData({ 
        openType:e.currentTarget.dataset['id'], //负值打开的位置
        timeShow: true
       });
    },
    onTimeClose(){
      this.setData({ timeShow: false });
    },
    onTimeConfirm(e){
      let value = e.detail
      //判断打开位置后 负值
      if(this.data.openType === 'queryTimeStart'){
          this.setData({
            'from.queryTimeStart':app.util.formatDate(value)
          })
      }else if(this.data.openType === 'queryTimeEnd'){
        this.setData({
          'from.queryTimeEnd':app.util.formatDate(value)
        })
      }
      this.setData({ timeShow: false });
    },
  }

})
