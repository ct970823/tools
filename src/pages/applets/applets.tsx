import React from 'react'
import QrcodeLimit from "./qrcode-limit";
import AppletsLimit from "./applets-limit";
import AppletsUnlimited from "./applets-unlimited";
import './applets.less'

const Applets:React.FC = () => {
    return (
        <div className='applets'>
            <QrcodeLimit/>
            <AppletsLimit/>
            <AppletsUnlimited/>
        </div>
    )
}

export default Applets
