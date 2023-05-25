import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
  posts: []
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch(setPosts(res.data))
  }
)

export const deletePostById = createAsyncThunk(
  'posts/deletePostById',
  async (id, { rejectWithValue, dispatch }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    dispatch(deletePost(id))

  }
)

export const postSLice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload)
    }
  },
  extraReducers: {
    [getPosts.fulfilled]: () => console.log('sdf'),
    [getPosts.pending]: () => console.log('sdf'),
    [getPosts.rejected]: () => console.log('sdf'),
    [deletePostById.fulfilled]: () => console.log('deletesdf'),
    [deletePostById.pending]: () => console.log('dsdf'),
    [deletePostById.rejected]: () => console.log('dsdf')
  }
})

export const { setPosts, deletePost } = postSLice.actions
export default postSLice.reducer