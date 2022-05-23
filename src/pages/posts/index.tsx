import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import { RichText } from 'prismic-dom'
import Link from 'next/link'

type PostProps = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: PostProps[];
}

export default function Posts({ posts }: PostsProps) {
  const Post = (post: PostProps) => (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <time>{post.updatedAt}</time>
        <strong>{post.title}</strong>
        <p>{post.excerpt}</p>
      </a>
    </Link>
  )

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => <Post key={post.slug} {...post} />)}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = getPrismicClient({ previewData })

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })

  const posts = response.map(post => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))

  return {
    props: { posts },
  }
}