import {
  getPost,
  getPages,
  getSeries,
} from "../../../../../appUtilities/actions";
import React from "react";
import { formatDate } from "../../../../../appUtilities/utilityFunctions";
import TagList from "../../../../../components/TagList";
import MainLayout from "../../../../../components/MainLayout";
import SeriesStepper from "../../../../../components/SeriesStepper";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
const Post = (props) => {
  const router = useRouter();
  return (
    <MainLayout pages={props.pages}>
      <NextSeo
        title={`${props.post.title}`}
        description="Home of Fiction, Articles, and Games by Jedai Saboteur"
        openGraph={{
          type: "article",
          url: `https://www.paradoxinversion.com${router.asPath}`,
          title: `${props.post.title}`,
          description: `${props.post.socialMediaBrief}`,
        }}
      />
      <header id="post-header">
        <h1>{props.post.title}</h1>
        <p>{formatDate(props.post.publishDate)}</p>
        {props.post.author && <p>By {props.post.author.displayName}</p>}
      </header>
      <hr />

      {props.post.mainContent ? (
        <main
          id="post-content"
          dangerouslySetInnerHTML={{
            __html: props.post.mainContent,
          }}
        />
      ) : (
        <div id="post-content">
          <ReactMarkdown source={props.post.markdownContent} />
        </div>
      )}

      {props.post.series && (
        <SeriesStepper
          post={props.post}
          seriesData={props.seriesData.seriesPosts}
        />
      )}
      <hr />
      <footer id="post-footer">
        <div>
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
    getPost(query.slug),
  ]);
  let seriesData = [];
  if (postData.series) {
    seriesData = await getSeries(postData.series.url);
  }
  return {
    pages: pageData,
    post: postData,
    seriesData: seriesData,
  };
};
export default Post;
