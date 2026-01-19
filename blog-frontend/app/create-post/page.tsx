'use client'
import { useState } from "react";
import createNewPost from "../_serverActions/blogFunctions/createNewPost";
import NavigationBar from "../_components/ui/navbar";


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

      // Clear tag error if exists
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
      console.log('Post created successfully:', response)

      // Reset form on success
      setFormData({ title: "", body: "" })
      setTags([])
      setErrors({ title: "", body: "", tags: "" })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="max-w-2xl mx-auto mt-8 p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="body" className="block font-medium mb-1">Body</label>
            <textarea
              id="body"
              name="body"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2"
              rows={15}
              value={formData.body}
              onChange={handleChange}
            />
            {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
          </div>

          <div>
            <label htmlFor="postTags" className="block font-medium mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                id="postTags"
                className="flex-1 bg-white border border-gray-300 rounded px-3 py-2"
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
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                type="button"
                onClick={handleTagAdd}
              >
                ADD TAG
              </button>
            </div>
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors font-medium"
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  )
}
