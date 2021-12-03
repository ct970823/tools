// 引入打包下载的包
import JSZip from 'jszip'

/**
 * 文件下载
 * @param fileName {Array|String} 文件名
 * @param fileUrl {Array|String} 文件的url地址
 * @param downLoadName {String} 文件下载名
 */
export const downLoadFile = (fileName: string[] | string, fileUrl: string[] | string, downLoadName?: string) => {
    // 判断fileUrl是数组还是字符串
    if (Array.isArray(fileName) && Array.isArray(fileUrl)) {
        const zip = new JSZip()
        // 数组就使用打包下载
        for (let i = 0; i < fileName.length; i++) {
            zip.file(`${fileName[i]}.png`, fileUrl[i].split('data:image/png;base64,')[1], {
                base64: true
            });
        }
        // 生成zip文件并下载
        zip.generateAsync({
            type: 'blob'
        }).then(function (content) {
            createDownLink(`${downLoadName ? downLoadName : '下载'}.zip`, content)
        });
        return
    }
    createDownLink(downLoadName ? downLoadName : fileName as string, fileUrl as string)

}
/**
 * 创建a链接执行下载方法
 * @param downLodName {String} 下载名
 * @param fileUrl {String} 下载链接
 */
const createDownLink = (downLodName: string, fileUrl: string | Blob) => {
    const eleLink = document.createElement('a');
    eleLink.download = downLodName;
    eleLink.style.display = 'none';
    // 下载内容转变成blob地址
    if (typeof fileUrl === 'string') {
        eleLink.href = fileUrl;
    } else {
        eleLink.href = URL.createObjectURL(fileUrl);
    }
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}
