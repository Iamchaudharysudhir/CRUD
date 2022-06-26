import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const objBody={
    userName:String,
    age:Number
}

export const postRecord=createAsyncThunk("record/PostRecord", async (objBody)=>{
    return(
        await fetch("https://localhost:7153/api/CrudOperation/CreateRecord",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
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

const PostSlice=createSlice({
    name:"record",
    initialState,
    reducers:{
        setRecord(state,action){
            state.record=action.payload;
        }
    },
    extraReducers:{
        [postRecord.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [postRecord.fulfilled]:(state,action)=>{
            state.isLoading=false;
            state.record=action.payload;
        },
        [postRecord.rejected]:(state,action)=>{
            state.isLoading=false;
        }
    }

})

export default PostSlice.reducer;
export const {setRecord}=PostSlice.actions;
