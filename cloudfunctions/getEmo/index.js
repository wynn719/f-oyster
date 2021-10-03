// 云函数入口文件
const cloud = require('wx-server-sdk')
const dayjs = require('dayjs')

cloud.init({
  env: 'f-oyster-1gz6n6kq3f22185b',
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const startAt = dayjs().startOf('day').toDate();
  const endAt = dayjs().endOf('day').toDate();
  let crtEmo = null;

  try {
    const res = await db.collection('emo_checks')
      .where({
        openid: wxContext.OPENID,
        created_at: _.gte(startAt).and(_.lte(endAt)),
      })
      .limit(1)
      .get();

    if (res.data.length) {
      const one = res.data[0];
      const emoRes = await db.collection('emos').doc(one.emo_id).get();

      crtEmo = {
        ...res.data[0],
        pic: emoRes.data.pic,
      }
    }

    return {
      code: 0,
      data: crtEmo,
    };
  } catch (error) {
    return {
      code: -1,
      err: error,
    };
  }
}