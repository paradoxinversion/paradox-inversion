import axiosInstance from "./axiosInstance";

export const getPages = async () => {
  const query = `
  query{
    allPages{
      id
      title
      url
      isIndex
    }
  }
  `;
  const pages = await axiosInstance.post("/admin/api", {
    query
  });
  return pages.data.data.allPages;
};

export const getPage = async slug => {
  const query = `
  query{
    allPages(where:{url:"${slug}"}){
      id
      title
      url
      isIndex
      content
    }
  }
  `;
  const pages = await axiosInstance.post("/admin/api", {
    query
  });
  return pages.data.data.allPages[0];
};

export const getHomePage = async pagesArray => {
  const homePageId = pagesArray.find(page => page.title === "Home").id;
  const query = `
  query {
    Page(where: {id: "${homePageId}"}) {
      id
      url
      title
      socialMediaBrief
      content
    }
  }
  `;
  const homePage = await axiosInstance.post("/admin/api", { query });
  return homePage.data.data.Page;
};
export const getPost = async slug => {
  const query = `
  query{
    allPosts(where: {url: "${slug}"}) {
      id
      title
      brief
      publishDate
      url
      socialMediaBrief
      tags{tag id}
      mainContent
    }
  }
  `;
  const post = await axiosInstance.post(`/admin/api`, { query });
  return post.data.data.allPosts[0];
};

export const queryPosts = async (searchType, query) => {
  if (searchType === "all") {
    return await getAllPosts();
  }

  if (searchType === "tagged") {
    return await getTaggedPosts(query);
  }

  if (searchType === "page") {
    return await getPagePosts(query);
  }
};

export const getAllPosts = async () => {
  const query = `
  query {
    allPosts(where:{state: published}) {
      id
      title
      brief
      publishDate
      url
    }
  }
  `;

  const postData = await axiosInstance.post(`/admin/api`, { query });
  return postData.data.data.allPosts;
};

export const getTaggedPosts = async searchQuery => {
  const query = `
  query {
    allTags(where:{ tag: "${searchQuery}" }) {
      id
      tag
      posts (where:{state: published}){
        id
        title
        brief
        publishDate
        url
      }
    }
  }
  `;
  const taggedPosts = await axiosInstance.post(`/admin/api`, { query });
  return taggedPosts.data.data.allTags[0].posts;
};

export const getPagePosts = async searchQuery => {
  const query = `
  query {
    allPosts(where: { page: { title: "${searchQuery}" } }) {
      id
      title
      brief
      publishDate
      url
    }
  }
  `;
  const pagePosts = await axiosInstance.post(`/admin/api`, { query });
  console.log(pagePosts.data.data.allPosts);
  return pagePosts.data.data.allPosts;
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
  return postArray.sort((a, b) => a.seriesOrder - b.seriesOrder);
};
