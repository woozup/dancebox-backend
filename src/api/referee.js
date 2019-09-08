import request from '@/utils/request'

/**
 * @desc 获取全部裁判
 * @param {Number/String} pageIndex 
 * @param {Number/String} pageSize 
 * @return {Promise}
 */
export function getAllReferee(pageIndex= 1, pageSize= 10000) {
  return request({
    url: `/api/referee?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

/**
 * @desc 创建裁判账号
 * @param {Object} referee 
 * @return {Promise}
 */
export function create(referee= {}) {
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
