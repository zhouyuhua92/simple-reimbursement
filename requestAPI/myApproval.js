import request from './requestFetch'

//查询待办列表  开发人：周鑫
const searchWaitApprovePage = (data, success, fail) => {
    request.postFetch('/api/edo-desk/task/searchWaitApprovePage', data, success, fail);
}
//查询已办列表  开发人：周鑫
const searchApprovedPage = (data, success, fail) => {
  request.postFetch('/api/edo-desk/task/searchApprovedPage', data, success, fail);
}
//查询我的发起  开发人：周鑫
const searchStartPage = (data, success, fail) => {
  request.postFetch('/api/edo-desk/task/searchStartPage', data, success, fail);
}
//审批 开发人：周鑫
const completeTask = (data, success, fail) => {
  request.postFetch('/api/edo-desk/task/completeTask', data, success, fail);
}
//批量审批   开发人：周鑫
const batchCompleteTask = (data, success, fail) => {
  request.postFetch('/api/edo-desk/task/batchCompleteTask', data, success, fail);
}
module.exports = {
  searchWaitApprovePage,
  searchApprovedPage,
  searchStartPage,
  completeTask,
  batchCompleteTask
}

