import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h2 className="text-center">Login</h2>
      <form onSubmit={submit}>
        <input className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPass(e.target.value)}/>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
