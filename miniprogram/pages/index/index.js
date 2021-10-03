// pages/index/index.js
const { createEmo, getEmo, getEmos } = require('../../apis/emo');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoaded: false,
    todayEmo: {
      _id: '',
      emo_id: '',
    },
    emoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setCrtTitle();
    this.getEmos();
    this.getCrtEmo();
  },

  onPullDownRefresh() {
    this.getCrtEmo();
  },

  setCrtTitle() {
    wx.setNavigationBarTitle({
      title: (new Date()).toLocaleString(),
    });
  },

  async getEmos() {
    try {
      const res = await getEmos();
      const { result } = res;

      if (result.code === 0) {
        this.setData({
          emoList: result.data,
        });
      }
    } catch (error) {
      
    }
  },

  async getCrtEmo() {
    wx.showNavigationBarLoading();

    try {
      const res = await getEmo();  
      const { result } = res;
      let todayEmo = null;

      if (result.code === 0 && result.data) {
        todayEmo = result.data;
      }

      this.setData({
        todayEmo: todayEmo ? todayEmo : this.data.todayEmo,
        isLoaded: true,
      });
    } catch (error) {
      
    }

    wx.hideNavigationBarLoading()
  },

  async onClickEmo(e) {
    const { currentTarget } = e;
    const emoId = currentTarget.dataset.id;

    if (!emoId) return;

    wx.showLoading({
      title: 'loading...',
      mask: true,
    });

    try {
      const res = await createEmo(emoId);  
      const { result } = res;

      if (result.code === 0) {
        const todayEmo = result.data;

        todayEmo.pic = this.data.emoList.find(item => item._id === todayEmo.emo_id)?.pic || '';
        this.setData({
          todayEmo,
        })
      }
    } catch (error) {

    }

    wx.hideLoading();
  }
})