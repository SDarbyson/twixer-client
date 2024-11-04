import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import FlashMessage from '../helpers/FlashMessage';

const apiUrl = `${process.env.REACT_APP_API_URL}/users`;

const registerSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),

});


const Register = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [flash, setFlash] = useState({ show: false, message: '', type: '' });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const showFlash = (message, type) => {
        setFlash({ show: true, message, type });
        setTimeout(() => {
            setFlash({ show: false, message: '', type: '' });
        }, 3000);
    };
    
    const hideFlash = () => {
        setFlash({ show: false, message: '', type: '' });
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(apiUrl, data);
    
            if (response.status === 201) {
                setIsSubmitted(true);
            } else {
                setIsSubmitted(false);
                showFlash("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Registration error:', error);
            showFlash(error.response?.data.error || "An error occurred during registration. Please try again.");
        }
    };

    return (
        <div style={{ backgroundColor: '#e3eef8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {flash.show && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1050 }}>
                    <FlashMessage
                        message={flash.message}
                        type={flash.type}
                        onClose={hideFlash}
                    />
                </div>
            )}
            <Container className='mt-5'>
                <Row className='justify-content-md-center'>
                    <Col md={6} lg={4}>
                        <div className='register-box text-center'>
                            <h2 className='mb-4 twixer-logo'> TwiXer</h2>
                         
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId='formUsername' className='mb-3'>
                                    <Form.Control
                                        type='text'
                                        placeholder='Please Enter A Username'
                                        {...register('username')}
                                    />
                                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                                </Form.Group>
                                <Form.Group controlId='formEmail' className='mb-3'>
                                    <Form.Control
                                        type='email'
                                        placeholder='Please Enter A Valid Email'
                                        {...register('email')}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register('password')}
                                    />
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm your password"
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                </Form.Group>

                                <Button variant='primary' type='submit' className='w-100 mb-3'>
                                    Register
                                </Button>

                                {isSubmitted && <p className="text-success">Registration successful!</p>}

                                <div className='mt-3'>
                                    <p>Already have an account? <a href='/' className='login-link'>Login</a></p>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;