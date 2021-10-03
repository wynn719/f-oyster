App({
  async onLaunch() {
    wx.cloud.init({
      env: 'f-oyster-1gz6n6kq3f22185b',
      traceUser: true,
    });    
  },
})