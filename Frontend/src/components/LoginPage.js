import { useState, useEffect } from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import './LoginPage.css';


const LogInPage = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [googleOauthUrl, setGoogleOauthUrl] = useState('');

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/google/oauthURL');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                console.log(e);
            }
        }

        loadOauthUrl();
    }, []);
    const onLogInClicked = async () => {
        alert('Log in not implemented yet');
    }
    return (
        <Container className='login-page-container'>
            <Form>
                <Form.Group className="form-group">
                <Button className='submit-button'
                    onClick={() => { window.location.href = googleOauthUrl }}>Log in with Google</Button>
                </Form.Group>
            </Form>
        </Container>    
    );
};
export default LogInPage;