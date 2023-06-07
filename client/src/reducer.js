import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    user:null,
    message :'',
    isVerified :false,
    loading :false,
    
}


const userReducer = createReducer(initialState,(builder)=>{

    builder.addCase('REGISTER_REQUEST',(state,action)=>{
        state.loading = true;

    });
    builder.addCase('REGISTER_SUCCESS',(state,action)=>{
        state.loading = false;
        state.isVerified = true;
        state.user = action.payload.user;
        
    });
    builder.addCase('REGISTER_FAIL',(state,action)=>{
        state.loading = true;
        
    })
  

    builder.addCase('LOGIN_SUCCESS', (state,action)=>{
        state.message = action.payload;
    });
    builder.addCase('VERIFY_REQUEST', (state,action)=>{
        state.user = null;
        state.isVerified = false;
    })
    builder.addCase('VERIFY_SUCCESS', (state,action)=>{
        state.user = action.payload;
        state.isVerified = true
    });
    builder.addCase('VERIFY_FAIL', (state,action)=>{
        state.user = null;
        state.isVerified = false;
    });
    builder.addCase('LOAD_USER_SUCCESS', (state,action)=>{
        
        state.user = action.payload.user;
        state.isVerified = action.payload.success;
    });

    builder.addCase('LOGOUT_SUCCESS', (state,action)=>{
        state.user = null;
    });

    builder.addCase('LOAD_USER_FAIL', (state,action)=>{
        state.user = null;
        state.message = null;
        state.isVerified = false
    })

    builder.addCase('CLEAR_MESSAGE', (state,action)=>{
        state.message = null;
    })    

})

export default userReducer