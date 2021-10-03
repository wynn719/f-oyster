// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'f-oyster-1gz6n6kq3f22185b',
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  try {
    const res = await db.collection('emos')
      .orderBy('weight', 'asc')
      .get();

    return {
      code: 0,
      data: res.data,
    }
  } catch (error) {
    return {
      code: -1,
      err: error,
    }
  }
}