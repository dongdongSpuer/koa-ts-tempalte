## 东东商城

## 商城介绍

### 技术选型

#### 后端

- node-koa2
- MySQL
- redis
- typeORM

#### 前端

- vue3
- vue-router
- pinia
- axios+fetch

## 功能

### 用户模块

用户信息表：

```
用户ID id
用户名 userName
用户密码 password
电子邮箱 email（可空）
手机号 phone可空
注册时间：createTime
最后登录时间 lastLoginTime
```

### 接口

#### 用户注册

> 邮箱注册

- 路径：/user/register
- 方法：post
- 参数

```
{
	userName:string
	password:string
	emial:string
}
```

> 手机号注册

- 路径：/user/register
- 方法：post
- 参数

```
{
	userName:string
	password:string
	phone:string
}
```

返回

- 成功

```
{
	code:0，
	message："注册成功",
	data:{
		token:string
	}
}
```

#### 用户登录



### 商品模块

### 购物车管理

### 支付功能

### 评论与评分

### 后台管理



