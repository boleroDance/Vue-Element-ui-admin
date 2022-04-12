import request from '@/utils/request'

// 获取图片的接口
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'GET'
})

// 获取销售属性列表
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqspuSaleAttrList = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'GET'
})

// 获取平台属性信息
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqattrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'GET'
})

// 保存添加sku
// POST /admin/product/saveSkuInfo  参数skuInfo
// skuInfo的数据结构
// {
//   "category3Id": 0,
//   "createTime": "2022-03-30T06:13:45.322Z",
//   "id": 0,
//   "isSale": 0,
//   "price": 0,
//   "skuAttrValueList": [
//     {
//       "attrId": 0,
//       "attrName": "string",
//       "id": 0,
//       "skuId": 0,
//       "valueId": 0,
//       "valueName": "string"
//     }
//   ],
//   "skuDefaultImg": "string",
//   "skuDesc": "string",
//   "skuImageList": [
//     {
//       "id": 0,
//       "imgName": "string",
//       "imgUrl": "string",
//       "isDefault": "string",
//       "skuId": 0,
//       "spuImgId": 0
//     }
//   ],
//   "skuName": "string",
//   "skuSaleAttrValueList": [
//     {
//       "id": 0,
//       "saleAttrId": 0,
//       "saleAttrName": "string",
//       "saleAttrValueId": 0,
//       "saleAttrValueName": "string",
//       "skuId": 0,
//       "spuId": 0
//     }
//   ],
//   "spuId": 0,
//   "tmId": 0,
//   "weight": "string"
// }

// sku模块

// 获取sku列表
// GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'GET'
})

// sku上架
// GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'GET'
})

// sku下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'GET'
})

// 获取sku详情
// GET /admin/product/getSkuById/{skuId}
export const reqSkuDetail = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'GET'
})

// DELETE /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) => request({
  url: `/admin/product/deleteSku/${skuId}`,
  method: 'DELETE'
})