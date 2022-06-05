import { request } from '@@/plugin-request/request';
/** 列表查询 */
export async function listClient(options?: { [key: string]: any }) {
  return request<oauth2Server.ResponseResult>('/api/oauth2/registeredClient/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取详情 */
export async function getClient(id: any) {
  return request<any>('/oauth2/registeredClient/' + id, {
    method: 'GET',
  });
}

/** 新增 */
export async function addClient(data: oauth2Server.Oauth2RegisteredClient) {
  return request<oauth2Server.Oauth2RegisteredClient>('/api/oauth2/registeredClient', {
    method: 'POST',
    data: data,
  });
}

/** 更新 */
export async function updateClient(data: oauth2Server.Oauth2RegisteredClient) {
  return request<oauth2Server.Oauth2RegisteredClient>('/api/oauth2/registeredClient', {
    method: 'PUT',
    data: data,
  });
}

/** 删除 */
export async function removeClient(id: any) {
  return request<oauth2Server.Oauth2RegisteredClient>('/oauth2/registeredClient/' + id, {
    method: 'DELETE',
  });
}
