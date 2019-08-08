import { getPost, getPages } from "../../../../../app/actions";
import React from "react";
import { formatDate } from "../../../../../app/utilityFunctions";
import TagList from "../../../../../app/components/TagList/TagList";
import MainLayout from "../../../../../app/components/MainLayout";

class Post extends React.Component {
  render() {
    return (
      <MainLayout pages={this.props.pages}>
        <div>
          <div className="margin--1rem">
            <header>
              <h1 className="post__content__title">{this.props.post.title}</h1>
              <p className="post__content__date">
                {formatDate(this.props.post.publishedAt)}
              </p>
              <p className="is-italic">
                By {this.props.post.author.displayName}
              </p>
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
        </div>
      </MainLayout>
    );
  }
}

Post.getInitialProps = async function({ query }) {
  const pageData = await getPages();
  const postData = await getPost(query.slug);
  return {
    pages: pageData.data,
    post: postData.data
  };
};
export default Post;
