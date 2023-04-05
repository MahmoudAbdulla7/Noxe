import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./moviesTrending";


let store=configureStore({
    reducer:{
        movie:movieReducer
    }
})

export default store ;