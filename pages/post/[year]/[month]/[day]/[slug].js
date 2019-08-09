import Head from "next/head";
import { getPost, getPages } from "../../../../../appUtilities/actions";
import React from "react";
import { formatDate } from "../../../../../appUtilities/utilityFunctions";
import TagList from "../../../../../components/TagList";
import MainLayout from "../../../../../components/MainLayout";
import SeriesStepper from "../../../../../components/SeriesStepper";
import { useRouter } from "next/router";

const Post = props => {
  const router = useRouter();
  return (
    <MainLayout pages={props.pages}>
      <Head>
        <title>Paradox Inversion - {props.post.title}</title>
        <meta
          property="og:title"
          content={`Pradox Inversion - ${props.post.title}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`http://www.paradoxinversion.com${router.asPath}`}
        />
        <meta
          property="og:description"
          content="Home of Fiction, Articles, and Games by Jedai Saboteur"
        />
      </Head>
      <div className="margin--1rem">
        <header>
          <h1 className="post__content__title">{props.post.title}</h1>
          <p className="post__content__date">
            {formatDate(props.post.publishedAt)}
          </p>
          <p className="is-italic">By {props.post.author.displayName}</p>
        </header>

        <hr />
        <div
          className="post__content__html"
          dangerouslySetInnerHTML={{
            __html: props.post.content.extended
          }}
        />
      </div>
      {props.post.series && <SeriesStepper post={props.post} />}
      <div className="post__metadata">
        <hr />
        {/* TODO: make this link to category section search page */}
        {props.post.category && <p>Category: {props.post.category.name}</p>}
        <TagList tags={props.post.tags} />
      </div>
    </MainLayout>
  );
};

Post.getInitialProps = async function({ query }) {
  const [pageData, postData] = await Promise.all([
    getPages(),
    getPost(query.slug)
  ]);
  return {
    pages: pageData.data,
    post: postData.data
  };
};
export default Post;
