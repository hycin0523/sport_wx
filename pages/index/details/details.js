// pages/index/details/details.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储运动资讯详情
    dataInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: `http://localhost:8080/sport/${options.id}`,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let content = res.data.data.content;
        if (content) {
          res.data.data.content = app.towxml(content, 'markdown', { theme:'light' });
        }
        this.setData({
          dataInfo: res.data.data
        });
      },
      fail: (err) => {
        console.log("接口请求失败：--->", err)
      }
    })
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