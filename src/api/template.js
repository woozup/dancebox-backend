import request from '@/utils/request'

export function getAllTemplate() {
  return request({
    url: '/api/grade/template',
    method: 'get'
  })
}

export function deleteTemplate(id) {
  return request({
    url: `/api/grade/${id}`,
    method: 'delete'
  })
}

// export function update(id, referee) {
//   return request({
//     url: `/api/grade/${id}`,
//     method: 'put',
//     data: referee
//   })
// }

export function create(grade) {
  return request({
    url: `/api/grade/template`,
    method: 'post',
    data: grade
  })
}

export function getTemplateDetail(id) {
  return request({
    url: `/api/grade/${id}`,
    method: 'get'
  })
}

