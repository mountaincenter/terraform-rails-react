import React, { useCallback, useState } from "react"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import CancelIcon from "@mui/icons-material/Cancel"

import { createPost } from "../../lib/api/posts"

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
}

interface PostFormProps {
  handleGetPosts: Function
}

const PostForm = ({ handleGetPosts }: PostFormProps) => {
  const [content, setContent] = useState<string>("")
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>("")

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // プレビュー機能
  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("content", content)
    if (image) formData.append("image", image)

    return formData
  }

  const handleCreatePost  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createPost(data)
    .then(() => {
      setContent("")
      setPreview("")
      setImage(undefined)
      handleGetPosts()
    })
  }

  return (
    <>
      <form style={{ display:"flex", flexWrap:"wrap", width: 320}} noValidate onSubmit={handleCreatePost}>
        <TextField
          placeholder="Hello World"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value)
          }}
        />
        <div style={{ marginTop: "10px"}}>
          <label htmlFor="icon-button-file">
            <input style={{ display: "none"}}
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        <div style={{ marginTop: "10px", marginLeft: "auto"}}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!content || content.length > 140}
            sx={{ marginTop: "10px", marginLeft: "auto"}}
          >
            Post
          </Button>
        </div>
      </form>
      { preview ?
        <Box
          sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400", width:320, margin: "2rem 0 4rem"}}
        >
          <IconButton
            color="inherit"
            onClick={() => setPreview("")}
          >
            <CancelIcon />
          </IconButton>
          <img
            src={preview}
            alt="preview img"
            style={{width: "100%"}}
          />
        </Box> : null
      }
    </>
  )
}

export default PostForm