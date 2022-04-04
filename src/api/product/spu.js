import request from '@/utils/request'

// GET /admin/product/{page}/{limit} 三个参数 page limit category3id
// 获取spu列表数据
export const reqSpuList = (page, limit, category3Id) => request({
  url:`/admin/product/${page}/${limit}`,
  params: {category3Id},
  method: 'GET'
})


// 获取某个spu信息 
// GET /admin/product/getSpuById/{spuId}
export const reqSpuInfo = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'GET'
})

// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({
  url: '/admin/product/baseTrademark/getTrademarkList',
  method: 'GET'
})

// 获取spu图片
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'GET'
})

// 获取全部销售属性
// GET /admin/product/baseSaleAttrList
export const reqbaseSaleAttrList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'GET'
})

// 更新spu
// {
//   "category3Id": 0,
//   "description": "string",
//   "id": 0,
//   "spuImageList": [
//     {
//       "id": 0,
//       "imgName": "string",
//       "imgUrl": "string",
//       "spuId": 0
//     }
//   ],
//   "spuName": "string",
//   "spuSaleAttrList": [
//     {
//       "baseSaleAttrId": 0,
//       "id": 0,
//       "saleAttrName": "string",
//       "spuId": 0,
//       "spuSaleAttrValueList": [
//         {
//           "baseSaleAttrId": 0,
//           "id": 0,
//           "isChecked": "string",
//           "saleAttrName": "string",
//           "saleAttrValueName": "string",
//           "spuId": 0
//         }
//       ]
//     }
//   ],
//   "tmId": 0
// }

// savespu
// POST /admin/product/saveSpuInfo

// 修改spu || 添加spu 区别：携带参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) => {
  if(spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'POST',
      data: spuInfo
    })
  } else {
    return request({
      url:'/admin/product/saveSpuInfo',
      method: 'POST',
      data: spuInfo
    })
  }
}

// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'DELETE'
})

// 保存添加sku
// POST /admin/product/saveSkuInfo  参数skuInfo
export const reqSaveSkuInfo = (skuInfo) => request({
  url: '/admin/product/saveSkuInfo',
  data: skuInfo,
  method: 'POST'
})

// 获取sku列表数据
// GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'GET'
})