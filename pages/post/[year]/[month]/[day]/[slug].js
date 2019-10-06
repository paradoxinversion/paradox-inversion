import Head from "next/head";
import { getPost, getPages } from "../../../../../appUtilities/actions";
import React from "react";
import { formatDate } from "../../../../../appUtilities/utilityFunctions";
import TagList from "../../../../../components/TagList";
import MainLayout from "../../../../../components/MainLayout";
import SeriesStepper from "../../../../../components/SeriesStepper";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const Post = props => {
  const router = useRouter();
  return (
    <MainLayout pages={props.pages}>
      <NextSeo
        title={`Paradox Inversion - ${props.post.title}`}
        description="Home of Fiction, Articles, and Games by Jedai Saboteur"
        openGraph={{
          url: `https://www.paradoxinversion.com${router.asPath}`,
          title: `Paradox Inversion - ${props.post.title}`,
          description: `${props.post.content.socialMediaBrief}`
        }}
      />
      <header id="post-header" className="margin--1rem">
        <h1 className="post__content__title">{props.post.title}</h1>
        <p className="post__content__date">
          {formatDate(props.post.publishedAt)}
        </p>
        {props.post.author && (
          <p className="is-italic">By {props.post.author.displayName}</p>
        )}
      </header>
      <hr />

      <main
        id="post-content"
        className="margin--1rem"
        dangerouslySetInnerHTML={{
          __html: props.post.content.extended
        }}
      />

      {props.post.series && <SeriesStepper post={props.post} />}
      <hr />
      <footer id="post-footer" className="post__metadata">
        <div className="margin--standard">
          {/* TODO: make this link to category section search page */}
          {props.post.category && <p>Category: {props.post.category.name}</p>}
          <TagList tags={props.post.tags} />
        </div>
      </footer>
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
