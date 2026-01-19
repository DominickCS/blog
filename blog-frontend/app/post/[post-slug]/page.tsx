'use client'
import NavigationBar from "@/app/_components/ui/navbar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import HeartSVG from "@/public/heart.svg"
import SaveSVG from "@/public/save.svg"
import Image from "next/image"


export default function BlogPost() {
  const [loading, setLoading] = useState(true)
  const [blogPost, setBlogPost] = useState({})
  const blogPostID = usePathname().split('/')[2]

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts/single", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Authorization: Basic dXNlcjpEb21UaGVEZXYwOTIxMDBA"
          },
          body: JSON.stringify({
            "id": blogPostID
          })
        })

        setBlogPost(await response.json())
      } catch (error) {
        console.error("Error fetching blog post:", error)
      } finally {
        setLoading(false)
      }
    };
    fetchBlogPost();
  }, [blogPostID]);


  console.log(blogPost)

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

                      {/* Replies section */}
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
              </div>
            )}
          </div>
          <h2 className="text-center font-light underline-offset-16 underline">Support This Post</h2>
          <div className="mt-8 flex justify-center text-center">
            <p className="mx-4"><Image src={HeartSVG} width={16} alt="Heart"></Image> {blogPost.blogLikeCount}</p>
            <p className="mx-4"><Image src={SaveSVG} width={16} alt="Save"></Image> {blogPost.blogSaveCount}</p>
          </div>
        </div>
      </div>
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
