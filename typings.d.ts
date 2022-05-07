export interface Post {
  _id: string
  title: string
  Description: string
  _createdAt: string
  slug: { current: string }
  comments: Comment[]
  author: {
    name: string
    image: string
  }
  mainImage: {
    asset: {
      url: string
    }
  }
  body: [object]
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}
