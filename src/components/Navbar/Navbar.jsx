import React from "react"
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import SidebarContainer from "../Sidebar/SidebarContainer";


const Navbar = (props) => {
    return (
        <div className={s.nav}>
            <nav>
                <div className={s.item}>
                    <NavLink to="/profile" className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
                </div>
                <div>
                    <NavLink to="/dialogs"
                             className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
                </div>
                <div>
                    <NavLink to="/news" className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
                </div>
                <div>
                    <NavLink to="/music" className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
                </div>
                <div>
                    <NavLink to="/settings"
                             className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
                </div>
            </nav>
            <SidebarContainer />
        </div>
    )
}

export default Navbar