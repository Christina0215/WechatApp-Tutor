const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.qq.com', //网易163邮箱 smtp.163.com
  port: 465, //网易邮箱端口 25
  auth: {
    user: '1532706870@qq.com', //邮箱账号
    pass: 'cprmuaonduvuhfib' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async(event, context) => {
  
  // 创建一个邮件对象
  if(!event.Register)
  var mail = {
    // 发件人
    from: '来自Christina <1532706870@qq.com>',
    // 主题
    subject: '！你有新的家教订单！',
    // 收件人
    to: '2284298778@qq.com',
    // 邮件内容，text或者html格式
    text: "学生姓名:"+event.Name+"\r\n"+"学生年级:"+event.tsGrade+"\r\n"+"学科:"+event.tsSubject+"\r\n"+"住址:"+event.Location+"\r\n"+"详细住址:"+event.exLocation+"\r\n"+"电话号码:"+event.Phone
  };
  else
  var mail = {
    // 发件人
    from: '来自Christina <1532706870@qq.com>',
    // 主题
    subject: '！有人申请当家教！',
    // 收件人
    to: '2284298778@qq.com',
    // 邮件内容，text或者html格式
    text: "教师姓名:"+event.Name+"\r\n"+"教师性别:"+event.tsGender+"\r\n"+"电话:"+event.Phone+"\r\n"+"高校:"+event.School+"\r\n"+"专业:"+event.Subject+"\r\n"+"QQ:"+event.QQ+"\r\n"+"自我介绍:"+event.Information+"\r\n",
  }

  let res = await transporter.sendMail(mail);
  return res;
}