import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";
// import { useUserContext } from '../context/AuthContext';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { signIn } = useUserContext();

  // handleSubmit = () => {
  //   const { dispatch } = this.props;
  //   const { email, password } = this.state;

  //   dispatch(loginUser(email, password));
  // };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    navigate("/account");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     await signIn(email, password);
  //     navigate('/account')
  //   } catch (e) {
  //     setError(e.message);
  //     console.log(e.message);
  //   }
  // };

  return (
    <>
      <div className='mx-auto px-4 max-w-md w-full'>
        <h1 className="text-2xl font-bold">Sign In</h1>
        {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="text-secondary">Email</label>
            <div className="my-2 w-full relative rounded-[15px]">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-6 bg-primary border border-accent rounded-[15px]"
                type="email"
              />
              <AiOutlineMail className=" absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary" />
            </div>
          </div>
          <div className="my-4">
            <label className="text-secondary">Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-6 bg-primary border border-accent rounded-[15px]"
                type="password"
              />
              <AiFillLock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary" />
            </div>
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-[15px]">
            Sign in
          </button>
        </form>
        <p className="text-center my-4">
          <span className="text-secondary">Don't have an account?{" "}</span>

          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signin;
