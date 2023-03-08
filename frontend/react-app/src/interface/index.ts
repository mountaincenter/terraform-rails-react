export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: {
    url: string
  }
  allowPasswordChange: boolean
  createdAt?: any
  updatedAt?: any
}
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