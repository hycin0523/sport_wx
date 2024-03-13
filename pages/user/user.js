// pages/user/user.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 获取用户信息
   */
  getInfo() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        let { avatarUrl, nickName, gender, country, province, city } = res.userInfo;
        wx.request({
          url: 'http://localhost:8080/mini/update/info',
          method: 'POST',
          header: {
            'Authorization': wx.getStorageSync('token'),
          },
          data: {
            nickName: nickName,
            avatar: avatarUrl,
            openId: wx.getStorageSync('openid'),
          },
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.log("接口请求失败：--->", err)
          }
        });
      }
    })
  },

  /**
   * 退出登录
   */
  logout() {
    wx.clearStorageSync();
    wx.exitMiniProgram();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})