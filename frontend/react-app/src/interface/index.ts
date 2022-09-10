export interface Blog {
  id: string
  title: string
  contents: string
  image?: {
    url: string
  }
  created_at?: any
}

export interface BlogApiJson {
  blogs: Blog[]
}

export interface Post {
  id: string
  content: string
  image?: {
    url: string
  }
  user: {
    id: number,
    name: string
    email: string
  }
  createdAt?: any
}

export interface PostApiJson {
  posts: Post[]
}