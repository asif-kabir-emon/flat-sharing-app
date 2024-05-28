import { baseApi } from "./api/baseApi";
import flatFilterReducer from "./slice/flatFilterSlice";

export const reducer = {
    flat: flatFilterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};
