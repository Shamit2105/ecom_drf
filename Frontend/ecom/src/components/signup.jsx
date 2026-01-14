import { useState,useEffect } from "react";
import axios from "axios"

function SignUp()
{
    const [form,setForm] = useState(
        {
            username:"",
            password:"",
            first_name:"",
            last_name:"",
            phone_no:"",
            security_question:"",
            security_answer:"",
            user_type:"",
        }
    );
    useEffect(()=>{
        axios.get("http://localhost:8000/users/security_questions/").then(res)
    },[])
}

export default SignUp