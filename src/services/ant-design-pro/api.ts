// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import type {
  BaseResponse,
  UserInfo,
  LoginParams,
  LoginResult,
  SearchUsersParams,
  SearchUsersResponse,
  UpdateUserParams,
  SearchBlockedUsersParams,
  SearchBlockedUsersResponse,
  UnblockUserParams,
  BlockUserParams,
  ResetPasswordParams,
  CreateUserParams,
  SearchDefaultFriendsParams,
  SearchDefaultFriendsResponse,
  AddDefaultFriendParams,
  RemoveDefaultFriendParams,
  SearchDefaultGroupsParams,
  SearchDefaultGroupsResponse,
  AddDefaultGroupParams,
  RemoveDefaultGroupParams,
  GetIMUsersParams,
  GetIMUsersResponse,
  ForceLogoutParams,
  GetFriendListParams,
  GetFriendListResponse,
  DeleteFriendParams,
  GetUsersOnlineStatusParams,
  GetUsersOnlineStatusResponse,
  GetGroupsParams,
  GetGroupsResponse,
  GetGroupMemberListParams,
  GetGroupMemberListResponse,
  CreateGroupParams,
  SetGroupInfoParams,
  MuteGroupParams,
  DismissGroupParams,
  SearchUserMessagesParams,
  SearchUserMessagesResponse,
  RevokeMessageParams,
  SearchClientLogsParams,
  SearchClientLogsResponse,
} from './types';

/** 生成UUID */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ==================== 认证相关 ====================

/** 获取当前的用户 */
export async function currentUser(options?: { [key: string]: any }) {
  return request<BaseResponse<UserInfo>>('/account/info', {
    method: 'POST',
    data: {},
    ...(options || {}),
  });
}

/** 退出登录接口 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 */
export async function login(body: LoginParams, options?: { [key: string]: any }) {
  // 生成随机的UUID作为operationid
  const operationId = generateUUID();
  console.log('生成的 operationid:', operationId);

  return request<LoginResult>('/account/login', {
    method: 'POST',
    data: body,
    headers: {
      'operationid': operationId,
    },
    ...(options || {}),
  });
}

// ==================== 业务系统 - 用户管理 ====================

