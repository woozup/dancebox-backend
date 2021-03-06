import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/admin/activity',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/api/admin/activitys',
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: `/api/admin/activity?id=${id}`,
    method: 'get'
  })
}
export function putStatus({ status, id }) {
  return request({
    url: '/api/admin/activity',
    method: 'put',
    data: {
      status,
      id
    }
  })
}

export function createPersonal({ name, type, img }) {
  return request({
    url: '/api/admin/personal',
    method: 'post',
    data: {
      name,
      type,
      img
    }
  })
}
export function getPersonal() {
  return request({
    url: '/api/admin/personal',
    method: 'get'
  })
}

export function createGame(data) {
  return request({
    url: '/api/admin/game',
    method: 'post',
    data
  })
}
