// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/mini/login',
            data: {
              code: res.code
            },
            success: (res) => {
              const { flag, data, message } = res.data;
              if (!flag) {
                return wx.showToast({
                  title: message,
                  icon: 'error',
                  duration: '2000'
                })
              }
              wx.setStorageSync('token', `${data.tokenHead} ${data.token}`);
              wx.setStorageSync('userInfo', data.userInfo);
              wx.setStorageSync('openid', data.openid);
            },
            fail: (err) => {
              console.log("接口请求失败：--->", err)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  towxml: require('/towxml/index')
})