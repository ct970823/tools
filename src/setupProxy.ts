// import  {createProxyMiddleware} from "http-proxy-middleware";
const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function(app) {
    app.use("/api",createProxyMiddleware({
        target:'https://api.weixin.qq.com',
        changeOrigin:true,
        pathRewrite:{
            "^/api":""
        }
    }))
    app.use("/user",createProxyMiddleware({
        target:'http://127.0.0.1:8080',
        changeOrigin:true,
        pathRewrite:{
            "^/user":""
        }
    }))
}
