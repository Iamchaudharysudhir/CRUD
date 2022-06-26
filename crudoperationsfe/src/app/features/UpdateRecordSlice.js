import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const objBody={
    id:Number,
    userName:String,
    age:Number
}

export const updateRecord=createAsyncThunk("record/updateRecord", async (objBody)=>{
    return(
        await fetch("https://localhost:7153/api/CrudOperation/UpdateRecord",
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    Id:objBody.id,
                    UserName:objBody.userName,
                    Age:objBody.age
                    })
        }).then(res=>res.json())
        .then(res=>{
            // console.log(res);
            return res;
            
        })
        .catch(err=>err)
    )
} )


const initialState={
    record:[],
    isLoading:false,
    error:null
}

const updateRecordSlice=createSlice({
    name:"record",
    initialState,
    reducers:{
        updateRecord(state,action){
            state.record=action.payload;
        }
    },
    extraReducers:{
        [updateRecord.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [updateRecord.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.record=action.payload;
        },
        [updateRecord.rejected]:(state,action)=>{
            state.isLoading=false;
        }
    }

})

export default updateRecordSlice.reducer;
export const {setRecord}=updateRecordSlice.actions;
