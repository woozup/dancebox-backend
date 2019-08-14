import request from '@/utils/request'

export function getAllReferee() {
  return request({
    url: '/api/referee?pageIndex=1&pageSize=10000',
    method: 'get'
  })
}

export function deleteReferee(id) {
  return request({
    url: `/api/referee/${id}`,
    method: 'delete'
  })
}

export function update(id, referee) {
  return request({
    url: `/api/referee/${id}`,
    method: 'put',
    data: referee
  })
}

export function create(referee) {
  return request({
    url: `/api/referee`,
    method: 'post',
    data: referee
  })
}

export function getRefereeDetail(id) {
  return request({
    url: `/api/referee/${id}`,
    method: 'get'
  })
}

