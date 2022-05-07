import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts, 'check 1')
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>MEDIUM CLONE BY JAYYZZZ</title>
      </Head>
      <Header />
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-yellow-300 ">
        <div className="items-center space-y-9 pt-11  pb-5 sm:pl-5 md:pl-4">
          <h1 className="max-w-xl font-serif text-8xl">Stay curious.</h1>
          <h2 className="max-w-md text-2xl font-normal">
            Discover stories, thinking, and expertise from writers on any topic.
          </h2>
          <h3 className="inline-block rounded-full bg-black px-11 py-2 text-white">
            Start Reading
          </h3>
        </div>
        <div>
          <img
            className="hidden md:inline-flex"
            src="./medium-logo-removebg-preview.png"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug.current}`} key={post._id}>
            <div className="group cursor-pointer overflow-hidden rounded-sm shadow-lg">
              <img
                className="h-60 w-full  rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()}
              />

              <div className="flex items-center justify-between p-2">
                <div>
                  <div className="text-lg font-bold">{post.title}</div>
                  <div className="text-xs">
                    {post.Description} by {post.author.name}
                  </div>
                </div>
                <div>
                  <img
                    className="h-16 w-16 rounded-full"
                    src={urlFor(post.author.image).url()}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  console.log('runnin')

  const query = `*[_type == 'post' ]{
    _id,
    title,
    Description,
    slug,
    mainImage,
    
    author -> {
    name,
    image
  }
  }`

  const posts = await sanityClient.fetch(query)
  console.log(posts)

  return {
    props: {
      posts: posts,
    },
  }
}
