import { create } from "zustand";
import userSlice from './slices/user.slice.js';
import classSurveySlice from "./slices/classSurveySlice.js";


// Combine all slices in the store:
const useStore = create((...args) => ({
  ...userSlice(...args),
  ...classSurveySlice(...args),
}))


export default useStore;
