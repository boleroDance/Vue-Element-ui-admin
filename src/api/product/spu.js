import request from '@/utils/request'

// GET /admin/product/{page}/{limit} 三个参数 page limit category3id
// 获取spu列表数据
export const reqSpuList = (page, limit, category3Id) => request({
  url:`/admin/product/${page}/${limit}`,
  params: {category3Id},
  method: 'GET'
})