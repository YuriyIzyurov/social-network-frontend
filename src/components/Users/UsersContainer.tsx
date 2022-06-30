import {connect} from "react-redux";
import Users from "./Users";
import {FilterType, handlingFollowAction, handlingUnfollowAction, handlingUsers,} from "../../redux/usersReducer";
import React, {ComponentType, useEffect} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {withRedirectIfNoAuth} from "../HOC/withRedirectIfNoAuth";
import {compose} from "redux";
import {
    getActivePage,
    getFollowInProcess,
    getIsFetching,
    getSearchFilter,
    getTotalUsers,
    getUsers,
    getUsersOnPage
} from "../../redux/user-selectors";
import {UserType} from "../../typings/types";
import {AppStateType} from "../../redux/reduxStore";
import {useLocation, useNavigate} from "react-router";


type StatePropsType = {
    users: Array<UserType>
    totalUsers: number
    usersOnPage: number
    activePage: number
    isFetching: boolean
    followInProcess: Array<number>
    searchFilter: FilterType

}
type DispatchPropsType = {
    handlingFollowAction: (user: number) => void
    handlingUnfollowAction: (user: number) => void
    handlingUsers: (activePage: number,usersOnPage: number, filter: FilterType) => void
}

function UsersContainer(props: StatePropsType & DispatchPropsType) {

    const history = useNavigate()
    const location = useLocation()
    const search = location.search

    useEffect(() => {
        const {activePage, usersOnPage,searchFilter} = props
        const params = new URLSearchParams(search)
        const parsedTerm = params.get("term")
        const parsedFriend = params.get("friend")
        const parsedPage = params.get("page")

        let actualPage = activePage
        let actualFilter = searchFilter

        if(parsedPage) actualPage = +parsedPage
        if(parsedTerm) actualFilter = {...actualFilter, term: parsedTerm}
        if(parsedFriend) actualFilter = {...actualFilter, friend: parsedFriend === "null" ? null : parsedFriend === "true"}
        props.handlingUsers(actualPage,usersOnPage, actualFilter)
    },[])

    useEffect(() => {
        const {searchFilter, activePage} = props
        history(`/users?term=${searchFilter.term}&friend=${searchFilter.friend}&page=${activePage}`)
    },[props.searchFilter, props.activePage])


    const getUsersOnPage = (n: number) => {
        const {usersOnPage, searchFilter} = props
        props.handlingUsers(n,usersOnPage, searchFilter)
    }
    const handlingFilteredUsers = (filter:FilterType) => {
        const {usersOnPage} = props
        props.handlingUsers(1,usersOnPage, filter)
    }
    return (
        <div>
            {props.isFetching ? <Preloader/> : <Users totalUsers={props.totalUsers}
                                                      usersOnPage={props.usersOnPage}
                                                      activePage={props.activePage}
                                                      users={props.users}
                                                      followInProcess={props.followInProcess}
                                                      getUsersOnPage={getUsersOnPage}
                                                      handlingFollow={props.handlingFollowAction}
                                                      handlingUnfollow={props.handlingUnfollowAction}
                                                      handlingFilteredUsers={handlingFilteredUsers}



            />}

        </div>
    )
}

const mapStateToProps = (state: AppStateType):StatePropsType => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        usersOnPage: getUsersOnPage(state),
        activePage: getActivePage(state),
        isFetching: getIsFetching(state),
        followInProcess: getFollowInProcess(state),
        searchFilter: getSearchFilter(state)
    }
}
export default compose<ComponentType>(
    withRedirectIfNoAuth,
    connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {handlingUsers, handlingFollowAction, handlingUnfollowAction})
)(UsersContainer)

