import React from 'react';
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL";
import {PhotosType} from "typings/types";
import { UserDefaultPhoto } from 'assets/images';

type PropsType = {
    photos: PhotosType | null
}
const HeaderAvatar:React.FC<PropsType> = ({photos}) => {

    return (
        <div className="profile__info-main-avatar" >
            {photos?.large ? <img
                    src={ProxyImageUrl(photos.large)}
                    alt="user"/>
                : <UserDefaultPhoto/>}
        </div>
    );
};

export default HeaderAvatar;