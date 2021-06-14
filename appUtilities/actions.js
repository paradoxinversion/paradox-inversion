import axiosInstance from "./axiosInstance";

/**
 * Get all pages. The user will only see pages that are not
 * 'published' if they are logged in due to access control.
 */
export const getPages = async () => {
  const query = `
  query{
    allPages{
      id
      title
      url
      shownInNav
      
    }
  }
  `;
  const pages = await axiosInstance.post("/admin/api", {
    query,
  });
  return pages.data.data.allPages;
};

/**
 * Get a specific page by URL. If the page is not published and
 * the user is not logged in, will return undefined causing an
 * error
 * @param {String} slug - The slugified URL of the page
 */
export const getPage = async (slug) => {
  const query = `
  query{
    allPages(where:{url:"${slug}"}){
      id
      title
      url
      content
      shownInNav
      socialMediaBrief
      pageType
    }
  }
  `;
  const pages = await axiosInstance.post("/admin/api", {
    query,
  });
  return pages.data.data.allPages[0];
};

/**
 * Gets the Home page from the array of pages
 * @param {Array} pagesArray - All available pages
 */
export const getHomePage = async (pagesArray) => {
  const homePageId = pagesArray.find((page) => page.title === "Home").id;
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

/**
 * Gets a single post if it's been published or the user
 * is logged in.
 * @param {*} slug - The slugified title of the post
 */
export const getPost = async (slug) => {
  const query = `
  query{
    allPosts(where: {url: "${slug}"}) {
      id
      title
      brief
      publishDate
      url
      socialMediaBrief
      tags { 
        tag 
        id 
      }
      mainContent
      markdownContent
      author { 
        displayName 
      }
      category {
        name
      }
      seriesOrder
      series{
        url
      }
    }
  }
  `;
  const post = await axiosInstance.post(`/admin/api`, { query });
  return post.data.data.allPosts[0];
};

/**
 * Gets posts depending on a search type and query--
 * This is for searching for posts associated with
 * pages, tags, categories, etc.
 * @param {*} searchType
 * @param {*} query
 */
export const queryPosts = async (searchType, query) => {
  // ! Need Category Search
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

/**
 * Gets pubblished posts associated with the tag matching
 * the search query.
 * @param {*} searchQuery - The tag to search
 */
export const getTaggedPosts = async (searchQuery) => {
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

/**
 * Gets published posts associated with a page
 * @param {String} searchQuery - The page url slug
 */
export const getPagePosts = async (searchQuery) => {
  const query = `
  query {
    allPosts(where: { page: { url: "${searchQuery}" } }) {
      id
      title
      brief
      publishDate
      url
    }
  }
  `;
  const pagePosts = await axiosInstance.post(`/admin/api`, { query });
  return pagePosts.data.data.allPosts;
};

export const getSeries = async (slug) => {
  const query = `
  query {
    allSerials(where: {url: "${slug}"}){
      seriesPosts(orderBy: "seriesOrder"){
        id
        seriesOrder
        url
        publishDate
        title
      }
    }
  }
  `;
  const series = await axiosInstance.post("/admin/api", { query });
  return series.data.data.allSerials[0];
};

export const getPreviousSerialPartData = (serialPost, serialsArray) => {
  if (serialPost.seriesOrder !== 1) {
    const index = serialsArray.findIndex(
      (post) => post.seriesOrder == serialPost.seriesOrder
    );
    if (index > -1) {
      return serialsArray[index - 1];
    }
  }
};
export const getNextSerialPartData = (serialPost, serialsArray) => {
  if (serialPost.seriesOrder < serialsArray.length) {
    const index = serialsArray.findIndex(
      (post) => post.seriesOrder == serialPost.seriesOrder
    );
    if (index > -1) {
      return serialsArray[index + 1];
    }
  }
};

/**
 * Return an array of posts sorted by when they are published.
 * @param {Array} postArray
 * @returns {Array} Posts sorted by the time they were published
 */
export const sortPostsByDateTime = (postArray) => {
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
export const sortPostBySeriesOrder = (postArray) => {
  return postArray.sort((a, b) => a.seriesOrder - b.seriesOrder);
};
