import React, { useState } from "react"

import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import { Post } from "../../interface/index"
import { deletePost } from "../../lib/api/posts"
import { formatDistance, format } from "date-fns"
import { ja } from "date-fns/locale"

interface PostItemProps {
  post: Post
  handleGetPosts: Function
}

const PostItem = ({ post, handleGetPosts }: PostItemProps) => {
  const [like, setLike] = useState<boolean>(false)

  const handleDeletePost = async (id: string) => {
    await deletePost(id)
    .then(() => {
      handleGetPosts()
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              A
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.user.name}
          subheader={formatDistance(new Date(), Date.parse(post.createdAt), {locale:ja})}
        />
        { post.image?.url ?
          <CardMedia
            component="img"
            src={post.image.url}
            alt="post image"
          /> : null
        }
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            { post.content.split("\n").map((content: string, index: number) => {
                return (
                  <p key={index}>{content}</p>
                )
              })
            }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => like ? setLike(false) : setLike(true)}>
            { like ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <div style={{marginLeft: "auto"}}>
            <IconButton
              onClick={() => handleDeletePost(post.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </>
  )
}

export default PostItem