import React from 'react';
import DialogItem from "./DialogItem/DialogItem";
import {DialogType} from "../../typings/types";
import { Empty } from 'antd';

type PropsType = {
    dialogs: DialogType[]
    filter: string
}
export const DialogList: React.FC<PropsType> = ({dialogs, filter}) => {

    const filteredDialogs = dialogs.filter(dialog => dialog.userName.toLowerCase().indexOf(filter) !== -1)
    if (filteredDialogs.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет диалогов"/>
    }
    return (
        <>
            {filteredDialogs.map(n => <DialogItem name={n.userName}
                                          key={n.id}
                                          id={n.id}
                                          src={n.photos.small}
                                          hasNewMessages={n.hasNewMessages}
                                          newMessagesCount={n.newMessagesCount}
                                          date={n.lastDialogActivityDate}
                                          activityDate={n.lastUserActivityDate}
            />)}

        </>
    );
};
