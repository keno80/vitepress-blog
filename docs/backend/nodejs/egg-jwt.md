# [Egg] egg-jwt 的使用

`JWT`是`Json Web Token`的简称，它定义了一种紧凑的、自包含的方式，用于作为 JSON 对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。

我们现在一般将 JWT 用来做用户的授权，即一旦用户登录，后续每个请求都将包含 JWT，允许用户访问该令牌允许的路由、服务和资源。单点登录是现在广泛使用的 JWT 的一个特性，因为它的开销很小，并且可以轻松地跨域使用。

## egg-jwt

`egg-jwt`是 egg 框架封装的一个 jwt 插件，它可以很轻松的在 eggjs 搭建的框架之中使用，我们只需要使用命令安装即可

```shell
npm install egg-jwt --save

yarn install egg-jwt

pnpm add egg-jwt
```

## 在 plugins.js 中启用

```js
jwt: {
  enable: true,
  package: 'egg-jwt'
}
```

## 在 config.${env}.js 中配置

```js
config.jwt = {
  secret: 'Great4-M',
  enable: true, // default is false
}
```

## 在 controller 中使用

我们现在假定我们有一个名为 login 的 controller，现在我们需要在里面添加登录后给生成 token 的流程

```js
const { Controller } = require('egg')

class LoginController extends Controller {
  async login() {
    const { ctx, app } = this

    // 获取用户传过来的用户名以及密码
    const { username, password } = ctx.requets.body

    /**
     * 获取到用户名和密码之后，通过service查询数据库进行验证
     * 验证成功之后，生成token
     */

    const token = app.jwt.sign(
      {
        username,
        // ... 其他想要一起生成的参数
      },
      app.config.jwt.secret
    )

    // 生成token之后，返回给前端
    ctx.token = token
  }
}
```

## 在 router 中为需要进行权限验证的路由添加 token 验证

```js
export default (app) => {
  const { controller, router, jwt } = app

  //正常路由
  router.post('/admin/login', controller.admin.login)

  /*
   * 这里的第二个对象不再是控制器，而是 jwt 验证对象，第三个地方才是控制器
   * 只有在需要验证 token 的路由才需要第二个 是 jwt 否则第二个对象为控制器
   **/
  router.post('/admin', jwt, controller.admin.index)
}
```

至此，你的nodejs服务器便已支持token验证。