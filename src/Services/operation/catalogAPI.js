import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

const { CATEGORY_PAGE_API } = categories;

// Fetch category page details by categoryId
export const getCatalogPageData = async (categoryId) => {
  try {
    const result = await apiConnector("GET", `${CATEGORY_PAGE_API}/${categoryId}`);
    console.log("here is the result from catalogAPI.js", result.data);
    return result.data;
  } catch (error) {
    console.log("Error in catch block of catalogAPI.js", error.message);
  }
};