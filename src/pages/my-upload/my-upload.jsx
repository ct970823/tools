import React, {useState } from 'react';
import { Upload,Modal } from 'antd';
import ImgCrop from 'antd-img-crop';

/**
 * @Description: upload上传组件，支持上传，点击某一个上传和删除，上传时剪切功能，预览
 * listType:默认参数为picture-card
 * @author Tao Chen
 * @date 2021/4/12
*/
const MyUpload = (props) => {



    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);
    const [previewVisible,setPreviewVisible] = useState(false)
    const [previewImage,setPreviewImage] = useState('')
    const [previewTitle,setPreviewTitle] = useState('')


    /**
     * 图片修改触发方法
     * @param newFileList
     */
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    /**
     * 图片base64，用于预览
     * @param file
     * @returns {Promise<unknown>}
     */
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    /**
     * 预览图片
     * @param file
     * @returns {Promise<void>}
     */
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        const image = file.url || file.preview
        const title = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        setPreviewVisible(true)
        setPreviewImage(image)
        setPreviewTitle(title)
    };

    /**
     * 关闭预览弹窗
     */
    const handleCancel = () => setPreviewVisible(false);

    const handleDownLoad = () => {
        console.log(1)
    }

    return (
        <div className="my-upload-box">
            <ImgCrop rotate>
                {/*<img src="123213" alt="ces"/>*/}
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType='picture-card'
                    fileList={fileList}
                    maxCount={3}
                    onChange={onChange}
                    onPreview={handlePreview}
                    onDownload={handleDownLoad}
                >
                    {/*{*/}
                    {/*    fileList.map(item=>(*/}
                    {/*        <img src={item.url} alt=""/>*/}
                    {/*    ))*/}
                    {/*}*/}
                    {/*{fileList.length < 5 && '+ Upload'}*/}
                    + Upload
                    {/*{*/}
                    {/*    this.state.imageUrl*/}
                    {/*        ? <img src={fileList} className={style['avatar']} />*/}
                    {/*        : <Icon type='plus' className={style['avatar-uploader-trigger']} />*/}
                    {/*}*/}
                </Upload>
            </ImgCrop>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}
export default MyUpload
