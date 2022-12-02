# 对 uni-request 进行封装

uni-request 是 uniapp 所封装的一个网络请求库，集成在 uniapp 之中，虽然其可用性已经很高了，但是为了应对我们业务上的一些需求，我们也需要对这个库进行一些常用的封装。

## 准备

首先，我们需要明确要根据业务情况封装的参数，如请求方法(`method`)，请求地址(`url`)请求参数(`data`)，成功(`success`)失败(`fail`)的处理等等。

## 开始封装

```js
// 请求地址
const baseUrl = 'http://localhost:7001'

// 要导出的请求函数
/**
 * config 外部传进的参数，包含上面所说的需要根据业务来封装的参数
 */
export const request = (config) => {
  // 通过Promise来处理成功失败回调
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + config.url,
      method: config.method ? config.method : 'GET',
      data: config.data ? config.data : [],
      timeout: 30000,
      header: {
        Authorization: uni.getStorageSync('token') ? uni.getStorageSync('token') : '',
      },
      success: (res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            resolve()
          }
        } else {
          reject(res.msg)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
```

之后在 api 文件之中引入使用就 ok 了
