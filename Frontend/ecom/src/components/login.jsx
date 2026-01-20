import axios from "axios";
import { useState } from "react";


function Login()
{
    const [form,setForm] = useState(
        {
            username:"",
            password:"",
        }
    );  

    const handleChange = (e) =>
    {
        setForm({...form,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try
        {
            const res = await axios.post("http://localhost:8000/users/login/",form);

            localStorage.setItem("access",res.data.access);
            localStorage.setItem("refresh",res.data.refresh);
        }
        catch (err)
        {
            console.log("Error logging in");
            console.log(err);
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} />
                <input name="password" className="password" placeholder="Password" onChange={handleChange} />
                <button name="submit">Submit</button>
            </form>
        </div>
    )
}
export default Login;