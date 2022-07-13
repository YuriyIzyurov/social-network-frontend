import {ResultCode, ResultCodeForCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {InferActionsTypes, BaseThunkType} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {Action} from "redux";
import {profileAPI} from "../api/profileAPI";
import {PhotosType} from "../typings/types";


export type initialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionType>

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false as boolean | false,
    captcha: null as string | null,
    error: null as string | null,
    photos: null as PhotosType | null
}

const authReducer = (state = initialState,action:ActionType):initialStateType => {
    switch (action.type) {
        case "SET_USER_AUTH":
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        case "LOGOUT_USER":
            return {
                ...state,
                isAuth: false,
                id: null
            }
        case "SET_CAPTCHA":
            return {
                ...state,
                captcha: action.imageURL
            }
        case "DEL_CAPTCHA":
            return {
                ...state,
                captcha: null
            }
        case "ERROR_MESSAGE":
            return {
                ...state,
                error: action.message
            }
        case "DEL_ERROR":
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const handlingAuthData = ():ThunkType => {
    return async (dispatch) => {
       let response = await authAPI.getAuth()
            if(response.resultCode === ResultCode.Success){
                let response2 = await profileAPI.getProfile(response.data.id)
                let {photos} = response2
                let {email, id, login} = response.data
                dispatch(actions.setUserAuth(email, id, login, photos))}
    }
}
export const sendAuthDataOnServ = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.submitAuth(email, password, rememberMe, captcha)
            if(response.resultCode === ResultCode.Success){
                dispatch(actions.deleteIncorrectData())
                dispatch(handlingAuthData())
                dispatch(actions.deleteCaptcha())
            } else {
                if(response.resultCode === ResultCodeForCaptcha.NeedCaptcha) {
                    dispatch(askForCaptcha())
                }
                dispatch(actions.incorrectData(response.messages[0]))
                
            }
    }
}
export const askForCaptcha = ():ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.getCaptcha()
        dispatch(actions.setCaptchaImage(response.url))
    }
}
export const logoutFromServer = ():ThunkType => async (dispatch) => {
            let response = await authAPI.logout()
            if(response.resultCode === ResultCode.Success){
                let response2 = await authAPI.getAuth()
                    if(response2.resultCode === ResultCode.GoWrong){
                        dispatch(actions.logoutUser())
                    }
                }
            }

export const actions = {
    setUserAuth: (email:string,id:number,login:string, photos: PhotosType) => ({type : "SET_USER_AUTH", data : {email,id,login, photos}} as const),
    logoutUser: () => ({type : "LOGOUT_USER"} as const),
    setCaptchaImage: (imageURL:string) => ({type : "SET_CAPTCHA", imageURL} as const),
    deleteCaptcha: () => ({type : "DEL_CAPTCHA"} as const),
    incorrectData: (message: string) => ({type : "ERROR_MESSAGE", message} as const),
    deleteIncorrectData: () => ({type : "DEL_ERROR"} as const)
}



export default authReducer