// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { useAuth } from "../src/authContext"
// import { useRouter } from 'next/router'
// import BounceLoader from "react-spinners/BounceLoader";
// import { useState, useEffect } from "react"

// export default function Signup() {
//   const { currentUser, logout } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const signout = () => {
//     logout()
//     router.push('/login')
//   }
//   return (
//     <div>
//       <div>signup</div>
//       <button onClick={() => {
//                   signout()
//               }}>logout</button>
//     </div>
//   )
// }

import Image from 'next/image'
import styles from '../styles/Home.module.css'
import hero from '../assets/heroPNG.png'
import { useRef, useState, useEffect } from "react"
import { useAuth } from "../src/authContext"
import { useRouter } from 'next/router'
import BounceLoader from "react-spinners/BounceLoader";

export default function Signup() {
  const data = "im passing something"
  const emailRef = useRef()
  const passRef = useRef()
  const nameRef = useRef()
  const { signup, currentUser, userUID} = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [message, setMessage] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await signup(emailRef.current.value, passRef.current.value, nameRef.current.value)
      setLoading(false)
      setMessage(true)
    } catch (error) {
      setError("There's an error in creating an account.")
      console.log(error)
      setMessage(true)
    }
  }

  return (
    <div>
     {loading ? 
      <div className={styles.loader}>
          <BounceLoader color="#6C71F8" loading={loading} size={105} css={ 
          {
              margin: '0 auto',
              color: '#6C71F8',
          }
          } 
          />
      </div>
     :
      <div className={styles.signupContainer}>
          <div className={styles.addDoctor}>
            {/* <Sidebar data={data}/> */}
            <h1>Welcome Admin</h1>
            <h3>Add new doctor</h3>
            <form className={styles.signupForm} onSubmit={handleSignup}>
              <input ref={nameRef} type="text" name='text' id='text' placeholder='Full Name' required></input>
              <input ref={emailRef} type="email" name='email' id='email' placeholder='Email' required></input>
              <input ref={passRef} type="password" name='password' id='password' placeholder='Password' required></input>
              <button className={styles.btnSignup} type="submit">Create Account</button>
            </form>
            {/* <div className={styles.or}>
              <hr/> <span>OR</span> <hr/>
            </div> */}
            {/* <p>If you don&apos;t have an account. <Link>Sign up, now!</Link></p> */}
            {message && !error ? <p>User Successfully Added!</p> : error}
          </div>
          {/* <div className={styles.hero}>
            <Image src={hero} alt="doctor inside a phone"></Image>
          </div> */}
        </div>
     }
    </div>
  )
}