/** 搜索用户 */
export async function searchUsers(body: SearchUsersParams, options?: { [key: string]: any }) {
  return request<BaseResponse<SearchUsersResponse>>('/user/search/full', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 */
export async function updateUser(body: UpdateUserParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/user/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 搜索封禁用户 */
export async function searchBlockedUsers(body: SearchBlockedUsersParams, options?: { [key: string]: any }) {
  return request<BaseResponse<SearchBlockedUsersResponse>>('/block/search', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 解禁用户 */
export async function unblockUser(body: UnblockUserParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/block/del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 封禁用户 */
export async function blockUser(body: BlockUserParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/block/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 重置用户密码 */
export async function resetUserPassword(body: ResetPasswordParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/user/password/reset', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 创建用户 */
export async function createUser(body: CreateUserParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/user/import/json', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ==================== 业务系统 - 注册管理 ====================

/** 搜索默认好友 */
export async function searchDefaultFriends(body: SearchDefaultFriendsParams, options?: { [key: string]: any }) {
  return request<BaseResponse<SearchDefaultFriendsResponse>>('/default/user/search', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 添加默认好友 */
export async function addDefaultFriend(body: AddDefaultFriendParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/default/user/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 移除默认好友 */
export async function removeDefaultFriend(body: RemoveDefaultFriendParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/default/user/del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 搜索默认群组 */
export async function searchDefaultGroups(body: SearchDefaultGroupsParams, options?: { [key: string]: any }) {
  return request<BaseResponse<SearchDefaultGroupsResponse>>('/default/group/search', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 添加默认群组 */
export async function addDefaultGroup(body: AddDefaultGroupParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/default/group/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 移除默认群组 */
export async function removeDefaultGroup(body: RemoveDefaultGroupParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/default/group/del', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ==================== IM 系统 - 用户管理 ====================

/** 获取IM用户列表 */
export async function getIMUsers(body: GetIMUsersParams, options?: { [key: string]: any }) {
  return request<BaseResponse<GetIMUsersResponse>>('/user/get_users', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 强制用户下线 */
export async function forceUserLogout(body: ForceLogoutParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/auth/force_logout', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取用户好友列表 */
export async function getFriendList(body: GetFriendListParams, options?: { [key: string]: any }) {
  return request<BaseResponse<GetFriendListResponse>>('/friend/get_friend_list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 删除好友 */
export async function deleteFriend(body: DeleteFriendParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/friend/delete_friend', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取用户在线状态 */
export async function getUsersOnlineStatus(body: GetUsersOnlineStatusParams, options?: { [key: string]: any }) {
  return request<BaseResponse<GetUsersOnlineStatusResponse>>('/user/get_users_online_token_detail', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ==================== IM 系统 - 群组管理 ====================

/** 获取群组列表 */
export async function getGroups(body: GetGroupsParams, options?: { [key: string]: any }) {
  return request<BaseResponse<GetGroupsResponse>>('/group/get_groups', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取群组成员列表 */
export async function getGroupMemberList(body: GetGroupMemberListParams, options?: { [key: string]: any }) {
  return request<BaseResponse<GetGroupMemberListResponse>>('/group/get_group_member_list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 创建群组 */
export async function createGroup(body: CreateGroupParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/group/create_group', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 设置群组信息 */
export async function setGroupInfo(body: SetGroupInfoParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/group/set_group_info', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 全体禁言 */
export async function muteGroup(body: MuteGroupParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/group/mute_group', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 取消全体禁言 */
export async function cancelMuteGroup(body: MuteGroupParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/group/cancel_mute_group', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 解散群组 */
export async function dismissGroup(body: DismissGroupParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/group/dismiss_group', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ==================== IM 系统 - 消息管理 ====================

/** 搜索用户消息 */
export async function searchUserMessages(body: SearchUserMessagesParams, options?: { [key: string]: any }) {
  return request<BaseResponse<SearchUserMessagesResponse>>('/msg/search_msg', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 撤回消息 */
export async function revokeMessage(body: RevokeMessageParams, options?: { [key: string]: any }) {
  return request<BaseResponse<{}>>('/msg/revoke_msg', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ==================== 运维中心 - 客户端日志 ====================

/** 搜索客户端日志 */
export async function searchClientLogs(body: SearchClientLogsParams, options?: { [key: string]: any }) {
  return request<BaseResponse<SearchClientLogsResponse>>('/third/logs/search', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// ==================== 兼容性保留 ====================

/** 获取通知列表 */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 */
export async function rule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建规则 */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除规则 */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    data: options || {},
  });
}

/** 删除客户端日志 */
export async function deleteClientLogs(body: { logIDs: string[] }, options?: { [key: string]: any }) {
  return request<BaseResponse>('/third/logs/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 更新账户信息 */
export async function updateAccountInfo(body: { userID: string; nickname?: string; faceURL?: string }, options?: { [key: string]: any }) {
  return request<BaseResponse>('/account/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 */
export async function changePassword(body: { userID: string; currentPassword: string; newPassword: string }, options?: { [key: string]: any }) {
  return request<BaseResponse>('/account/change_password', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取分片上传大小 */
export async function getPartSize(body: { size: number }, options?: { [key: string]: any }) {
  return request<BaseResponse<{ size: number }>>('/object/part_size', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 初始化分片上传 */
export async function initiateMultipartUpload(body: {
  hash: string;
  size: number;
  partSize: number;
  maxParts: number;
  cause: string;
  name: string;
  contentType: string;
}, options?: { [key: string]: any }) {
  return request<BaseResponse<{
    url: string;
    upload: {
      uploadID: string;
      partSize: number;
      sign: {
        url: string;
        query: any;
        header: any;
        parts: Array<{
          partNumber: number;
          url: string;
          query: any;
          header: any;
        }>;
      };
      expireTime: number;
    };
  }>>('/object/initiate_multipart_upload', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 完成分片上传 */
export async function completeMultipartUpload(body: {
  uploadID: string;
  parts: string[];
  cause: string;
  name: string;
  contentType: string;
}, options?: { [key: string]: any }) {
  return request<BaseResponse<{ url: string }>>('/object/complete_multipart_upload', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}