import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialRegister from './SocialRegister';

const Register = () => {
    // for create user
    const {createUser, UpdateUser}=useContext(AuthContext)

    // navigate kora
    const navigate =useNavigate();
    const location =useLocation()
    const from = location.state || "/"

    // show pass
    const[showPassword, setShowPassword]=useState(false);
    //
    const [error, setError] = useState('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const handelRegister=e=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email =e.target.email.value;
        const pass = e.target.password.value;
        const photo = e.target.photo.value;
        console.log(name,email,pass,photo);

        if (!passwordRegex.test(pass)) {
        setError("Password must contain at least one uppercase letter, one lowercase letter, and be at least 8 characters long.");
        return;
        }

        // for create new user
        createUser(email, pass).then(result=>{
            console.log(result);
            toast.success("Successfully Registered", { duration: 3000 });
            navigate("/")

          UpdateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("Profile updated!");
            navigate(from);
          })
          .catch(err => console.error("Profile update failed:", err));
        }).catch(error=>{
            toast.error(error.message || "Failed to Register", { duration: 4000 });

        })
    }
    return (
        <div>
            <div className="hero w-full mt-24">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card w-full  md:w-[400px] shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Register Now!</h1>
        {/* form section */}
        <form onSubmit={handelRegister}>
          <fieldset className="fieldset">
          {/* name input */}
          <label className="label">Name</label>
          <input type="text" name="name" className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" required/>

          {/* email section */}
          <label className="label">Email</label>
          <input type="email" name='email' className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Email" required />

          {/* photo url input */}
          <label className="label">Photo URL</label>
          <input type="text" name="photo" placeholder="Enter your photo URL" className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required/>

          {/* password section */}
          <label className="label">Password</label>
          <div className='relative'>
            <input type={showPassword? 'text': "password"} name='password' className="input w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Your Password" required/>
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute mt-4 -ml-6">
                {showPassword? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
            {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
          </div>
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4 text-white bg-blue-500 hover:bg-blue-700 border-0">Register</button>

          {/* register with gmail */}
          <SocialRegister from={from}></SocialRegister>
          
          
          <div className="text-center text-sm mt-3 text-gray-600">
            <Link to="/login" className='mt-3'>Do you have an account? <span className='text-red-500 underline'>Login</span></Link>
          </div>

        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;