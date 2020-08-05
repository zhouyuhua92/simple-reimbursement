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
    total1:0,//我的发起total
    total2:0,//已审批total
    total3:0,//待审批total
    finished1:false,//我的发起最底部
    finished2:false,//已审批最底部
    finished3:false,//待审批最底部

  },

  /**
   * 组件的方法列表
   */
  methods: {
    huanghaili(){
      this.triggerEvent("huanghaili")
    },
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
      this.initialization()//切换tabs时初始化部分数据
     
    },
    //获取列表数据
    onload(){
      wx.showLoading({
        title: '加载中',
      })
      //我的发起
      if(this.data.activeName == 'myLaunch'){
        if(this.data.finished1) return //如果是最底部不在调用接口
        this.setData({
          'formInline.current': this.data.formInline.current1
        })
      
        app.reqFetch.myApproval.searchStartPage(this.data.formInline,res =>{
          wx.hideLoading()
          if(res.code === 200){
            let data = res.data.records
            this.setData({total1:res.data.total})
            this.setData({
              myLaunchArr:[...this.data.myLaunchArr,...data]
            })
            this.setData({
              'formInline.current1': this.data.formInline.current + 1
            })
            if(this.data.myLaunchArr.length >= this.data.total1){
                this.setData({
                  finished1: true
                })
            }
          }
        },fail =>{
          wx.hideLoading()
          console.log('err:',fail)
        })
      }else 
      //已审批
      if(this.data.activeName == 'myApprovalOK'){
        if(this.data.finished2) return //如果是最底部不在调用接口
        this.setData({
          'formInline.current': this.data.formInline.current2
        })
        app.reqFetch.myApproval.searchApprovedPage(this.data.formInline,res =>{
          wx.hideLoading()
          if(res.code === 200){
            let data = res.data.records
            this.setData({total2:res.data.total})
            this.setData({
              approval:[...this.data.approval,...data]
            })
            this.setData({
              'formInline.current2': this.data.formInline.current + 1
            })
            if(this.data.approval.length >= this.data.total2){
                this.setData({
                  finished2: true
                })
            }
          
          }
        },fail =>{
          wx.hideLoading()
          console.log('err:',fail)
        })
      }else
      //待审批
       if(this.data.activeName == 'myApprovalNo'){
        if(this.data.finished3) return //如果是最底部不在调用接口
        this.setData({
          'formInline.current': this.data.formInline.current3
        })
        app.reqFetch.myApproval.searchWaitApprovePage(this.data.formInline,res =>{
          wx.hideLoading()
          if(res.code === 200){
            let data = res.data.records
            this.setData({total3:res.data.total})
            this.setData({
              pendingApproval:[...this.data.pendingApproval,...data]
            })
            this.setData({
              'formInline.current3': this.data.formInline.current + 1
            })
            if(this.data.pendingApproval.length >= this.data.total3){
                this.setData({
                  finished3: true
                })
            }
          }
        },fail =>{
          wx.hideLoading()
          console.log('err:',fail)
        })
      }else{
        wx.hideLoading()
      }
      this.triggerEvent("onload")
    },
    //搜索
    searchList(e){
      let p = e ? e.detail.params.detail.params : ''
      console.log(p)
      if(p || p === ""){
        this.formatter(p) //参数处理
        if(this.data.activeName == 'myLaunch'){
          this.setData({
            myLaunchArr:[],
            finished1:false,
            total1:0,
            'formInline.current1': 1,
          },()=>{
            this.onload()
          })
        }
        if(this.data.activeName == 'myApprovalOK'){
          this.setData({
            approval:[],
            finished2:false,
            total2:0,
            'formInline.current2': 1,
          },()=>{
            this.onload()
          })
        }
        if(this.data.activeName == 'myApprovalNo'){
          this.setData({
            pendingApproval:[],
            finished3:false,
            total3:0,
            'formInline.current3': 1,
          },()=>{
            this.onload()
          })
        }
        
       
      }
    },
    //参数处理
    formatter(p){
      this.setData({
        'formInline.orderType' :  p.orderType,
        'formInline.orderTypeName' :  p.orderTypeName,
        'formInline.orderCode' :  p.orderCode,
        'formInline.applyName' :  p.applyName,
        'formInline.costOrgName' :  p.costOrgName,
        'formInline.enterpriseName' :  p.enterpriseName,
        'formInline.projectName' :  p.projectName,
        'formInline.queryTimeStart' :  p.queryTimeStart,
        'formInline.queryTimeEnd' :  p.queryTimeEnd,
      },()=>{
        console.log(this.data.formInline)
      })
    },
    //初始化
    initialization(){
      this.setData({
        myLaunchArr:[],
        pendingApproval:[],
        approval:[],
        finished1:false,
        finished2:false,
        finished3:false,
        total1:0,
        total2:0,
        total3:0,
        'formInline.current1': 1,
        'formInline.current2': 1,
        'formInline.current3': 1,
      },()=>{
        //this.onload()
        //调用子组件方法
         this.selectComponent('.Approvallist').cancalApproval()
      })
    },
  }
})
