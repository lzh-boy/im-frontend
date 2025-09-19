# OpenIM CMS NGINX 配置使用说明

## 📋 概述

本说明介绍如何使用NGINX配置文件来部署OpenIM CMS系统的反向代理，无需使用脚本，手动操作即可。

## 📁 文件说明

- `nginx-template.conf` - NGINX配置模板文件（推荐使用）
- `nginx.conf` - 完整的NGINX配置文件
- `config/proxy.ts` - 开发环境代理配置（参考用）

## 🚀 快速部署步骤

### 步骤1：准备配置文件

选择使用模板文件或完整配置文件：

**选项A：使用模板文件（推荐）**
```bash
# 复制模板文件
cp nginx-template.conf nginx-openim.conf
```

**选项B：使用完整配置文件**
```bash
# 复制完整配置文件
cp nginx.conf nginx-openim.conf
```

### 步骤2：替换服务器IP地址

**如果使用模板文件**：
```bash
# 将 {{SERVER_IP}} 替换为实际IP地址
sed -i 's/{{SERVER_IP}}/47.239.126.22/g' nginx-openim.conf
```

**如果使用完整配置文件**：
```bash
# 将 47.239.126.22 替换为实际IP地址
sed -i 's/47.239.126.22/你的服务器IP/g' nginx-openim.conf
```

### 步骤3：部署到NGINX

```bash
# 1. 复制配置文件到NGINX目录
sudo cp nginx-openim.conf /etc/nginx/sites-available/openim-cms

# 2. 创建软链接启用站点
sudo ln -sf /etc/nginx/sites-available/openim-cms /etc/nginx/sites-enabled/

# 3. 测试配置文件语法
sudo nginx -t

# 4. 如果测试通过，重载NGINX
sudo systemctl reload nginx
```

## 🔧 配置说明

### 服务端口分配

| 服务类型 | 端口 | 接口路径 | 说明 |
|---------|------|----------|------|
| 管理后台 | 10009 | `/api/account`, `/api/user/password`, `/api/user/import`, `/api/block`, `/api/default` | 账户管理、用户管理、封禁管理等 |
| 用户服务 | 10008 | `/api/user` | 用户相关操作 |
| IM系统 | 10002 | `/api/user/get_users`, `/api/msg`, `/api/group`, `/api/auth`, `/api/friend`, `/api/third`, `/api/object` | IM功能、消息、群组、文件上传等 |

### 路径重写规则

所有 `/api/*` 路径都会被重写为 `/*`：

- `/api/account/login` → `http://服务器IP:10009/account/login`
- `/api/msg/search` → `http://服务器IP:10002/msg/search`
- `/api/user/info` → `http://服务器IP:10008/user/info`

## 🌍 不同环境配置

### 开发环境
```bash
# 使用开发服务器IP
sed -i 's/{{SERVER_IP}}/47.239.126.22/g' nginx-openim.conf
```

### 测试环境
```bash
# 使用测试服务器IP
sed -i 's/{{SERVER_IP}}/192.168.1.100/g' nginx-openim.conf
```

### 生产环境
```bash
# 使用生产服务器IP
sed -i 's/{{SERVER_IP}}/10.0.0.50/g' nginx-openim.conf
```

## 🔍 验证部署

### 1. 检查NGINX状态
```bash
sudo systemctl status nginx
```

### 2. 测试配置文件
```bash
sudo nginx -t
```

### 3. 查看NGINX日志
```bash
# 访问日志
sudo tail -f /var/log/nginx/access.log

# 错误日志
sudo tail -f /var/log/nginx/error.log
```

### 4. 测试API接口
```bash
# 测试账户接口
curl http://localhost/api/account/info

# 测试用户接口
curl http://localhost/api/user/search

# 测试消息接口
curl http://localhost/api/msg/search
```

## 🛠️ 常见问题解决

### 问题1：端口被占用
```bash
# 检查80端口是否被占用
sudo netstat -tlnp | grep :80
sudo lsof -i :80

# 如果被占用，可以修改nginx配置文件中的listen端口
```

### 问题2：权限问题
```bash
# 设置正确的文件权限
sudo chown -R www-data:www-data /usr/share/nginx/html
sudo chmod -R 755 /usr/share/nginx/html
```

### 问题3：配置文件语法错误
```bash
# 测试配置文件语法
sudo nginx -t

# 如果出错，检查配置文件中的语法
```

### 问题4：后端服务连接失败
```bash
# 检查后端服务是否运行
telnet 服务器IP 10009  # 管理后台
telnet 服务器IP 10008  # 用户服务
telnet 服务器IP 10002  # IM系统

# 检查防火墙设置
sudo ufw status
```

## 📝 自定义配置

### 修改端口
如果需要修改NGINX监听端口，编辑配置文件：
```nginx
server {
    listen 8080;  # 修改为8080端口
    # ... 其他配置
}
```

### 添加新的API路径
在配置文件中添加新的location块：
```nginx
location /api/new-service {
    proxy_pass http://new_backend;
    rewrite ^/api(.*)$ $1 break;
}
```

### 修改超时设置
```nginx
proxy_connect_timeout 120s;
proxy_send_timeout 120s;
proxy_read_timeout 120s;
```

## 🔒 HTTPS 配置

如需启用HTTPS，在配置文件中添加SSL配置：
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # ... 其他配置
}
```

## 📞 故障排除

### 检查清单
1. ✅ NGINX配置文件语法正确
2. ✅ 服务器IP地址正确
3. ✅ 后端服务正常运行
4. ✅ 防火墙设置正确
5. ✅ 文件权限正确

### 日志位置
- 访问日志：`/var/log/nginx/access.log`
- 错误日志：`/var/log/nginx/error.log`
- 站点配置：`/etc/nginx/sites-available/openim-cms`

### 重启服务
```bash
# 重启NGINX
sudo systemctl restart nginx

# 查看NGINX状态
sudo systemctl status nginx
```

## 📋 总结

通过以上步骤，您可以轻松部署OpenIM CMS的NGINX反向代理配置。主要步骤是：

1. 选择配置文件
2. 替换服务器IP
3. 部署到NGINX
4. 验证配置

整个过程无需使用脚本，手动操作即可完成部署。
