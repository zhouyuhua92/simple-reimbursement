// components/myapproval/tabs/tabs.js
 const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  created(){
    this.onload()
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    active : 2,
    activeName:'myApprovalNo',
    formInline: {
      seatchShow: false,
      current: 1,
      current1: 1,
      current2: 1,
      current3: 1,
      size: 10,
      orderType: '',  // 单据类型类型
      orderTypeName: '',  // 单据类型类型
      enterpriseName: '', //法人公司名称
      costOrgName: '',//预算占用部门
      projectName: '',//项目名称
      projectId: '',//项目名称id
      applyName: '', //申请人名称
      applyBy: '',//申请人id
      queryTimeStart: '',//// 开始申请日期
      queryTimeEnd: '', //// 结束申请日期
      queryTime: '',// 时间集合
      projectTypeName: '',
      productName: '',
      projectType: '',
      modelKey: '',//部署Key
      taskStatus: '',//("任务状态：进行中jin，完成wan")
      orderCode: '',//单据编码
      orgId: '',//组织id
      costName: '',//费用项目名称
      costOrgId: '',//预算占用部门id
      enterpriseId: '',//法人公司id
      popupShow: false,//是否显示视频弹窗
      pass: true,//审批结果
      passName: '同意',//审批结果
      comment: '',//审批意见
    },
    myLaunchArr: [],//我的发起列表集合
    pendingApproval: [],//待审批列表集合
    approval: [],//已审批列表集合
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //切换tab
    onChangeTabs(event) {
      switch(event.detail.index) {
        case 0:
           this.setData({
            activeName: 'myLaunch'
           })
           break;
        case 1:
            this.setData({
              activeName: 'myApprovalOK'
             })
           break;
        case 2:
            this.setData({
              activeName: 'myApprovalNo'
             })
           break;
        default:
          this.setData({
            activeName: ''
           })
      } 
      //切换tabs时 清空之前的数据后在请求接口
      this.setData({
        myLaunchArr:[],
        pendingApproval:[],
        approval:[],
      },()=>{
        this.onload()
      })
    },
    //获取列表数据
    onload(){
      //我的发起
      if(this.data.activeName == 'myLaunch'){
        app.reqFetch.myApproval.searchStartPage(this.data.formInline,res =>{
          if(res.code === 200){
            let data = res.data.records
            this.setData({
              myLaunchArr:data,...this.data.myLaunchArr
            })
          }
        },fail =>{
          console.log('err:',fail)
        })
      }else 
      //已审批
      if(this.data.activeName == 'myApprovalOK'){
        app.reqFetch.myApproval.searchApprovedPage(this.data.formInline,res =>{
          if(res.code === 200){
            let data = res.data.records
            this.setData({
              approval:data,...this.data.approval
            })
          }
        },fail =>{
       
          console.log('err:',fail)
        })
      }else
      //待审批
       if(this.data.activeName == 'myApprovalNo'){
        app.reqFetch.myApproval.searchWaitApprovePage(this.data.formInline,res =>{
          if(res.code === 200){
            let data = res.data.records
            this.setData({
              pendingApproval:data,...this.data.pendingApproval
            })
            console.log(this.data.pendingApproval)
          }
        },fail =>{
       
          console.log('err:',fail)
        })
      }
    },
  }
})
