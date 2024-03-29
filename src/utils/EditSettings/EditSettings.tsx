import React, {useEffect, useState} from 'react';
import './EditSettings.scss'
import {Popover, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {deletePublication} from "redux/Reducers";
import {useAppDispatch} from "redux/reduxStore";
import {useNavigate} from "react-router";
import {checkChangePossibility} from "utils/EditSettings/checkEditable";

type PropsType = {
    editPost: () => void
    id: string
    handleTooltipVisibility: (boolean: boolean) => void
}
const EditSettings:React.FC<PropsType> = ({editPost, id, handleTooltipVisibility}) => {

    const [visible, setVisible] = useState(false)
    const [visibleEditTooltip, setVisibleEditTooltip] = useState(false)
    const [visibleDeleteTooltip, setVisibleDeleteTooltip] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(visible || visibleEditTooltip || visibleDeleteTooltip) {
            handleTooltipVisibility(true)
        } else handleTooltipVisibility(false)
    },[visible, visibleEditTooltip, visibleDeleteTooltip])

    const handleVisibleChange = (newVisible: boolean) => {
        setVisibleDeleteTooltip(false)
        setVisible(newVisible)
    }
    const hide = () => {
        setVisible(false)
    }
    const showEditTooltip = (newVisible: boolean) => {
        if(!visible) setVisibleEditTooltip(newVisible)
    }
    const showDeleteTooltip = (newVisible: boolean) => {
        if(!visible) setVisibleDeleteTooltip(newVisible)
    }
    const sendDeleteDataOnServ = () => {
        checkChangePossibility(id, () => {
            dispatch(deletePublication(id)).then(() => {
                navigate('/posts')
            })
        })
    }

    return (
        <>
            <div className="edit">
                <Tooltip mouseLeaveDelay={0.05}
                         mouseEnterDelay={0.3}
                         open={visibleEditTooltip}
                         onOpenChange={showEditTooltip}
                         title="Редактировать пост"
                >
                    <FormOutlined onClick={editPost}/>
                </Tooltip>
                <Tooltip mouseLeaveDelay={0.05}
                         mouseEnterDelay={0.3}
                         open={visibleDeleteTooltip}
                         onOpenChange={showDeleteTooltip}
                         title="Удалить пост">
                    <Popover
                        content={
                            <div className="popover-options">
                                <div>
                                    <CheckOutlined style={{color: 'red'}}/>
                                    <a onClick={sendDeleteDataOnServ}>Да</a>
                                </div>
                                <div>
                                    <CloseOutlined style={{color: '#39e324'}}/>
                                    <a onClick={hide}>Нет</a>
                                </div>
                            </div>
                        }
                        title="Вы действительно хотите удалить пост?"
                        trigger="click"
                        open={visible}
                        onOpenChange={handleVisibleChange}
                        color={"#2c2f48"}
                        overlayClassName="custom-popover"
                    >
                        <DeleteOutlined  />
                    </Popover>
                </Tooltip>
            </div>
        </>
    );
};

export default EditSettings;