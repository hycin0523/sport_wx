// pages/food/foods/details/details.js
import * as echarts from '../../../../ec-canvas/echarts';
let echartsData = [];
const app = getApp();

/**
 * 初始化数据
 */
function initData(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  let option = {
    legend: {
      orient: 'vertical',
      //图标设置样式
      icon: "circle",
      //位置
      bottom: 'bottom',
      //格式化名字
      formatter: function (name) {
        let arr = [];
        echartsData.forEach(item => {
          if (item.name == name) {
            arr.push(name + item.value + 'g');
          }
        });
        return arr.join('');
      }
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: echartsData,
        label: {
          normal: {
            show: true,
            formatter: '{b}{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
          }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo: {},
    imageUrls: [],
    ec: {
      onInit: initData
    }
  },

  /**
   * 跳转
   */
  getFoodDetail() {
    wx.navigateTo({
      url: '/pages/food/foods/foodDetails/foodDetails?data=' + JSON.stringify(this.data.dataInfo)
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://localhost:8080/food/' + options.id,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let { data } = res.data;
        let temp = [];
        if (data.imageUrls) {
          let arr = data.imageUrls.split(',');
          if (arr.length > 0) {
            arr.forEach(i => {
              temp.push('http://s9nu8lrju.hb-bkt.clouddn.com/' + i);
            });
          } else {
            temp.push('http://s9nu8lrju.hb-bkt.clouddn.com/' + arr[0]);
          }
        } else {
          temp.push('https://img.yzcdn.cn/vant/cat.jpeg');
        }
        this.setData({
          dataInfo: data,
          imageUrls: temp
        });
        echartsData = [
          { value: data.fat, name: '脂肪' },
          { value: data.protein, name: '蛋白质' },
          { value: data.carbonWater, name: '碳水化合物' }
        ];
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