import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://106.54.54.237:8000/api/mn',
        timeout: 80000,
        retry: 5, // 请求次数
        retryInterval: 1000 // 求期间隙
    })

    // 2.axios的拦截器
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        // console.log(err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
      console.log(err);
      let config = err.config;
      // const { config, code, message } = err
      //如果配置不存在或重试属性未设置，抛出promise错误
      if (!config || !config.retry) return Promise.reject(err);
      //设置一个变量记录重新请求的次数
      config.retryCount = config.retryCount || 0;
      // 检查重新请求的次数是否超过我们设定的请求次数
      if (config.retryCount >= config.retry) {
          return Promise.reject(err);
      }
      //重新请求的次数自增
      config.retryCount += 1;
      // 创建新的Promise来处理重新请求的间隙
      let back = new Promise(function (resolve) {
          console.log("接口" + config.url + "请求超时，重新请求")
          setTimeout(function () {
              resolve();
          }, config.retryInterval || 1);
      });
      //返回axios的实体，重试请求
      return back.then(function () {
          return instance(config);
      });
    })

    // 3.发送真正的网络请求
    return instance(config)
}
