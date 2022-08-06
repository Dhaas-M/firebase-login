import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthProvider'
import { auth } from '../firebase'
import {Link, useNavigate} from 'react-router-dom';



export default function Signup() {

    const emailref = useRef()
    const passwordref = useRef()
    const passwordConfirmref = useRef()
    const { signup, currentUser } = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        if(passwordref.current.value !== passwordConfirmref.current.value) return setError("password Dosen't Match")
        try {
            setError('')
            setLoading(true)
            await signup(auth,emailref.current.value, passwordref.current.value)
            navigate('/')
        } catch(err) {
            setError('unable to create account')
            console.log(err);
        }

        setLoading(false)
    }
  return (
    <>
       <Card>
           {error && <Alert variant='danger'>{error}</Alert>}
           <Card.Body>
            {/* {currentUser.email} */}
               <h2 className="text-centre mb-4">Sign Up</h2>
               <Form>
                   <Form.Group>
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" ref={emailref} required />
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>Password</Form.Label>
                       <Form.Control type="password" ref={passwordref} required />
                   </Form.Group>
                   <Form.Group>
                       <Form.Label>Confirm Password</Form.Label>
                       <Form.Control type="password" ref={passwordConfirmref} required />
                   </Form.Group>
                   <Button type='submit' onClick={handleSubmit}  disabled={loading} className='w-100 text-center'>Sign Up</Button>
               </Form>
           </Card.Body>
       </Card>
       <div className='mt-2 text-center'>
           Already have an account? <Link to="/login">Log in</Link>
       </div>
    </>
  )
}
