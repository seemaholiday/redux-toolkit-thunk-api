import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchUserList = createAsyncThunk('fetchUserList', async () => {
      const response = await fetch(`http://localhost:5000/usersGet`)
      return response.json()
    },
)
export const postUserList = createAsyncThunk('postUserList', async (data) => {
    const response = await fetch(`http://localhost:5000/usersPost`, {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    return response.json()
  }
)
export const deleteUserRecord = createAsyncThunk('deleteUserRecord', async (id) => {
    const response = await fetch(`http://localhost:5000/usersDelete/${id}`, {
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.json()
  }
)
export const updateUserRecord = createAsyncThunk('updateUserRecord', async (data) => {
    const response = await fetch(`http://localhost:5000/usersEdit`, {
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    return response.json()
  }
)


const initialState = {
    list: [],
    isLoading:false,
    isError:false,
    postRes:null,
    deleteRes:null,
    updateRes:null
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // Listing of User Data
        builder.addCase(fetchUserList.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(fetchUserList.fulfilled, (state, action)=>{
            state.isLoading= false
            state.list = action.payload
        })
        builder.addCase(fetchUserList.rejected, (state, action)=>{
            state.isError = true 
        })

        // Post api user Data
        builder.addCase(postUserList.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(postUserList.fulfilled, (state, action)=>{
            state.isLoading= false
            state.postRes = action.payload
        })
        builder.addCase(postUserList.rejected, (state, action)=>{
            state.isError = true 
        })

        // Delete api user Data
        builder.addCase(deleteUserRecord.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(deleteUserRecord.fulfilled, (state, action)=>{
            state.isLoading= false
            state.deleteRes = action.payload
        })
        builder.addCase(deleteUserRecord.rejected, (state, action)=>{
            state.isError = true 
        })

        // Update api user data
        builder.addCase(updateUserRecord.pending, (state, action)=>{
            state.isLoading = true
        })
        builder.addCase(updateUserRecord.fulfilled, (state, action)=>{
            state.isLoading= false
            state.updateRes = action.payload
        })
        builder.addCase(updateUserRecord.rejected, (state, action)=>{
            state.isError = true 
        })

    }
  })
  
  export default userSlice.reducer
