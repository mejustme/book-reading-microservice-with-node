### Node. js 微服务 - 读书笔记
[亚马逊-传送门](https://www.amazon.cn/dp/B01MXY8ARP/ref=sr_1_1?ie=UTF8&qid=1517230090&sr=8-1&keywords=nodejs%E5%BE%AE%E6%9C%8D%E5%8A%A1)

### 微服务的好处
- 弹性
- 可伸缩性
- 技术多样性
- 可替换性
- 独立性

### 微服务的不足
- 网络 延迟： 微服 务 具有 分布式 的 特性， 从而 无可 避免 地 会 存在 网络 延迟。
-  运 维 负担： 更多 的 服务器 也 意味着 需要 更多 的 维护 工作。
-  最终 一致性： 在 一个 对 事务 性 要求 较高 的 系统 中， 考虑到 实现 的 局限性， 各个 节点 在某 一段时间 内 可能 会 出现

### 数据库 ACID
-  原子 性： 每一个 事务 要么 全部 生效， 要么 全部 回 滚。 只要 有 一部分 失败， 不会有 任何 变更 持久 化 到 数据库 中。
-  一致性： 事务 中产 生的 数据 变更 会 得到 一致性 保证。
-   隔离 性： 事务 并发 执行 产生 的 系统 状态 将 与 事务 串行 执行 产生 的
-  持久性： 一旦 事务 被 提交， 数据 将被 持久 化。

### 面向 服务 架构（ SOA） 与 面向微服务


### Seneca
[微服务框架](http://senecajs.org/)


### PM2
[node 应用执行管理器](http://pm2.keymetrics.io/)


### 编写第一个微服务
微电子商务-项目，集成 Express 与 Seneca
- 商品管理服务
- 邮件管理服务
- 订单管理服务
- ui 聚合API（服务）


### 断路器
断路器 有以下三种状态。
- 关闭： 断路器 闭合， 请求 可以 发往 其 目标 服务器。
- 开启： 断路器 开启， 请求 无法 通过 断路器， 客户 端 会 得到 错误 提示。 经过 一段时间， 系统 会 重试 通信。
- 半 开启： 断路器 对服务进行重试， 如果可以正常连接， 则可以继续向该服务发送 请求， 断路器闭合。
通过 这一 简单 的 机制， 可以 防止 错误 扩散 到 整个 系统， 避免“雪崩效应”。


### ssh
SSH 是 Secure Shell 的 简写， 它 是一 款 用于 访问 远程 shell 的 软件
- 私钥
- 公钥

### 应用安全
[OWASP是一个开源的、非盈利的全球性安全组织，致力于应用软件的安全研究。](https://github.com/OWASP)
会发布top10 安全隐患

- 注入 (sql)
- 跨 站 脚本 攻击
- 跨 站 请求 伪造
- 开放 重定向 （恶意修改重定向登录地址，伪造登录页面，骗取账号密码）


### 测试
- Postman 测Api
- 采用 Swagger 并使 用 开放 API 标准 来 对 微服 务 进行 文档 化
- 单元测试
- 集成测试
- 端到端(E2E)测试
- 使用 Selenium 来 模拟 DOM 单击， 从而 对 UI 进行 测试。
- Mocha 和 Chai。
- istanbul 测试覆盖率

### 服务监测
#### 硬件指标
 - 内存 指标： 该 指标 表明 系统 中 剩余 多少 内存， 或者 我们 的 应用 消耗 了 多少 内存。
 -  CPU 使用 率： 正如 其名， 该 指标 表明 在某 一时间 点 我们 使用 了 多少 CPU。
 -  磁盘 使用 率： 该 指标 表明 了 物理 磁盘 的 I/ O 压力。

#### 应用指标
- 单位 时 间内 的 错误 数
- 单位 时 间内 的 调用 数
- 响应 时间

pm2 结合 Keymetrics(同作者、付费)，进行监控

#### 内存泄露


### 微服务部署
- pm2 ecosystem
- Docker dockfile
- Node 事件循环机制
- Node 单线程，利用多核
	- 使用cluster模块，require(' os'). cpus(). length
	- 使用 pm2 start app. js -i 0    // -i 数量

### 负载 均衡 Nginx
- nginx 是一 个 专注 于 高 并发 与 低 内存 消耗 的 Web 服务器。
默认 情况下， 主配置文件 位于/ etc/ nginx/ nginx. conf，
``` js
user nginx;
worker_ processes 1;  // 用于 服务 请求 的 进程） 的 数量
error_ log /var/ log/ nginx/ error. log warn;
pid /var/ run/ nginx. pid;
events {
	worker_ connections 1024; // 单个 worker 可 拥有 的 活跃 连接 数 以及 最后 的 HTTP 配置。
}
http {
	include /etc/ nginx/ mime. types;
	default_ type application/ octet- stream;
	#gzip on;
	include /etc/ nginx/ sites- enabled/*. conf;  // 有了这配置之后， 任何在该指定目录下的以. conf结尾的文件都将成为NGINX配置的一部分。


http {
	upstream app {
		 round robin; // 默认 轮流分发
		 // least_ conn; 最少连接数
		 // ip_ hash;  有状态时，ip hash保证请求落到相同机器上，session可用
		 server 10. 0. 0. 1: 3000;
		 server 10. 0. 0. 2: 3000;
	 }
	 server {
		listen 80;
		location / {
		  proxy_ pass http:// app;
	   }
    }
 }

// 生效配置
sudo /etc/ init. d/ nginx reload
```

#### nginx 健康检查
NGINX 自带 了 两种 类型 的 健康 检查：

####  被动检查
如果 上游 服务器 的 响应 发生 错误， NGINX 会 将 该 节点 标记 为“ 错误”， 并 会 将它 从 负载 均衡器 中 摘除 一段时间 后再 引入。还有 一些 其他 的 配置 参数， 例如 max_ fails 或 fail_ timeout， 可分别 用于 配置 当某 个 节点 出现 了 多少 次 故障 或 请求 时间 超时 多久 时 将其 标记 为 无效 节点。


####  主动检查
``` js
http {
	upstream app {
		zone app test;  // health_ check 后需加
		server 10. 0. 0. 1: 3000;
		server 10. 0. 0. 2: 3000;
	 }
	 server {
		 listen 80;
		 location / {
			 proxy_ pass http:// app;
			 health_ check; // 默认配置会每5秒向 upstream 配置 项指定的主机和端口发起连接。
		 }
	  }
}

```