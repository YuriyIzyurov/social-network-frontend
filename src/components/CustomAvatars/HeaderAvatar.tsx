import React, {useEffect, useState} from 'react';
import {ProxyImageUrl} from "utils/ChangeURL/ProxifyURL";
import {PhotosType} from "typings";
import {MiniAvatarBorder, UserDefaultPhoto} from 'assets/VectorComponents';

type PropsType = {
    photo: string | null | undefined
    colors:string[]
}
export const HeaderAvatar:React.FC<PropsType> = ({photo, colors}) => {

    return (
        <>
            <MiniAvatarBorder colors={colors}/>
            <div className="profile__info-main-avatar" >
                {photo
                    ? <img src={photo} alt="user"/>
                    : <UserDefaultPhoto width={'49px'} height={'51px'}/>}
            </div>
        </>
    );
};

