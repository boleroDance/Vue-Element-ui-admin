const Mock = require('mockjs')

// const data = Mock.mock({
//   'items|30': [{
//     id: '@id',
//     title: '@sentence(10, 20)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })
const data = require('./data.json')

module.exports = [
  {
    url: '/dashbord/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data
      }
    }
  }
]
