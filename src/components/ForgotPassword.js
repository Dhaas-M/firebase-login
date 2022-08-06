import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthProvider'
import { auth } from '../firebase'
import {Link, useNavigate} from 'react-router-dom';



export default function ForgotPassword() {

    const emailref = useRef()
    const { resetPassword } = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(auth, emailref.current.value)
            console.log('success')
        } catch(err) {
            setError('error occoured')
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
               <h2 className="text-centre mb-4">Log in</h2>
               <Form>
                   <Form.Group>
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" ref={emailref} required />
                   </Form.Group>
                   <Button type='submit' onClick={handleSubmit}  disabled={loading} className='w-100 text-center'>Sign Up</Button>
               </Form>
           </Card.Body>
           <div className='mt-2 text-center'>
                <Link to='/login'>Login</Link>
           </div>
       </Card>
       <div className='mt-2 text-center'>
           Doesn't have an account <Link to='/signup'>SignUp</Link>
       </div>
    </>
  )
}
