import axiosInstance from "./axiosInstance";

export const getPages = async () => {
  const pages = await axiosInstance.get("/pages");
  return pages;
};

export const getPost = async slug => {
  const post = await axiosInstance.get(`/post?slug=${slug}`);
  return post;
};

export const queryPosts = async (searchType, query) => {
  const postData = await axiosInstance(
    `/posts?searchType=${searchType}&query=${query}`
  );
  return postData;
};

export const getSeries = async slug => {
  const seriesData = await axiosInstance(`/series?query=${slug}`);
  return seriesData;
};

/**
 * Return an array of posts sorted by when they are published.
 * @param {Array} postArray
 * @returns {Array} Posts sorted by the time they were published
 */
export const sortPostsByDateTime = postArray => {
  return postArray.sort(
    (a, b) =>
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
};

/**
 * Return an array of posts sorted by their series order number.
 * @param {Array} postArray
 * @returns {Array} Posts sorted by series order number
 */
export const sortPostBySeriesOrder = postArray => {
  console.log("sort");
  return postArray.sort((a, b) => a.seriesOrder - b.seriesOrder);
};
