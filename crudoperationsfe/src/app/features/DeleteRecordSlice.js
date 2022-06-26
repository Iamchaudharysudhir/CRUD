import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const deleteRecord=createAsyncThunk("delete/deleteRecord", async(id)=>{
    return(
        (console.log(id)),
        await fetch("https://localhost:7153/api/CrudOperation/DeleteRecord",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Id:id
            })
        }).then(res=>res.json())
        .then(res=>{
            console.log(res);
            return res;
        }).catch(err=>err)
    )
}
)

const initialState={
    record:[],
    isLoading:false,
    error:null
}

export const DeleteRecordSlice=createSlice({
    name:"delete",
    initialState,
    reducers:{
        setDeleteRecord(state,action){
            state.record=action.payload;
        }
    },
    extraReducers:{
        [deleteRecord.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [deleteRecord.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.record=action.payload;
        },
        [deleteRecord.rejected]:(state,action)=>{
            state.isLoading=false;
        }
    }
})

export default DeleteRecordSlice.reducer;

export const {setDeleteRecord}=DeleteRecordSlice.actions;