import React from "react"
import s from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/04/06/69/4958106611a2dbe.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                ava+descr
            </div>
        </div>
    )
}

export default ProfileInfo