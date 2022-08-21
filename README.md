## Setup

### 准备工作
1. fir clone cd
2. create database
3. cp config/config.example.yaml config/config.yaml

### 安装依赖

推荐使用yarn
```
yarn
```

### 运行
```
yarn run start
```


## 需求实现

### 功能开发
- [x] 确认功能模块
- [x] 连接数据库，定义表字段
- [x] 定义接口
- [x] 开发接口
- [x] 接口参数校验
- [x] 全局返回参数
- [ ] 日志（本可以复制之前项目使用log4.js做日志处理的，觉得不清楚最合适的实践方式，就没有做了）
- [x] 异常处理
- [ ] 缓存处理

### 测试

- [x] 单元测试（service做了单元测试）
- [ ] 集成测试

### 文档

- [x] 接口文档
- [x] README 文件

### 部署

- [x] 按照README文件说明可直接部署
- [ ] docker部署