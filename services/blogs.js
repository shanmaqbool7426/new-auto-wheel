import { fetchAPI } from "./fetchAPI";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

export const fetchBlogsPageData = async (params) => {
  try {
    const path =
      Array.isArray(params?.slug) && params.slug.length > 0
        ? params.slug.map((item) => item).join("/")
        : "";
        console.log('mmmmmmmmmmmm',path);
    const blogs = await fetchAPI(`${API_ENDPOINTS.BLOGS.LIST}${path}`);
    return blogs;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      blogs: [],
    };
  }
};
