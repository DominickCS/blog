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


export default function BlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
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
            <h2 className="text-center text-xl max-w-sm font-medium mb-4 tracking-tighter">{blogPost.blogTitle}</h2>
          </div>
          <hr className="mb-4 max-w-lg mx-auto" />
          <div className="flex text-xs md:text-sm font-light items-center mt-2 justify-evenly">
            {blogPost.blogTags && blogPost.blogTags.map((tag, id) => {
              return <p className="" key={id}>{tag}</p>
            })}
            <p className="">{date}</p>
          </div>
          <div className="my-10">
            <p className="whitespace-pre-wrap">{blogPost.blogBody}</p>
            <hr className="my-6 max-w-xs mx-auto" />
          </div>
          <div className="mb-24">
            <h2 className="text-xl font-medium underline-offset-10 underline">Comments</h2>
            {blogPost.blogComments && blogPost.blogComments.length > 0 ? (
              <div className="my-6">
                {blogPost.blogComments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <div className="my-2 flex content-center">
                        <div className="flex">
                          <div className="flex items-center">
                            <div>
                              <p className="font-light mr-4 text-sm tracking-tighter">
                                {comment.commentAuthor.username}
                              </p>
                              <p className="font-light text-xs">
                                {new Date(comment.commentPublishDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-normal">{comment.commentBody}</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="mx-4">
                              <Image src={HeartSVG} width={16} alt="Heart"></Image> {comment.commentLikeCount}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <form className=" flex content-center items-center ">
                          <textarea placeholder="Add a comment ..." />
                          <input type="submit" value={"Add Comment"} className="text-xs max-w-3xs ml-4 border border-black tracking-tighter p-2" />
                        </form>
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
                <p>No comments yet... Start a conversation!</p>
                <div className="mt-4">
                  <form className=" flex content-center items-center ">
                    <textarea placeholder="Add a comment ..." />
                    <input type="submit" value={"Add Comment"} className="text-xs max-w-3xs ml-4 border border-black tracking-tighter p-2" />
                  </form>
                </div>

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
