'use client'
import { useState } from "react";
import createNewPost from "@/app/_serverActions/(blogFunctions)/createNewPost";
import NavigationBar from "@/components/ui/navbar";
import { toast } from "react-toastify";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState({
    title: "",
    body: "",
    tags: ""
  })
  const [formData, setFormData] = useState({
    title: "",
    body: ""
  })

  const validateForm = () => {
    const newErrors = {
      title: "",
      body: "",
      tags: ""
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title cannot be empty"
    }
    if (!formData.body.trim()) {
      newErrors.body = 'Body cannot be empty';
    }
    if (tags.length === 0) {
      newErrors.tags = "You must include at least one tag"
    }

    setErrors(newErrors);
    return newErrors.title.length === 0 && newErrors.body.length === 0 && newErrors.tags.length === 0
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  function handleTagAdd() {
    if (tagInput.trim()) {
      const tagWithHash = tagInput.startsWith('#') ? tagInput : `#${tagInput}`
      setTags(prev => [...prev, tagWithHash])
      setTagInput("")

      if (errors.tags) {
        setErrors(prev => ({ ...prev, tags: '' }));
      }
    }
  }

  function removeTag(index: number) {
    setTags(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await createNewPost(formData.title, formData.body, tags)
      if (!response.isError) {
        toast.success(`${response.message}`)
      }
      else {
        if (response.message.includes("401")) {
          toast.error(`You are not authorized to create blog posts, request access by contacting an admin.`)
        }
        else {
          toast.error(`${response.message}`)
        }
      }

      setFormData({ title: "", body: "" })
      setTags([])
      setErrors({ title: "", body: "", tags: "" })
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <Card className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto mt-8 p-6">
        <CardTitle className="text-3xl font-bold mb-6">Create New Post</CardTitle>

        <CardContent className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="title" className="block font-medium mb-1">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              className="py-2"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="body" className="block font-medium mb-1">Body</Label>
            <Textarea
              id="body"
              name="body"
              className=""
              rows={15}
              value={formData.body}
              onChange={handleChange}
            />
            {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
          </div>

          <div>
            <Label htmlFor="postTags" className="block font-medium mb-1">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                id="postTags"
                className=""
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleTagAdd()
                  }
                }}
                placeholder="Enter a tag"
              />
              <Button
                className=""
                type="button"
                onClick={handleTagAdd}
              >
                ADD TAG
              </Button>
            </div>
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-violet-400 text-white text-sm font-bold px-4 py-2 rounded flex items-center gap-2"
                >
                  {tag}
                  <Button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-white text-xs hover:text-red-500 hover:cursor-pointer"
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="p-8"
          >
            Submit Post
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
