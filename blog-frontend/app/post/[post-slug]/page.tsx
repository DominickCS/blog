'use client'
import NavigationBar from "@/app/_components/ui/navbar"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import FetchUserDetails from "@/app/_serverActions/(auth)/fetchUserDetails"
import { toast } from "react-toastify"
import { Icon } from "@iconify/react";
import FetchSinglePost from "@/app/_serverActions/(blogFunctions)/fetchSinglePost"
import BlogPostLikeHandler from "@/app/_serverActions/(blogFunctions)/blogPostLikeHandler"
import AddNewComment from "@/app/_serverActions/(blogFunctions)/addNewComment"


export default function BlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [showReplyBox, setShowReplyBox] = useState(false)
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

    }]

  })
  const [userLikeList, setUserLikeList] = useState([])
  const [update, setUpdate] = useState(true)
  const blogPostID = usePathname().split('/')[2]
  const [formData, setFormData] = useState({
    commentBody: "",
  })

  async function handleCommentSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setFormData({ commentBody: "" })
    const response = await AddNewComment(blogPostID, formData.commentBody)
    if (!response.isError) {
      toast.success(`${response.message}`)
    }
    else {
      toast.error(`${response.message}`)
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

  function beginReply() {
    setShowReplyBox(prev => !prev)
  }


  async function likeHandler() {
    const response = await BlogPostLikeHandler(blogPostID)
    if (!response.isError) {
      if (!userLikeList.includes(`${blogPostID}`)) {
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

  if (!loading && blogPost && blogPost.blogTitle) {
    const date = new Date(blogPost.blogPublishDate).toLocaleDateString() + " at " + new Date(blogPost.blogPublishDate).toLocaleTimeString()
    return (
      <div>
        <NavigationBar />
        <div className="bg-white rounded-md max-w-md md:max-w-2xl mx-auto p-8 my-8 border-8 border-black/10 shadow-lg shadow-black/60 dark:shadow-white/60">
          <div className="my-4">
            <h1 className="font-mono font-light">{blogPost.blogPostAuthor.username}</h1>
          </div>
          <div className="flex items-center justify-evenly">
            <h2 className="text-center text-2xl font-sans max-w-sm font-medium mb-4 tracking-tighter">{blogPost.blogTitle}</h2>
          </div>
          <div className="flex text-xs md:text-sm font-light items-center mt-2 justify-evenly">
            {blogPost.blogTags && blogPost.blogTags.map((tag, id) => {
              return <p className="" key={id}>{tag}</p>
            })}
            <p className="">{date}</p>
          </div>
          <hr className="my-4 max-w-lg mx-auto" />
          <div className="mt-2 mb-16">
            <p className="whitespace-pre-wrap">{blogPost.blogBody}</p>
          </div>
          <div className="mb-24">
            <h2 className="text-md font-medium underline-offset-10 underline mb-12">Comments</h2>
            {blogPost.blogComments && blogPost.blogComments.length > 0 ? (
              <div className="my-6">
                <div className="mt-4 mb-8">
                  <form onSubmit={handleCommentSubmission} className="flex justify-between content-center items-center ">
                    <textarea id="commentBody" name="commentBody" onChange={handleChange} className="flex-2" placeholder="Add a comment ..." value={formData.commentBody} />
                    <input type="submit" value={"Add Comment"} className="text-xs max-w-3xs ml-4 border border-black tracking-tighter p-2" />
                  </form>
                  <hr className="my-8" />
                </div>
                {blogPost.blogComments.map((comment) => {
                  return (
                    <div key={comment.commentPublishDate}>
                      <div className="my-8 flex content-center items-center">
                        <div className="mr-6 font-light text-sm tracking-tighter">
                          <p>{comment.commentAuthor.username}</p>
                          <p className="font-light text-xs">
                            {new Date(comment.commentPublishDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex-2 content-center items-center">
                          <p className="text-sm font-normal tracking-tighter">{comment.commentBody}</p>
                          <button onClick={beginReply} className="text-xs font-light">Reply</button>
                          <textarea className={showReplyBox ? "" : "hidden"}></textarea>
                        </div>
                        <div className="text-center text-xs">
                          <p>
                            <Icon icon="material-symbols:favorite"></Icon>
                            {comment.commentLikeCount}
                          </p>
                        </div>
                      </div>

                      {comment.commentReplies && comment.commentReplies.length > 0 && (
                        <div className="ml-8">
                          {comment.commentReplies.map((reply) => (
                            <div key={reply.id} className="my-2">
                              <p className="text-sm font-light">{reply.replyAuthor.username}</p>
                              <p className="text-sm">{reply.replyBody}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="my-6">
                <div className="mt-4 mb-8">
                  <form onSubmit={handleCommentSubmission} className="flex justify-between content-center items-center ">
                    <textarea onChange={handleChange} name="commentBody" id="commentBody" value={formData.commentBody} className="flex-2" placeholder="Add a comment ..." />
                    <input type="submit" value={"Add Comment"} className="text-xs max-w-3xs ml-4 border border-black tracking-tighter p-2" />
                  </form>
                  <hr className="my-8" />
                </div>
                <p>No comments yet... Start a conversation!</p>
              </div>

            )}
          </div>
          <h2 className="text-center font-light underline-offset-16 underline">Support This Post</h2>
          <div className="mt-8 flex justify-center text-center">
            <p className="mx-4"><Icon onClick={likeHandler} className={userLikeList.includes(`${blogPostID}`) ? "invert" : ""} icon="material-symbols:favorite"></Icon>{blogPost.blogLikeCount}</p>
            <p className="mx-4"><Icon icon="material-symbols:bookmark"></Icon> {blogPost.blogSaveCount}</p>
          </div>
        </div>
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
