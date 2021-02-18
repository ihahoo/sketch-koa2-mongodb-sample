# sketch-koa2-mongodb-sample

对[36node/sketch](https://github.com/36node/sketch)生成的后端脚手架的尝试和分析。本例简单的写了一个todos的后端接口。

这套组合日常开发通过修改openapi.yml文件（OAS 3.0)，也就是书写了生成swagger接口文档的代码，同时通过代码生成工具，可以从openapi描述生成部分模版代码。集成测试使用了newman，就像我们日常使用的PostMan工具，只不过通过代码自动跑测试用例。在统一代码风格上，使用了prettier，日志使用了pino，使用husky和commitlint对git提交做了规范[约定式提交](https://www.conventionalcommits.org/)

## 通过k8s部署打包好的docker镜像

````
$ kubectl apply -f k8s/deployment.yaml
````

通过 http://localhost:30080/todos/v1/todos 可本地查看

## 停止k8s部署

````
$ kubectl delete -f k8s/deployment.yaml
````

## 远程访问openapi.yml
http://localhost:30080/todos/v1/openapi.yml

可通过swagger工具直接转换成接口文档

## 健康检查
http://localhost:30080/todos/v1/health

## 安装开发环境
You'll need to have [Node.js](https://nodejs.org) to get started.
````
$ git clone https://github.com/ihahoo/sketch-koa2-mongodb-sample.git
$ npm install
````

## 启动开发环境

````
$ docker-compose -d
$ npm run start
````

## 通过openapi.yml生成api代码

````
$ npm run gen:api
````

## 通过openapi.yml生成postman代码

````
$ npm run gen:postman
````

## 测试

````
$ npm run test
````

## 集成测试

````
$ npm run test:int
````
