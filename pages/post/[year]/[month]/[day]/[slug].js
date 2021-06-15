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
      <header id="post-header" className="mb-4">
        <h1 className="pi-header--text">{props.post.title}</h1>
        {props.post.author && <p>By {props.post.author.displayName}</p>}
        <p>{formatDate(props.post.publishDate)}</p>
      </header>
      <hr className="mb-8" />
      <div className="flex-grow flex flex-col lg:flex-row">
        {props.post.mainContent ? (
          <div
            id="post-content"
            className="pi-content flex-grow max-w-prose mx-auto"
            dangerouslySetInnerHTML={{
              __html: props.post.mainContent,
            }}
          />
        ) : (
          <main id="post-content" className="pi-content max-w-prose mx-auto">
            <ReactMarkdown source={props.post.markdownContent} />
          </main>
        )}
        {props.post.series && (
          <SeriesStepper
            post={props.post}
            seriesData={props.seriesData.seriesPosts}
          />
        )}
      </div>

      <hr className="my-4" />
      <footer id="post-footer" className="mb-4">
        <div>
          {/* TODO: make this link to category section search page */}
          {props.post.category && (
            <p className="font-bebas text-xl">
              Category: {props.post.category.name}
            </p>
          )}
          {!!props.post.tags.length && <TagList tags={props.post.tags} />}
        </div>
      </footer>
    </MainLayout>
  );
};

Post.getInitialProps = async function ({ query }) {
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
