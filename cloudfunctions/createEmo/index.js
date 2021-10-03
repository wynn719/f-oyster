// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'f-oyster-1gz6n6kq3f22185b'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { emoId } = event;
  const db = cloud.database();

  try {
    const newEmo = {
      openid: wxContext.OPENID,
      emo_id: emoId,
      created_at: new Date(),
    }
    const res = await db.collection('emo_checks').add({
      data: newEmo,
    });

    return {
      code: 0,
      data: {
        _id: res._id,
        ...newEmo,
      },
    }
  } catch (error) {
    return {
      code: -1,
      err: error,
    }
  }``
}