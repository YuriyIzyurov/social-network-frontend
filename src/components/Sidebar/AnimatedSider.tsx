import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {CustomerServiceOutlined, HomeOutlined, MessageOutlined, TeamOutlined} from "@ant-design/icons";
import {Layout} from 'antd';
import classnames from "classnames";
import {useSelector} from "react-redux";
import {getCurrentProfile} from "../../redux/profile-selectors";
const {Sider} = Layout

export const AnimatedSider = () => {

    const [isActive, setIsActive] = useState(false)
    const clickHandler = () => {
        setIsActive(!isActive)
    }
    const currentProfile = useSelector(getCurrentProfile)
    return (
        <>
            <Sider>
                <div className={classnames("site__layout-left-sider", {"left-sider-active": isActive})}>
                    <ul>
                        <li>
                            <NavLink to="/profile"><HomeOutlined /><span>Profile</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialogs"><MessageOutlined /><span>Messages</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/music"><CustomerServiceOutlined /><span>My music</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/users"><TeamOutlined /><span>Find friends</span></NavLink>
                        </li>
                    </ul>
                    <div className="friends-block">
                        <div className="friends">
                            <span>Friends (38)</span>
                            <span>See all</span>
                        </div>
                        <div className="friends__list">
                            <div className="friends__list-item">
                                <div className="friends__list-item-avatar">
                                    <img style={{width:"44px", height:"44px"}} src={currentProfile ? currentProfile.photos.small : "https://i.pinimg.com/236x/5a/43/81/5a4381dac136ab3ea9740ac9f1746dc2.jpg" } alt='ava'/>
                                </div>
                                <div className="friends__list-item-name">
                                    <span>Anne Couture</span>
                                    <span>5 min ago</span>
                                </div>
                            </div>
                            <div className="friends__list-item">
                                <div className="friends__list-item-avatar">
                                    <img style={{width:"44px", height:"44px"}} src={currentProfile ? currentProfile.photos.small : "https://i.pinimg.com/236x/5a/43/81/5a4381dac136ab3ea9740ac9f1746dc2.jpg"} alt='ava'/>
                                </div>
                                <div className="friends__list-item-name">
                                    <span>John Paddington</span>
                                    <span>5 hours ago</span>
                                </div>
                            </div>
                            <div className="friends__list-item">
                                <div className="friends__list-item-avatar">
                                    <img style={{width:"44px", height:"44px"}} src={currentProfile ? currentProfile.photos.small : "https://i.pinimg.com/236x/5a/43/81/5a4381dac136ab3ea9740ac9f1746dc2.jpg"} alt='ava'/>
                                </div>
                                <div className="friends__list-item-name">
                                    <span>Michael Siguirdney</span>
                                    <span>22 min ago</span>
                                </div>
                            </div>
                            <div className="friends__list-item">
                                <div className="friends__list-item-avatar">
                                    <img style={{width:"44px", height:"44px"}} src={currentProfile ? currentProfile.photos.small : "https://i.pinimg.com/236x/5a/43/81/5a4381dac136ab3ea9740ac9f1746dc2.jpg"} alt='ava'/>
                                </div>
                                <div className="friends__list-item-name">
                                    <span>Ivan Nalimov</span>
                                    <span>2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="toggle"
                        onClick={clickHandler}
                    >
                    </div>
                </div>
            </Sider>
        </>
    );
};
