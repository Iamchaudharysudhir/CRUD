import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRecords=createAsyncThunk("records/getRecords", async()=>{
    return(
        await fetch("https://localhost:7153/api/CrudOperation/ReadRecord",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
            // console.log(res);
            return res;
        })
    )
})

const initialState={
    records:[],
    isLoading:false,
    error:null
}

export const GetRecordsSlice=createSlice({
    name:"records",
    initialState,
    reducers:{
        setRecords(state,action){
            state.records=action.payload;
        }
    },
    extraReducers:{
        [getRecords.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [getRecords.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.records=action.payload;
        },
        [getRecords.rejected]:(state,action)=>{
            state.isLoading=false;
        }
    }
})

export default GetRecordsSlice.reducer;

export const {setRecords}=GetRecordsSlice.actions;
