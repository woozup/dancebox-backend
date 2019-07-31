import request from '@/utils/request'

export function getAllProject() {
  return request({
    url: '/api/project',
    method: 'get'
  })
}

export function deleteProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'delete'
  })
}

export function update(id, pro) {
  return request({
    url: `/api/project/${id}`,
    method: 'put',
    data: pro
  })
}

export function create(pro) {
  return request({
    url: `/api/project`,
    method: 'post',
    data: pro
  })
}

export function getProjectDetail(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'get'
  })
}

