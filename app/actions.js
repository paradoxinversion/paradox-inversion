import axiosInstance from "./axiosInstance";

export const getPages = async () => {
  const pages = await axiosInstance.get("/pages");
  return pages;
};
export const getStories = async () => {
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
