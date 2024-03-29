import React from 'react';
import {PostType} from "typings";
import {PostSkeleton} from "components/Skeletons";
import { PostShorten } from '..';



type PropsType = {
    posts:Array<PostType>
    id:string | boolean | null
    isFetching: boolean
}
export const PostList:React.FC<PropsType> = ({posts,id, isFetching}) => {

    const SkeletonArray = Array.from({length: 2}).map((_,index) => <PostSkeleton key={'skeleton' + index}/>)

    if(!posts.length) return <PostSkeleton />

    return (
    <>
            {isFetching ?
                SkeletonArray
                : posts.map((item) => <PostShorten
                key={item._id}
                id={item._id}
                imageUrl={item.imageUrl}
                title={item.title}
                tags={item.tags}
                text={item.text}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                isEditable={item.user._id === id}
                />)}
    </>
    );
};

