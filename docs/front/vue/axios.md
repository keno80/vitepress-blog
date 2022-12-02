# 使用 Typescript 对 axios 进行封装

随着 typescript 的普及，越来越多的项目开始使用 Typescript 来让对自己的项目进行约束，以便于后面的维护能够更简单，更轻松。

那么今天我们也使用 Typescript 对 Vue 中普遍使用的网络请求库`axios`封装一下，说起对 axios 的封装，我觉得有很多项目都封装过头了。怎么说呢，其实当前导出的 axios 已经完全满足我们的使用了，我们仅仅需要对一些例如 GET，POST 等请求方法进行一下封装处理，然后对于请求头处理一下 Token 等就已经完全足够了，那话不多说，开始吧！

## 安装 axios

这一步就不多说了，相信大家都会

```shell
# npm安装
npm install --save axios

# pnpm安装
pnpm add axios

# yarn安装
yarn install axios
```

## 开始封装

首先我们在项目的 utils 文件夹下创建一个 ts 文件，那么这里我就命名为`http.ts`，并在其中创建 axios 的实例，这一步相信大家都很熟悉了，直接看代码

```ts
import axios from 'axios'
import type { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseUrl: 'http://localhost:7001',
  timeout: 30000,
})
```

## 请求拦截器

我们在这一步的常用操作一般是为 header 添加 token，设置网络请求的 loading 效果等等。

```ts
import type { AxiosRequestConfig, AxiosError } from 'axios'

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**
     * 伪代码，对token进行处理
     * if (token) {
     *    config.headers.Authorization = `Bearer ${token}`;
     * }
     */
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
```

## 响应拦截器

在响应拦截器这一步，我们通常的话会对返回的数据进行状态判断，只返回业务所需要的代码，即`result.data`这一部分，然后会对一些错误以及一场展示出来，如请求失败，失败的原因等等。

```ts
import type { AxiosError, AxiosResponse } from 'axios'

/** 响应拦截器 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, msg, code } = response.data

    if (code === 0) {
      return data
    } else {
      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
```

## 公共请求方法

```ts
/** 导出公共请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },
  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}
```

到这里，typescript 版的 axios 封装就已经完成了。
