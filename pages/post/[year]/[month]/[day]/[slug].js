import { getPost, getPages } from "../../../../../appUtilities/actions";
import React from "react";
import { formatDate } from "../../../../../appUtilities/utilityFunctions";
import TagList from "../../../../../components/TagList";
import MainLayout from "../../../../../components/MainLayout";
import SeriesStepper from "../../../../../components/SeriesStepper";

class Post extends React.Component {
  render() {
    return (
      <MainLayout pages={this.props.pages}>
        <div className="margin--1rem">
          <header>
            <h1 className="post__content__title">{this.props.post.title}</h1>
            <p className="post__content__date">
              {formatDate(this.props.post.publishedAt)}
            </p>
            <p className="is-italic">By {this.props.post.author.displayName}</p>
          </header>

          <hr />
          <div
            className="post__content__html"
            dangerouslySetInnerHTML={{
              __html: this.props.post.content.extended
            }}
          />
        </div>
        {this.props.post.series && <SeriesStepper post={this.props.post} />}
        <div className="post__metadata">
          <hr />
          {/* TODO: make this link to category section search page */}
          {this.props.post.category && (
            <p>Category: {this.props.post.category.name}</p>
          )}
          <TagList tags={this.props.post.tags} />
        </div>
      </MainLayout>
    );
  }
}

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
