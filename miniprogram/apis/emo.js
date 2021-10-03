module.exports.createEmo = (emoId) => {
  return wx.cloud.callFunction({
    name: 'createEmo',
    data: {
      emoId,
    },
  })
}

module.exports.getEmo = () => {
  return wx.cloud.callFunction({
    name: 'getEmo',
  });
}

module.exports.getEmos = () => {
  return wx.cloud.callFunction({
    name: 'getEmos',
  });
}