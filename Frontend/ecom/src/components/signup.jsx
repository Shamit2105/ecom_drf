import { useState, useEffect } from "react";
import axios from "axios";

function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phno: "",
    security_question: "",
    security_answer: "",
    user_type: "",
  });

  

  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [userType,setUserType]=useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/security_questions/")
      .then((res) => {
        setSecurityQuestions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);


  useEffect(()=>{
    axios
      .get("http://localhost:8000/users/user_type/")
      .then((res)=>{
        setUserType(res.data);
      })
      .catch((error)=>console.error(error));
  },[]);


  async function handleSubmit(e)
  {
    e.preventDefault();

    try{
      await axios.post("http://localhost:8000/users/signup/",
        form
      );

      const loginres = await axios.post("http://localhost:8000/users/login/",
        {
          username:form.username,
          password:form.password 
        }
      );

      localStorage.setItem("access",loginres.data.access);
      localStorage.setItem("refresh",loginres.data.refresh);


    }
    catch (err) {
      if(err.response &&err.response.data)
      {
        console.error(err);
      }
      else
          console.error("Server error");
    }
  }
  

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username"
          placeholder="Username"
          value = {form.username}
          onChange={handleChange}
        />
        <input name="password"
          type="password"
          placeholder="Password"
          value = {form.password}
          onChange={handleChange}
        />
        <input name="first_name"
          placeholder="First Name"
          value = {form.first_name}
          onChange={handleChange}
        />
        <input name="lass_name"
          placeholder="Last Name"
          value = {form.last_name}
          onChange={handleChange}
        />
        <input name="phno"
          placeholder="Phone Number"
          value = {form.phno}
          onChange={handleChange}
        />
        <select
          name="security_question"
          value={form.security_question}
          onChange={handleChange}
          >
          <option value="">Select a security question</option>

          {securityQuestions.map((q) => (
            <option key={q.key} value={q.key}>
              {q.label}
            </option>
          ))}
        </select>
        <input
          name="security_answer"
          placeholder="Security Answer"
          value={form.security_answer}
          onChange={handleChange}
        />
        <select 
          name="user_type"
          value={form.user_type}
          onChange={handleChange}
          >
          <option value="">Select User Type</option>

          {userType.map((q)=>(
            <option key={q.key} value={q.key}>
              {q.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default SignUp;
