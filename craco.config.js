const CracoLessPlugin = require('craco-antd');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            // options: {
            //     customizeTheme: {//这里可以直接自定义主题色
            //         // "@primary-color": "#1DA57A",
            //         // "@link-color": "#1DA57A"
            //     },
            //     //customizeThemeLessPath: path.join(//也可以创建一个less文件，将需要改变的变量写入
            //     //	__dirname,
            //     //	"src/style/AntDesign/customTheme.less"
            //     //)
            // },
        },
    ],
};
