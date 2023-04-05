import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export let getMovies=createAsyncThunk('movie/getMovies' ,
async(media)=>{
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${media}/week?api_key=67cf6dbae13ea6866f23d0336f15d01d`)
    return data.results
}
)


let movieSlice=createSlice({
    name:'movie',
    initialState:{movies:[],isLoading :false},
    extraReducers:(b)=>{
        b.addCase(getMovies.fulfilled,(state,action)=>{
            state.movies=action.payload
        })
    }
    
})

export let movieReducer=movieSlice.reducer;

