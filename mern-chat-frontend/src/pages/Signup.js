import React, { useState } from 'react'
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
// import { useSignupUserMutation} from "../services/appApi"/////////////////////////////
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import profileImg from "../assets/profile.jpg"



function Signup() {
    //Send signup to backend
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [signupUser, { isLoading, error}] = useSignupUserMutation();////////////////////////////////
    const navigate = useNavigate();

    // To set image upload states
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validatePic(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("file to large, max size is 1MB")
        }else {
            setImage(file);
            //To view what is been uploaded
            setImagePreview(URL.createObjectURL(file));
        }
    }

async function uploadImage(){
    const data = new FormData();
    data.append('file', image)
    // For API to know you are the one uploading 
    data.append('upload_preset','chatApp');
    try  {
        setUploadImg(true);
        let res = await fetch('https://api.cloudinary.com/v1_1/dyn0bis6s/image/upload', {
            method:'post',
            body: data
        })
        const urlData = await res.json();
        setUploadImg(false);
        return urlData.url;

    }catch(error) {
        setUploadImg(false);
        console.log(error);
    }

}


    async function handleSignup(e) {
        e.preventDefault();
        if(!image) return alert('please upload your profile picture');
        const url = await uploadImage(image);
        console.log (url);

        //Signup newUser
        // signupUser({name, email, password, picture: url}).then(({data}) => {//////////////////////////////////////
        //     if (data) {/////////////////////////////
        //         console.log(data);//////////////////////////////////
        navigate("/chat") //To navigate the user
        //     }
        // })
    }




    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxwidth: 500 }} onSubmit={handleSignup}>
                        <h1 className='text-center'> Create account</h1>
                        <div className='signup-profile-pic__container'>
                            <img src={imagePreview||profileImg} className='signup-profile-pic'></img>
                            <label htmlFor='image-upload' className='image-upload-label'>
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validatePic} />
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" onChange={(e) => setName(e.target.value)} value={name}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  value={password}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {uploadingImg ? 'loading...': 'Create account'}
                        </Button>
                        <div className='new'>
                            <p className='text center'>
                                Already have an account? <Link to="/login">Login</Link> instead
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row >
        </Container >

    );

};

export default Signup;