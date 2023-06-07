import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { verifyUser } from '../../action';
import { useNavigate } from 'react-router-dom';

const Verify = () => {

    const { user} = useSelector((state)=> state.user)

    const [code,setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(verifyUser(parseInt(code)))
        dispatch({type:'CLEAR_MESSAGE'})
    }
    const handleChange = (e) => {
        setCode(e.target.value)
        console.log(code)
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    })

  return (
    <div>
        <form onSubmit={submitHandler}>
            <label >Enter Verification code</label>
            <input type="text" value={code} onChange={handleChange}/>
            <button type='submit'>Verify</button>
        </form>
    </div>
  )
}

export default Verify