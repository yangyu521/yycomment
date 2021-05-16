//导出的对象就是配置对象
module.exports = {
    //publicPath  公共路径 ，主要是资源的路径 就是index.html 使用什么的地址去找  css js img等
    //默认值是 '/' 就是服务器跟地址  假如你的服务器地址是 ‘https://<USERNAME>.github.io/<REPO>’   ，那么public
    //要区分生产环境和开发环境，只有在部署的时候也就是生产环境下需要设置publicPath
    publicPath: process.env.NODE_ENV === 'production'
    ? '/yycomment/'
    : '/'
}