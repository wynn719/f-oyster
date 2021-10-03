# 云开发 TodoList 模板

这是使用云开发能力构建的待办事项小程序模板，其中演示了云开发三大基础能力的使用：

- 数据库：对文档型数据库进行读写
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 部署方式

小程序模板依赖云开发的数据库、云存储、云函数能力，部署前需先开通微信云开发

- 部署时，需要建立用于保存待办信息的数据库集合，默认集合名字为 `todo`，此项可在 `app.js` 中配置

- 小程序会按顺序从 ext.json、envList.js 尝试加载云环境信息

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

