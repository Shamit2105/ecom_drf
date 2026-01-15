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

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/security_questions/")
      .then((res) => {
        setSecurityQuestions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <select
        name="security_question"
        value={form.security_question}
        onChange={(e) =>
          setForm({ ...form, security_question: e.target.value })
        }
      >
        <option value="">Select a security question</option>

        {securityQuestions.map((q) => (
          <option key={q.key} value={q.key}>
            {q.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SignUp;
