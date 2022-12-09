import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Matthew Paul</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Matthew Paul</h1>
          <p>I design software to help people and teams work better together.</p>
        </header>
        <ul className={styles.posts}>
          {posts.map(post => (
            <li key={post.id} className={styles.post}>
              <Link href={`/${post.id}`}>
                <img src={post.cover.file.url} alt={"cover"} />
                <h3 className={styles.postTitle}>
                  {post.properties.Name.title[0].plain_text}
                </h3>
                <p>
                  {post.properties.Description.rich_text[0].plain_text}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
