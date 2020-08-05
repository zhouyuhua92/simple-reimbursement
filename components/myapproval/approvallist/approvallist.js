// components/myapproval/approvalList/approvallist.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrList: { 
      type: Array, 
    },
    finished: { 
      type: Boolean, 
    },
    type:{
      type: String
    }
   
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //q多选
    checkboxChange(e){
      let id = e.currentTarget.dataset['item']
      console.log(e.detail.value)
      
    },
    search(e){
      // 自定义一个事件，并且传值
      this.triggerEvent('searchList',{params: e },{})
      
   },
   cancalApproval(){
    this.triggerEvent("cancalApproval")
    this.selectComponent('#Search').cancal()
   
   },
  },
  
 
})

