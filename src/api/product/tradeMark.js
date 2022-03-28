import request from '@/utils/request'

// 获取品牌列表接口
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({
   url: `/admin/product/baseTrademark/${page}/${limit}`, 
   method: 'get' 
  });

// 处理添加品牌的操作
// POST /admin/product/baseTrademark/save  携带两个参数 tmName logoUrl
// 修改品牌的操作
// PUT /admin/product/baseTrademark/update 携带三个参数 id tmName logoUrl
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if(tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data:  tradeMark
    })
  }else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }
}
// 删除品牌的请求
//DELETE /admin/product/baseTrademark/remove/{id} 
export const reqDeleteTradeMark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete'
})