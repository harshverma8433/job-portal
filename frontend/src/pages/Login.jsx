import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { userState } from "../store/atoms";
import { useUserActions } from "../store/userActions";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useRecoilValue(userState);
  const { login, clearAllUserErrors } = useUserActions();
  const navigateTo = useNavigate();

  const handleLogin = useRecoilCallback(() => async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    
    await login(formData);
  });

  useEffect(() => {
    if (error && !isAuthenticated) {
      toast.error(error);
      clearAllUserErrors();
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [error, isAuthenticated, navigateTo, clearAllUserErrors]);

  return (
    <>
    <section className="authPage" style={{ background: '#fff' }}>
        <div className="container login-container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Login as an Employer</option>
                  <option value="Job Seeker">Login as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button className="btn1" type="submit" disabled={loading}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;