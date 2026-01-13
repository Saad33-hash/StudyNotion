import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

const { COURSE_DETAILS_API } = categories;

export const getCourseDetails = async (courseId) => {
  try {
    const result = await apiConnector("GET", `${COURSE_DETAILS_API}/${courseId}`);
    console.log("Course details response:", result.data);
    return result.data;
  } catch (error) {
    console.log("Error in getCourseDetails:", error.message);
    return null;
  }
};