import React, {useEffect, useState} from 'react';
import "pages/Posts/Post/PostFull/PostFull.scss"
import {Input} from 'antd';
import {CommentOutlined, EyeOutlined} from '@ant-design/icons';
import {Scrollbar} from 'react-scrollbars-custom';
import {useParams} from "react-router";
import {commentsAPI, postsAPI} from "api/postsAPI";
import {CommentsType, PostType} from "typings/types";
import Preloader from "components/Preloader/Preloader";
import ReactMarkdown from 'react-markdown';
import {useSelector} from "react-redux";
import {getBloggerID} from "redux/auth-selectors";
import EditSettings from "utils/EditSettings/EditSettings";
import Comment from "pages/Posts/Comment/Comment";
// @ts-ignore
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
//выбрать nightOwl,
// @ts-ignore
import {nightOwl} from 'react-syntax-highlighter/dist/esm/styles/prism'
import SendComment from 'components/Forms/SendComment';
import { AddPost } from 'components/Main';

const { TextArea } = Input;
//todo: в один компонент сделать инпут?



const PostFull = () => {

    const [edit, setEdit] = useState(false)
    const [isTooltipVisible, setTooltipVisible] = useState(false)
    const [post, setPost] = useState<PostType | undefined>(undefined);
    const [comments, setComments] = useState<CommentsType[] | undefined>(undefined);
    const id = useSelector(getBloggerID)
    const params = useParams()

    const getPostById = async () => {
        const response = await postsAPI.getPostById(params.id)
        setPost(response.data)
    }
    const getCommentsOfPost = async () => {
            const response = await commentsAPI.getAllCommentsOfPost(params.id)
            setComments(response.data)

    }
    useEffect(() => {
        getPostById().then(() =>{
            getCommentsOfPost()
        })
    },[])

    const editPost = () => {
        setEdit(!edit)
    }
    const handleTooltipVisibility = (boolean: boolean) => {
        setTooltipVisible(boolean)
    }
    const sendComment = async (value: string) => {
        if(post){
            const response = await commentsAPI.writeComment(post._id, value)
            if(response.resultCode === 0) {
                getCommentsOfPost()
            }
        }
    }

    if(!post) {
        return <Preloader/>
    }
    if(edit) {
        const {title, text, tags, imageUrl} = post
        return  <AddPost  postHandler={editPost} currentPost={{title, text, tags, imageUrl}} id={post._id} getPostById={getPostById} />
    }
    return (
        <Scrollbar>
        <div className="post">
            <div className="post__main">
                {post.imageUrl
                    ?
                    <div className="post__main-headerImg">
                    <img src={post.imageUrl} alt='image'/>
                </div>
                    :
                    <div></div>}
                    <div className="post__main-info">
                        <div className="post__main-info-author">
                            <div style={{display: "flex"}}>
                                <div className="post-avatar">
                                    <img src={post.user.avatarUrl} alt="User"/>
                                </div>
                                <div className="name">
                                    <span>{post.user.fullName}</span>
                                    <span>{post.createdAt}</span>
                                </div>
                            </div>
                            {id === post.user._id && <EditSettings editPost={editPost} id={post._id}
                                           handleTooltipVisibility={handleTooltipVisibility}/>}
                        </div>
                        <div className="post__main-info-title">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="post__main-info-tags">
                            {post.tags.map((item) => <span>#{item}</span> )}
                        </div>
                        <div className="post__main-info-text">
                            <ReactMarkdown children={post.text}
                                           className="markdown"
                                           components={{
                                               code({node, inline, className, children, ...props}) {
                                                   const match = /language-(\w+)/.exec(className || '')
                                                   return !inline && match ? (
                                                       <SyntaxHighlighter
                                                           children={String(children).replace(/\n$/, '')}
                                                           style={nightOwl}
                                                           customStyle={{backgroundColor:"#2c2f48", borderRadius:"15px"}}
                                                           language={match[1]}
                                                           PreTag="div"
                                                           {...props}
                                                       />
                                                   ) : (
                                                       <code className={className} {...props}>
                                                           {children}
                                                       </code>
                                                   )
                                               }
                                           }}
                            />
                        </div>
                        <div className="post__main-info-views">
                            <div className="views">
                                <span><EyeOutlined /></span>
                                <span>{post.viewsCount}</span>
                            </div>
                            <div className="comments">
                                <span><CommentOutlined /></span>
                                <span>{post.commentsCount}</span>
                            </div>
                        </div>
                    </div>
            </div>

            <div className="comments-background">
                <div className="post__comments">
                    <div className="post__comments-explanation">
                    <span>
                       Комментарии
                    </span>
                    </div>
                    {comments?.map((item) =>
                        <Comment
                            key={item._id}
                            item={item}
                            bloggerId={id}
                            getCommentsOfPost={getCommentsOfPost}

                        />)}
                    <SendComment sendComment={sendComment}/>
                </div>
            </div>
        </div>
       </Scrollbar>
    );
};

export default PostFull;