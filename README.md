### Node.js微服务-读书笔记
[亚马逊-传送门](https://www.amazon.cn/dp/B01MXY8ARP/ref=sr_1_1?ie=UTF8&qid=1517230090&sr=8-1&keywords=nodejs%E5%BE%AE%E6%9C%8D%E5%8A%A1)

### 微服务的好处
- 弹性
- 可伸缩性
- 技术多样性
- 可替换性
- 独立性

### 微服务的不足
- 网络延迟：微服务具有分布式的特性，从而无可避免地会存在网络延迟。
- 运维负担：更多的服务器也意味着需要更多的维护工作。
- 最终一致性：在一个对事务性要求较高的系统中，考虑到实现的局限性，各个节点在某一段时间内可能会出现

### 数据库ACID
- 原子性：每一个事务要么全部生效，要么全部回滚。只要有一部分失败，不会有任何变更持久化到数据库中。
- 一致性：事务中产生的数据变更会得到一致性保证。
- 隔离性：事务并发执行产生的系统状态将与事务串行执行产生的
- 持久性：一旦事务被提交，数据将被持久化。

### 面向服务架构（SOA）与面向微服务


### Seneca
[微服务框架](http://senecajs.org/)


### PM2
[node应用执行管理器](http://pm2.keymetrics.io/)

### Nodemon
[node dev 修改后自动重启](https://www.npmjs.com/package/nodemon)

### 编写第一个微服务
微电子商务-项目，集成Express与Seneca
- 商品管理服务
- 邮件管理服务
- 订单管理服务
- ui聚合API（服务）


### 断路器
断路器有以下三种状态。
- 关闭：断路器闭合，请求可以发往其目标服务器。
- 开启：断路器开启，请求无法通过断路器，客户端会得到错误提示。经过一段时间，系统会重试通信。
- 半开启：断路器对服务进行重试，如果可以正常连接，则可以继续向该服务发送请求，断路器闭合。
通过这一简单的机制，可以防止错误扩散到整个系统，避免“雪崩效应”。


### ssh
SSH是SecureShell的简写，它是一款用于访问远程shell的软件
- 私钥
- 公钥

### 应用安全
[OWASP是一个开源的、非盈利的全球性安全组织，致力于应用软件的安全研究。](https://github.com/OWASP)
会发布top10安全隐患

- 注入(sql)
- 跨站脚本攻击
- 跨站请求伪造
- 开放重定向（恶意修改重定向登录地址，伪造登录页面，骗取账号密码）


### 测试
- Postman测Api
- 采用Swagger并使用开放API标准来对微服务进行文档化
- 单元测试
- 集成测试
- 端到端(E2E)测试
- 使用Selenium来模拟DOM单击，从而对UI进行测试。
- Mocha和Chai。
- istanbul测试覆盖率

### 服务监测
#### 硬件指标
- 内存指标：该指标表明系统中剩余多少内存，或者我们的应用消耗了多少内存。
- CPU使用率：正如其名，该指标表明在某一时间点我们使用了多少CPU。
- 磁盘使用率：该指标表明了物理磁盘的I/O压力。

#### 应用指标
-单位时间内的错误数
-单位时间内的调用数
-响应时间

pm2结合Keymetrics(同作者、付费)，进行监控

#### 内存泄露


### 微服务部署
- pm2ecosystem
- Dockerdockfile
- Node事件循环机制
- Node单线程，利用多核
	- 使用cluster模块，require('os').cpus().length
	- 使用pm2 startapp.js -i0 //-i数量

### 负载均衡Nginx
- nginx是一个专注于高并发与低内存消耗的Web服务器。
默认情况下，主配置文件位于/etc/nginx/nginx.conf，
```js
user nginx;
worker_processes 1; #用于服务请求的进程）的数量
error_log /var/log/nginx/error.logwarn;
pid /var/run/nginx.pid;
events{
	worker_connections 1024; #单个worker可拥有的活跃连接数以及最后的HTTP配置。
}
http{
	include /etc/nginx/mime.types;
	default_type application/octet-stream;
	#gzip on;
	include /xxx/xxx/xxx/*.conf; #有了这配置之后，任何在该指定目录下的以.conf结尾的文件都将成为NGINX配置的一部分。


http{
	upstreamapp{
		round robin; #默认轮流分发
		#least_conn; 最少连接数
		#ip_hash; 有状态时，iphash保证请求落到相同机器上，session可用
		server 10.0.0.1:3000;
		server 10.0.0.2:3000;
	}
	server{
		listen 80;
		location / {
		proxy_pass http://app;
	}
}
}

//检查配置
sudo nginx -t

//启动nginx
sudo nginx

//生效配置
sudo nginx -s reload  // -s signal stop, quit, reopen, reload
```

#### nginx健康检查
NGINX自带了两种类型的健康检查：

#### 被动检查
如果上游服务器的响应发生错误，NGINX会将该节点标记为“错误”，并会将它从负载均衡器中摘除一段时间后再引入。还有一些其他的配置参数，例如max_fails或fail_timeout，可分别用于配置当某个节点出现了多少次故障或请求时间超时多久时将其标记为无效节点。


#### 主动检查
```js
http{
	upstream app {
		zone app test; # health_check后需加
		server 10.0.0.1:3000;
		server 10.0.0.2:3000;
	}
	server{
		listen 80;
		location / {
			proxy_pass http://app;
			health_check; #默认配置会每5秒向upstream配置项指定的主机和端口发起连接。
		}
	}
}

```