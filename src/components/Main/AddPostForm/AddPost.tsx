import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import { Divider, Input} from "antd";
import { publicPost} from "redux/Reducers";
import {postsAPI} from "api/postsAPI";
import {useAppDispatch} from "redux/reduxStore";
import SimpleMDERedactor from 'utils/EditSettings/SimpleMDERedactor';
import {AddPostType, FileType, PostImgType, uploadImagesType} from "typings";
import {useSelector} from "react-redux";
import {getPostID} from "redux/Selectors";
import {useNavigate, useParams} from "react-router";
import AddPostButton from "components/CustomButtons/AddPostButton";
import {postActions} from "redux/Actions";
import {Scrollbar} from 'react-scrollbars-custom';
import {openNotification} from "utils/notifications/notificationTop";
import {PreviewComponent} from "components/Main";
import {checkChangePossibility} from "utils/EditSettings/checkEditable";




type PropsType = {
    postHandler: () => void
    currentPost: null | AddPostType
    id: null | string
    getPostById:  (() => void) | null
}


export const AddPost: React.FC<PropsType> = ({postHandler, currentPost,id, getPostById}) => {

    const [imageUrl, setImageUrl] = useState<PostImgType>({original:null, medium:null})
    const [title, setTitle] = useState(``)
    const [tags, setTags] = useState([] as string[])
    const [text, setText] = useState(``)

    const inputImgRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const postId = useSelector(getPostID)
    const navigate = useNavigate()
    const params = useParams()


        useEffect(() => {
        if(params.id && postId && getPostById) {
            getPostById()
            dispatch(postActions.deleteCreatedPostId())
            postHandler()
        }
         if(postId) {
            navigate(`/posts/${postId}`)
            dispatch(postActions.deleteCreatedPostId())
        }
    },[postId])

    useEffect(() => {
        if(currentPost) {
            const {imageUrl, title, tags, text} = currentPost
            setImageUrl(imageUrl)
            setTitle(title)
            setTags(tags)
            setText(text)
        }
    },[])

    const sendNewPost = () => {
        if(text.length > 500) {
            if(currentPost) {
                checkChangePossibility(id, () => dispatch(publicPost({title, tags, text, imageUrl}, id)))
            } else {
                dispatch(publicPost({title, tags, text, imageUrl}))
            }
        } else {
            const error = `Символов в вашем тексте:${text.length}`
            openNotification("error","top", error , "Слишком короткий текст. Минимальная длина - 500 символов.")
        }
    }
    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
                await postsAPI.uploadPreview(e.target.files[0]).then((response) => {
                    setTimeout(() => {
                        setImageUrl({
                            original: response.data.original.path,
                            medium: response.data.medium.path
                        })
                    }, 2500)
            })
        }
    }

    const deletePreview = async () => {
        const imageID = imageUrl.original?.replace(/.*\//g,'')
        if(imageID) {
            const response = await postsAPI.deletePreview(imageID)
            if(response.resultCode === 0)
                setImageUrl({original:null, medium:null})
        }
    }
    const deleteFileFromServ =  () => {
        checkChangePossibility(id,deletePreview)
    }

    const makeArrayOfTags = (e: ChangeEvent<HTMLInputElement>) => {
        const tags = e.currentTarget.value.replace(/\s/g, '').split(',')
        setTags(tags)
    }

    const handleSetText = useCallback((value: string) => {
        setText(value)
    }, [])

    const uploadPreview = () => {
        checkChangePossibility(id, () => inputImgRef.current?.click())
    }

    return (
        <div style={{
            position: currentPost ? "inherit" : "absolute",
            width: currentPost ? "100%" : "97%",
            height: currentPost ? "100%" : "unset",
            display: currentPost ? "grid" : "unset",
            boxShadow: currentPost ? "" : "-10px 20px 10px rgba(0,0,0,0.2)"
        }} className="profile__posts-adding">

            <div className="profile__posts-adding-preview">
                    <AddPostButton onClick={uploadPreview} text='Загрузить превью'/>
                    <input name='image'
                           type='file'
                           onChange={handleFile}
                           ref={inputImgRef}
                           hidden/>
                {imageUrl?.medium && <AddPostButton onClick={deleteFileFromServ} text='Удалить' animation={false}/>}
            </div>
            {imageUrl?.medium
                &&
                <div>
                    <img src={imageUrl?.medium} alt='preview'/>
                </div>}
            <div className="profile__posts-adding-inputs">
                <Divider orientation="left" orientationMargin={0} plain>
                    Заголовок
                </Divider>
                    <Input name='title'
                           value={title}
                           onChange={(e) => {setTitle(e.currentTarget.value)}}
                           placeholder="Введите заголовок статьи"/>
                <Divider orientation="left" orientationMargin={0} plain>
                    Тэги
                </Divider>
                    <Input name='tags'
                           value={tags}
                           onChange={makeArrayOfTags}
                           placeholder="Введите тэги через запятую"/>
                <Divider orientation="left" orientationMargin={0} plain>
                    Пост
                </Divider>
                <SimpleMDERedactor handleSetText={handleSetText} text={text}/>
            </div>
            <div className="profile__posts-adding-buttons contacts-button">
                <AddPostButton onClick={sendNewPost} text='Опубликовать'/>
                <AddPostButton onClick={postHandler} text='Отмена' animation={false}/>
            </div>
        </div>

    );
};
