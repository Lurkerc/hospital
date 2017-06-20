/**
 * 作为临时调试API后端服务使用
 * 需要安装依赖 express 和 body-parser
 * 修改该文件自动重启： npm i nodemon -g  nodemon app.js
 */

let express = require('express')
// let bodyParser = require('body-parser')
let app = express()

// app.use(bodyParser())

app.post('/api/login', function (req, res) {
  res.json({
    data: '123456789',
    status: {
      msg: "调试登录",
      code: 0
    }
  })
})

app.all('*/', function (req, res) {
  res.json({
    status: {
      msg: "调试接口",
      code: 1
    },
    res: {
      url: req.params[0],
      method: req.method,
      header: req.headers,
      data: req.body
    }
  })
})

app.listen(3000, function () {
  console.log(`Example app listening on port 3000! http://127.0.0.1:3000`)
})
