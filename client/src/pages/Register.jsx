import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [userName, setuserName] = useState('')
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')

  const [error, seterror] = useState(false)
  const [alertMsg, setalertMsg] = useState("")
  const [alertType, setalertTupe] = useState("error")


  const [open, setOpen] = useState(true);

  const navigate=useNavigate();


  async function senddata(e) {
    e.preventDefault()

    console.log(userName);
    console.log(email);
    console.log(pass);

    if (!email || !pass || !userName) {
      seterror(true)
      setalertMsg("Please fill all the fields")
      setOpen(true)
      // alert("Please fill all the fields");
    } else {
      try {
        const response = await axios.post('http://localhost:3006/register', {
          username: userName,
          email: email,
          pwd: pass
        });



        if (response.data == "User added successfully") {
          setalertTupe("success")
          setTimeout(()=>navigate('/login'),2000)
          

        } else {
          setalertTupe("error")
        }




        seterror(true)
        setalertMsg(response.data)
        setOpen(true)




        // alert(response.data);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.errors[0].msg);

          seterror(true)
          setalertMsg(error.response.data.errors[0].msg)
          setalertTupe("error")
          setOpen(true)

          // alert(error.response.data.errors[0].msg);
        } else if (error.response) {
          alert(`Error ${error.response.status}: ${error.response.statusText}`);
        } else {
          console.error(error);
          alert('An unexpected error occurred');
        }
      }
    }
  }



  return (
    < div className="apx">
      <div className='Alert'>
        <Box sx={{ width: '100%' }}>
          <Collapse in={open}>
            {alertMsg && <Alert severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertMsg}
            </Alert>
            }
          </Collapse>

        </Box>
      </div>
      <div className="container">
        <div className="community-panel">
          <div className="Logo-title">
            <div className="Logo" />
            <h1>Share A Meal</h1>
          </div>
          <div className="Pic" />
          <div className="welcome">
            Welcome back to the
            <br />
            Share a meal Community
          </div>
          <p>
            Share A Meal connects donors with those in need, making it easy to fight
            hunger. With just a few clicks, you can provide a meal and make a
            difference!
          </p>
        </div>
        <div className="login-panel">
          <div className="social-login">
            <button className="social-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Google
            </button>
            <button className="social-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Github
            </button>
          </div>
          <div className="divider">or</div>
          <form onSubmit={(e) => {senddata(e) }}>
            <div className="form-group">
              <input type="text" placeholder="username" required="" onChange={(e) => { setuserName(e.target.value) }} value={userName} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Email" required="" onChange={(e) => { setemail(e.target.value) }} value={email} />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" required="" onChange={(e) => { setpass(e.target.value) }} value={pass} />
            </div>
            <button type="submit" className="login-btn">
              SIGN UP
            </button>
          </form>
          <div className="signup-link">
            already have an Account? <a href="/login"> LOG IN</a>
          </div>
          {/* <div className="checkbox-container">
              <input type="checkbox" required="" />
              <label>I accept the terms &amp; conditions</label>
            </div> */}
        </div>
      </div>

    </div>
  )
}

export default Register