'use client'
import NavigationBar from "@/components/ui/navbar"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import FetchUserDetails from "@/app/_serverActions/(auth)/fetchUserDetails"
import { toast } from "react-toastify"
import { Icon } from "@iconify/react";
import FetchSinglePost from "@/app/_serverActions/(blogFunctions)/fetchSinglePost"
import BlogPostLikeHandler from "@/app/_serverActions/(blogFunctions)/blogPostLikeHandler"
import AddNewComment from "@/app/_serverActions/(blogFunctions)/addNewComment"
import Link from "next/link"
import AddNewReply from "@/app/_serverActions/(blogFunctions)/addNewReply"
import BlogCommentLikeHandler from "@/app/_serverActions/(blogFunctions)/blogCommentLikeHandler"
import BlogReplyLikeHandler from "@/app/_serverActions/(blogFunctions)/blogReplyLikeHandler"
import BlogPostBookmarkHandler from "@/app/_serverActions/(blogFunctions)/blogPostBookmarkHandler"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function BlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const [blogPost, setBlogPost] = useState({
    blogTitle: "",
    blogPublishDate: "",
    blogBody: "",
    blogPostAuthor: {
      username: ""
    },
    blogTags: [],
    blogComments: [{
      id: "",
      commentAuthor: {
        "username": ""
      },
      commentPublishDate: "",
      commentBody: "",
      commentLikeCount: 0,
      commentReplies: [{
        id: "",
        replyLikeCount: 0,
        replyBody: "",
        replyAuthor: {
          username: ""
        },
        replyPublishDate: "",
      }]
    }],
    blogLikeCount: 0,
    blogSaveCount: 0

  })
  const [userLikeList, setUserLikeList] = useState([])
  const [userCommentLikeList, setUserCommentLikeList] = useState([])
  const [userReplyLikeList, setUserReplyLikeList] = useState([])
  const [userBookmarksList, setUserBookmarksList] = useState([])
  const [update, setUpdate] = useState(true)
  const blogPostID = usePathname().split('/')[2]
  const [formData, setFormData] = useState({
    commentBody: "",
    replyBody: ""
  })

  async function handleCommentSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setFormData({ commentBody: "", replyBody: "" })
    const response = await AddNewComment(blogPostID, formData.commentBody)
    if (!response.isError) {
      toast.success(`${response.message}`)
    }
    else {
      toast.error(`${response.message}`)
      router.push('/login')
    }
    setUpdate(prev => !prev)
  }

  async function handleReplySubmission(commentID: string) {
    toggleReply("")
    setFormData({ commentBody: "", replyBody: "" })
    const response = await AddNewReply(commentID, formData.replyBody)
    if (!response.isError) {
      toast.success(`${response.message}`)
    }
    else {
      toast.error(`${response.message}`)
      router.push('/login')
    }
    setUpdate(prev => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await FetchUserDetails()
        setUserLikeList(await response.likedPosts)
        setUserCommentLikeList(await response.likedComments)
        setUserReplyLikeList(await response.likedReplies)
        setUserBookmarksList(await response.savedPosts)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [update]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await FetchSinglePost(blogPostID)
        setBlogPost(response.data)
      } catch (error) {
        toast.error(`Error fetching blog post: ${error}`)
      } finally {
        setLoading(false)
      }
    };

    fetchBlogPost();
  }, [update]);

  function toggleReply(commentId: string) {
    setActiveReplyId(prev => prev === commentId ? null : commentId)
  }

  async function postBookmarkHandler() {
    const response = await BlogPostBookmarkHandler(blogPostID)
    if (!response.isError) {
      if (!userBookmarksList.values().find((post) => blogPostID)) {
        toast.success("Post added to your bookmarks!")
      } else {
        toast.success("Post removed from your bookmarks!")
      }
    }
    else {
      toast.error(`${response.message}`)
      router.push('/login')
    }
    setUpdate(prev => !prev)
  }


  async function postLikeHandler() {
    const response = await BlogPostLikeHandler(blogPostID)
    if (!response.isError) {
      if (!userLikeList.values().find((post) => blogPostID)) {
        toast.success("Post added to your likes!")
      } else {
        toast.success("Post removed from your likes!")
      }
    }
    else {
      toast.error(`${response.message}`)
      router.push('/login')
    }
    setUpdate(prev => !prev)
  }

  async function commentLikeHandler(id: string) {
    const response = await BlogCommentLikeHandler(id)
    if (!response.isError) {
      if (!userCommentLikeList.find((comment) => id)) {
        toast.success("Like success!")
      } else {
        toast.success("Like removed!")
      }
    }
    else {
      toast.error(`${response.message}`)
      router.push('/login')
    }
    setUpdate(prev => !prev)
  }

  async function replyLikeHandler(id: string) {
    const response = await BlogReplyLikeHandler(id)
    if (!response.isError) {
      if (!userReplyLikeList.find((reply) => id)) {
        toast.success(`Like success!`)
      } else {
        toast.success("Like removed!")
      }
    }
    else {
      toast.error(`${response.message}`)
      router.push('/login')
    }
    setUpdate(prev => !prev)
  }

  if (!loading && blogPost && blogPost.blogTitle) {
    const date = new Date(blogPost.blogPublishDate).toLocaleDateString() + " at " + new Date(blogPost.blogPublishDate).toLocaleTimeString()
    return (
      <div>
        <NavigationBar />
        <Card className="bg-white max-w-xs sm:max-w-lg md:max-w-3/4 mx-auto my-8">
          <CardHeader className="flex items-center justify-evenly">
            <CardTitle className="text-center text-3xl mb-4">{blogPost.blogTitle}</CardTitle>
          </CardHeader>
          <CardDescription className="mx-auto text-center">
            {blogPost.blogTags && blogPost.blogTags.map((tag, id) => {
              return <p className="text-purple-300 hover:text-purple-600 duration-300 hover:tracking-widest" key={id}><Link href={`/tag/${String(tag).substring(1).toLowerCase()}`}>{tag}</Link></p>
            })}
            <p className="mt-2 p-2 border-t border-black/20">{date}</p>
          </CardDescription>
          <CardContent className="mt-4 mb-16">
            <p className="whitespace-pre-wrap md:text-lg">{blogPost.blogBody}</p>
          </CardContent>
          <CardContent className="mb-8">
            <CardHeader className="text-md font-medium underline-offset-4 underline">Comments</CardHeader>
            {blogPost.blogComments && blogPost.blogComments.length > 0 ? (
              <CardContent className="my-6">
                <div className="mt-4 mb-8">
                  <form onSubmit={handleCommentSubmission}>
                    <Textarea id="commentBody" name="commentBody" onChange={handleChange} className="mb-4" placeholder="Add a comment ..." value={formData.commentBody} />
                    <Button type="submit" className="text-xs" >Add Comment</Button>
                  </form>
                </div>
                {blogPost.blogComments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <div className="mt-6 flex content-center items-center">
                        <div className="mr-6 font-light text-sm tracking-tighter">
                          <p>{comment.commentAuthor.username}</p>
                          <p className="font-light text-xs">
                            {new Date(comment.commentPublishDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex-2 items-center content-center">
                          <p className="text-xs whitespace-pre-wrap">{comment.commentBody}</p>
                          <button onClick={() => toggleReply(comment.id)} className="text-xs font-light hover:cursor-pointer">Reply</button>
                        </div>

                        <div className="text-center text-xs">
                          <p>
                            <Icon
                              onClick={() => commentLikeHandler(comment.id)}
                              color={userCommentLikeList.includes(comment.id) ? "red" : "currentColor"}
                              className={
                                userCommentLikeList.includes(comment.id)
                                  ? "hover:scale-130 hover:cursor-pointer duration-500"
                                  : "hover:scale-130 hover:cursor-pointer duration-500"
                              }
                              icon="material-symbols:favorite"
                            />
                            {comment.commentLikeCount}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleReplySubmission(comment.id);
                        }} className="flex items-center">
                          <Textarea name="replyBody" id="replyBody" onChange={handleChange} value={formData.replyBody} className={activeReplyId === comment.id ? "text-xs" : "hidden"}></Textarea>
                          <Button type="submit" className={activeReplyId === comment.id ? "ml-2 text-xs w-2/5" : "hidden"} >Add Reply </Button>
                        </form>
                      </div>

                      {
                        comment.commentReplies && comment.commentReplies.length > 0 && (
                          < div className="pl-4 border-l border-black/20">
                            {comment.commentReplies.map((reply) => (
                              <div key={reply.id} className="my-8 flex content-center items-center">
                                <div className="">
                                  <p className="font-light text-sm tracking-tighter">{reply.replyAuthor.username}</p>
                                  <p className="font-light text-xs tracking-tighter">{new Date(reply.replyPublishDate).toLocaleDateString()}</p>
                                </div>
                                <div className="ml-4 flex-2">
                                  <p className="text-xs">{reply.replyBody}</p>
                                </div>
                                <div className="text-center text-xs">
                                  <p>
                                    <Icon
                                      onClick={() => replyLikeHandler(reply.id)}
                                      color={userReplyLikeList.includes(reply.id) ? "red" : "currentColor"}
                                      className={
                                        userReplyLikeList.includes(reply.id)
                                          ? "hover:scale-130 hover:cursor-pointer duration-500"
                                          : "hover:scale-130 hover:cursor-pointer duration-500"
                                      }
                                      icon="material-symbols:favorite"
                                    />
                                    {reply.replyLikeCount}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      }
                    </div>
                  );
                })}
              </CardContent>
            ) : (
              <div className="my-2">
                <div className="mt-4 mb-8">
                  <form onSubmit={handleCommentSubmission}>
                    <Textarea id="commentBody" name="commentBody" onChange={handleChange} className="mb-4" placeholder="Add a comment ..." value={formData.commentBody} />
                    <Button type="submit" className="text-xs" >Add Comment</Button>
                  </form>
                </div>
                <p>No comments yet... Start a conversation!</p>
              </div>

            )}
          </CardContent>
          <h2 className="text-center font-light underline-offset-16 underline">Support This Post</h2>
          <CardFooter className="mt-2 flex justify-center text-center">
            <p className="mx-4">
              <Icon
                onClick={postLikeHandler}
                color={userLikeList.values().find(post => post.blogPostId === blogPostID) ? "red" : "currentColor"}
                className={
                  userLikeList.values().find(post => post.blogPostId === blogPostID)
                    ? "hover:scale-130 hover:cursor-pointer duration-500"
                    : "hover:scale-130 hover:cursor-pointer duration-500"
                }
                icon="material-symbols:favorite"
              />
              {blogPost.blogLikeCount}
            </p>
            <p className="mx-4"><Icon onClick={() => postBookmarkHandler(blogPostID)}
              color={userBookmarksList.values().find(post => post.blogPostId === blogPostID) ? "gold" : "currentColor"}
              className={
                userBookmarksList.values().find((post) => blogPostID)
                  ? "hover:scale-130 hover:cursor-pointer duration-500"
                  : "hover:scale-130 hover:cursor-pointer duration-500"
              } icon="material-symbols:bookmark"></Icon> {blogPost.blogSaveCount}</p>
          </CardFooter>
        </Card >
      </div >
    )
  } else {
    return (
      <>
        <NavigationBar />
        <div className="text-center mt-10">
          <p>LOADING BLOG POST...</p>
        </div>
      </>
    )
  }
}
