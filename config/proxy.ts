/**
 * @name 代理配置
 * @description 配置开发环境下的API代理规则
 * @see 在生产环境代理无法生效，所以这里没有生产环境的配置
 * @doc https://umijs.org/docs/guides/proxy
 */

// 服务器地址配置
const SERVER_CONFIG = {
  // 管理后台服务 (端口 10009)
  ADMIN_SERVER: 'http://47.83.254.218:10009',
  // IM 服务 (端口 10002) 
  IM_SERVER: 'http://47.83.254.218:10002',
  // 用户服务 (端口 10008)
  USER_SERVER: 'http://47.83.254.218:10008',
};

// 通用代理配置
const createProxyConfig = (target: string) => ({
  target,
  changeOrigin: true, // 支持跨域
  secure: false, // 如果是https接口，需要配置这个参数
  logLevel: 'debug', // 开发环境显示代理日志
});

export default {
  // 开发环境代理配置
  dev: {
    // ==================== 管理后台相关接口 ====================
    // 账户管理接口
    '/account': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
      // 保持 /account 路径，不进行路径重写
    },
     // IM 用户列表接口
     '/user/get_users': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },
// 用户密码重置接口
    '/user/password': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
    },

    // 用户管理相关接口
    '/user': {
      ...createProxyConfig(SERVER_CONFIG.USER_SERVER),
      // 用户服务使用端口 10008
    },

    
    // 用户导入接口
    '/user/import': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
    },

    // 封禁用户接口
    '/block': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
    },

    // 默认好友/群组接口
    '/default': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
    },

    // ==================== IM 系统相关接口 ====================
    // 消息相关接口
    '/msg': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },

    // 群组管理接口
    '/group': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },

    // 认证相关接口
    '/auth': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },

    // 好友关系接口
    '/friend': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },

   

    // ==================== 运维中心相关接口 ====================
    // 第三方服务接口（客户端日志等）
    '/third': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },

    // ==================== 文件上传相关接口 ====================
    // 对象存储接口
    '/object': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
    },
  },

  // 测试环境代理配置
  test: {
    '/api/': {
      target: SERVER_CONFIG.ADMIN_SERVER,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // 移除 /api 前缀
    },
  },

  // 预发布环境代理配置
  pre: {
    '/api/': {
      target: SERVER_CONFIG.ADMIN_SERVER,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // 移除 /api 前缀
    },
  },
};
