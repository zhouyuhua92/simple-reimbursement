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
    value:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(){
      console.log('onCancel')
    },
    onClick(){
      console.log('onClick')
    },
    watchValue(e){
      //调用伏组件方法，并且传值
      this.triggerEvent('search',{params: e.detail.value},{})
    },
    cancal(){
      this.setData({
        value:''
      })
      this.triggerEvent('search',{params: this.data.value},{})
      this.triggerEvent("cancal")
    }
  }
})
