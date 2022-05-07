import { sanityClient, urlFor } from '../../sanity'
import { Comment, Post } from '../../typings'
import Header from '../../components/header'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
interface Props {
  posts: Post
}

interface Iforms {
  _id: string
  name: string
  email: string
  comment: string
}
export default function Posts(props: Props) {
  const [submited, setsubmited] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iforms>()
  const onSubmit: SubmitHandler<Iforms> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data)
        console.log('submit', submited)
        setsubmited(true)
      })
      .catch((error) => {
        console.log(error)
        setsubmited(false)
      })
  }
  const posts = props.posts
  // console.log(posts.comments, 'chekinnnn')
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <img
        className="h-40 w-full object-cover"
        src={urlFor(posts.mainImage).url()}
      />
      <article className="mx-auto max-w-4xl space-y-2 py-8">
        <div className="font-serif text-4xl">{posts.title}</div>
        <div className="bg-gray-50 text-xl font-light">{posts.Description}</div>
        <div className="flex items-center space-x-2 pt-3">
          <img
            className="h-12 w-12 rounded-full"
            transition-style="in:circle:center"
            src={urlFor(posts.author.image).url()}
          />
          <div>
            By {posts.author.name} Published on{' '}
            {new Date(posts._createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="py-6">
          <PortableText
            dataset="production"
            projectId="gmsvszje"
            content={posts.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="mx-auto h-0.5 max-w-4xl space-y-2 bg-slate-400" />
      <div className="">
        {submited ? (
          <div
            transition-style="in:wipe:up"
            className="mx-auto my-7  flex max-w-4xl justify-center space-y-4 bg-green-400 py-28"
          >
            <div
              transition-style="in:wipe:up"
              className="font-mono text-4xl text-white"
            >
              Thank you for your Submission
            </div>
          </div>
        ) : (
          <form
            className="my-10 mx-auto flex max-w-2xl flex-col space-y-9 p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-sans text-2xl">
              LEAVE A COMMENT .. .. .. 😁😁
            </h1>
            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={posts._id}
            />
            <label className=" flex flex-col space-y-2">
              <span className="font-mono text-xl">Name</span>
              <input
                {...register('name', { required: true })}
                className="p-5 shadow-md outline-none"
                placeholder="Whats your name"
                type="text"
              />
            </label>
            <label className=" flex flex-col space-y-2">
              <span className="font-mono text-xl">Email</span>
              <input
                {...register('email', { required: true })}
                className="p-5 shadow-md outline-none"
                placeholder="Email please"
                type="text"
              />
            </label>
            <label className=" flex flex-col space-y-2">
              <span className="font-mono text-xl">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="p-5 shadow-xl outline-none"
                placeholder="Tell world how this article makes you feel"
                rows={8}
              />
            </label>
            <div className="flex flex-col">
              {errors.name && (
                <span className="text-red-500">The Name Feild is Required</span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  The Email Feild is Required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  The Comment text is Required
                </span>
              )}
            </div>
            <label>
              <span></span>
              <button
                type="submit"
                className="rounded-md bg-green-400 px-6 py-3 shadow-md outline-none hover:bg-green-300 focus:shadow-xl"
              >
                submit
              </button>
            </label>
          </form>
        )}
      </div>
      <div className="mx-auto max-w-4xl space-y-2 py-8 shadow-2xl">
        <div className="border-b-2 p-4  text-3xl font-semibold">
          Comments On this Article
        </div>
        <div className="space-y-8">
          {posts.comments.map((comment: Comment) => (
            <div className="rounded-md py-4 px-2 shadow-md">
              <div className="flex items-center space-x-4 text-lg font-normal">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  {comment.name} ·{' '}
                  {new Date(comment._updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="pl-16">{comment.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const query = `*[_type == 'post' ]{
    _id,
    slug,
  }`
  const posts = await sanityClient.fetch(query)
  //   console.log('post')
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }))
  //   console.log(paths, posts, 'checkin - 2')
  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  //   console.log(params, 'pleaseeee')
  const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        slug,
        _createdAt,
        title,
        'comments' : *[_type == 'comment' && post._ref == ^._id],
        author -> {
        name,
        image
      },
      Description,
      mainImage,
      body
      }`
  const posts = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  // console.log(posts.comment, 'dattaaa')

  if (!posts) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}
