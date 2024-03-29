import React, {useEffect, useState} from 'react';
import {LastComment, PostTag} from 'pages/Posts';
import {useAppDispatch} from "redux/reduxStore";
import { handlingGetAllPosts, handlingSetAllPosts} from "redux/Reducers";
import {commentsAPI, postsAPI} from "api/postsAPI";
import Skeleton from 'antd/lib/skeleton/Skeleton';
import {CommentsType} from "typings";
import {StyledSearch} from 'components/Forms';
import {Segmented} from 'antd';
import {SegmentedValue} from 'antd/lib/segmented';
import {postActions} from "redux/Actions";

type PropsType= {
    loadPopularPosts: () => void
    loadAllPosts: () => void
    loadMyPosts: () => void
    isAuthorTabPicked: boolean
    isMyTabPicked:boolean
    isAuth: boolean
}
export const PostsSidebar:React.FC<PropsType> = ({loadPopularPosts, loadAllPosts, loadMyPosts, isAuthorTabPicked, isMyTabPicked, isAuth}) => {

    const [tags, setTags] = useState<string[] | undefined>(undefined)
    const [comments, setComments] = useState<CommentsType[] | undefined>(undefined)
    const [currentValue, setCurrentValue] = useState("Новые")

    const dispatch = useAppDispatch()

    useEffect(() => {
        getTags()
        getComments()
        if(isMyTabPicked)
            handleSegmentChange("Мои")
    }, [])


    const getComments = async () => {
        const response = await commentsAPI.getAll()
        setComments(response.data)
    }
    const getTags = async () => {
        const response = await postsAPI.getTags()
        setTags(response.data)
    }
    const searchPosts = (value:string) => {
        dispatch(handlingGetAllPosts(value)).then(() => {
            dispatch(postActions.addSearchFilter(value))
        })
    }
    const newTabHandler = () => {
        loadAllPosts()
        dispatch(postActions.pickAuthorTab(false))
        dispatch(postActions.pickMyTab(false))
    }
    const popTabHandler = () => {
        loadPopularPosts()
        dispatch(postActions.pickAuthorTab(false))
        dispatch(postActions.pickMyTab(false))
    }
    const myTabHandler = () => {
        loadMyPosts()
        dispatch(postActions.pickAuthorTab(false))
        dispatch(postActions.pickMyTab(false))
    }
    const handleSegmentChange = (value:SegmentedValue) => {
        switch (value) {
            case "Новые":
                newTabHandler()
                setCurrentValue("Новые")
                break
            case "Популярные":
                popTabHandler()
                setCurrentValue("Популярные")
                break
            case "Мои":
                myTabHandler()
                setCurrentValue("Мои")
                break
            default:
                break
        }
    }

    const getPostsWithTag = (item:string) => {
        dispatch(handlingSetAllPosts(item))
    }


    return (
        <div className="searchPost">
            <div className="searchPost__navigation">
                <Segmented
                    block
                    onChange={handleSegmentChange}
                    defaultValue={"Новые"}
                    value={isAuthorTabPicked ? "Автор" : isMyTabPicked ? "Мои" : currentValue}
                    options={[
                    "Новые",
                    "Популярные",
                    { label: 'Мои', value: 'Мои', disabled: !isAuth },
                    "Автор"
                ]} />

            </div>
            <div className="searchPost__input">
                <StyledSearch onSearch={searchPosts}/>
            </div>
            <div className="searchPost__tagBlock">
                <span>Популярные тэги</span>
                <div className="searchPost__tagBlock-tags">

                        {tags
                            ? <ul className='tagList'>
                                {tags.map((item, index) =>
                                    <PostTag
                                        key={'tag-' + index}
                                        item={item}
                                        getPostsWithTag={getPostsWithTag}
                                    />)}
                              </ul>
                            : <Skeleton title={false}
                                        active paragraph={{ rows: 5, width: ["60%","45%","50%","55%","40%",]}}/>}
                </div>
            </div>
            <div className="searchPost__comments">
                <span className="comments-description">Последние комментарии</span>
                <div className="searchPost__comments-list">
                    {comments
                        ?
                        comments.map((item) => <LastComment key={item._id} item={item} />)
                        : Array.from({length:5}).map(() =>
                            <div className='skeleton-comment'>
                                <Skeleton.Input active size='large' />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};
