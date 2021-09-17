import React, {useState, useRef, useEffect} from 'react'
import { Form, Button} from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import '../css/Login.css'
import Modal from 'react-bootstrap/Modal';
import CreateAcctModal from './Accounts/CreateAcctModal';

const LOCAL_STORAGE_KEY_1 = 'userList';

const Login = () => {
    const [accts, setAccts] = useState([]);
    const [loginState, setLoginState] = useState(false);
    const [userType, setUserType] = useState('client');

    const usernameRef = useRef();
    const passwordRef = useRef();

    const loadingText = `Loading`;
    const loadingEllipis = `...`;
    const typingDelay = 500;
    var charIndex;

    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem('userList'));
        if (storedAccts) setAccts(storedAccts);
    }, [])


    const loadingTextId = document.querySelector('#loadingTextId');
    // useEffect(() => {
        
    // }, [])

    // function for Type Effect
    function type() {
        if(charIndex < loadingEllipis.length) {
            console.log(charIndex)
            loadingTextId.textContent += loadingEllipis.charAt(charIndex); // Add 1 dot
            charIndex++;
            setTimeout(type, typingDelay); // callback type function every 500ms
        }
    }

    const handleLoginKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.code === 'Enter') {
            if(loadingTextId) {
                loadingTextId.textContent = loadingText
                charIndex = 0;
                type();
            }

            setTimeout(() => {
                if(userType === 'client') {
                    let clientLogin = accts.find(acct => acct['Email'] === usernameRef.current.value && acct['Password'] === passwordRef.current.value)
                    if (clientLogin) {
                        usernameRef.current.style.borderColor = 'green'
                        passwordRef.current.style.borderColor = 'green'
                        setLoginState(true)
                    }
                    else {
                        loadingTextId.textContent = 'Wrong credentials'
                        usernameRef.current.style.borderColor = 'red'
                        passwordRef.current.style.borderColor = 'red'
                    }
                }
                else if ((usernameRef.current.value === 'jet' && passwordRef.current.value === 'P@ssw0rd') || (usernameRef.current.value === 'arwie' && passwordRef.current.value === 'p4ssw0rd')){
                        setLoginState(true);
                }
                else {
                    loadingTextId.textContent = 'Wrong credentials'
                    usernameRef.current.style.borderColor = 'red'
                    passwordRef.current.style.borderColor = 'red'
                }
            }, 2000)

        }
        else {
            loadingTextId.textContent = ''
            usernameRef.current.style.borderColor = 'lightgray'
            passwordRef.current.style.borderColor = 'lightgray'
        }
    };
    
    const changeUser = () => {
            
        let userSwitch;
        let loginParent;
        let adminLogo;
        let adminForm;
        let adminPlaceholder
        userSwitch = document.querySelector('#userSwitch')
        loginParent = document.querySelector('.login-parent')
        adminLogo = document.querySelector('svg')
        adminForm = document.querySelectorAll('.login-label')
        adminPlaceholder = document.querySelectorAll('.form-control')
        if (userSwitch.checked){
            setUserType('admin')
            loginParent.classList.add('adminlogin-parent')
            adminLogo.classList.add('admin-svg')
            adminForm.forEach(form => {
                form.classList.add('adminmb3')    
            })
            adminPlaceholder.forEach(form => {
                form.classList.add('form-placeholder')    
            })
        }else {
            setUserType('client')
            loginParent.classList.remove('adminlogin-parent')
            adminLogo.classList.remove('admin-svg')
            adminForm.forEach(form => {
                form.classList.remove('adminmb3')       
            })
            adminPlaceholder.forEach(form => {
                form.classList.remove('form-placeholder')    
            })
        }
    }
    if (loginState && userType === 'admin') {
        return (
            <Redirect to="/accounts"/>
        )
    }
    else if (loginState && userType === 'client') {
        return (
            <Redirect 
                to={{
                    pathname: '/client/dashboard',
                    state: { 
                        email: usernameRef.current.value,
                        accts
                    }
                }}
            />
        )
    }
    else {
        return (
            <div className="login-parent">
                <div className="svg-parent">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524.8 581.61"><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M451.86,524.75c-1.39-1.54-.94-2.94-1.14-4.21-.77-5-8.71-8.47-12.8-5.62-1.08.76-.8,2-1,3.1-1,4.79,2.86,10.55-3.91,14.41-1.68,1-.61,6.75-.83,10.93-3.3-1.64-6.59-2.3-8.52-5.33-2.42.69-.62,3.2-2.59,4.7-.65-8.66-.85-17-3.63-26.41a169.37,169.37,0,0,0-4.24,25.47c0-8.78-.23-17.57.09-26.34.18-4.89-1.21-6.56-6.35-6.41-9.86.29-12.6,2.62-12.27,12.7.11,3.22.33,5.94-3.48,7.33-2.73,1-4.41,1.17-4.41-2.39a20.83,20.83,0,0,0-.06-2.85c-.42-2.82,1.86-9-5-4.07a3.58,3.58,0,0,1-3.32,0c-4.13-3-8.36,1.39-12.53-.37-1.42-.6-2,1.33-1.66,2.23,2.09,6.08-3.67,9.53-5.13,14.41-.71,2.37-.79,5.61-2.83,8.53-2.22-5.05.56-10.42-2.78-14.8-4.22,2.88-1.82,7.81-4.36,11.24q0-12.71,0-25.42c0-2.46.53-5.48-3.39-4.95-3,.42-7.3-2.55-8.67,3.32a40.7,40.7,0,0,0-1.25,9.48c0,1.4-.23,2.73-2.1,2.71s-1.95-1.43-2-2.79a49.47,49.47,0,0,1-.17-5.7c.29-3.94.21-6.73-5.33-6.72-3.81,0-2.19-4.25-2-6.4.47-5.2-2.79-7.46-6.18-5.41-4.12,2.5-7.09,6.73-12.43,7.74-.62.12-.65,5-.42,7.61.66,7.41-.43,14.7-1.73,22q0-23.68,0-47.38c0-6.09,1-12.35-.18-18.21-1.91-9.81,0-20.88-8.34-28.86-1.69-1.61-1.54-3.78-1.53-5.88,0-3,.05-6.09,0-9.13,0-2-1.25-3.28-3.21-3.13a2.89,2.89,0,0,0-2.78,3.07c0,2.09-.14,4.19,0,6.27.37,4.69-.42,8.75-4.15,12.21-2.79,2.59-3.51,6.38-3.81,10.19-1.7,22-.81,44-.88,66a29,29,0,0,1-2.73,11.86c-1.91-3.88-1-7.09-1.1-10.06-.15-7-.12-14.07.18-21.1.16-4-1.69-4.69-5.15-4.69s-5.08.78-4.95,4.78c.3,8.93.08,17.87,0,26.81,0,1.8-.18,3.61-.29,5.73-3.61-1.37-4.62-3.62-4.58-6.79.1-7.61-.07-15.21,0-22.82.06-4.81-2.5-7.3-6.92-7.46-3.51-.13-4.09-1.76-4-4.65s-.07-6.08,0-9.12c.07-2.39-.34-4-3.32-4.06-3.14-.06-3.3,1.92-3.31,4.09q0,13.69,0,27.37c0,2.67.54,5.64-3.71,5.38s-2.6-3.49-2.66-5.58c-.2-6.84-.21-13.69-.14-20.53,0-3-.29-5-4.23-5-3.74.07-3.75,2.12-3.74,4.8,0,13.86,0,27.72,0,42.34-3.32-1.76-4.35-4.41-6.13-6.4-6.28-7-3.45-14.89-3.89-22.4-.25-4.12-2.88-3.46-5.12-3.27s-6.24-1.71-6.19,3.32a87.14,87.14,0,0,1-.86,15.34c-2.41-4.19-1.72-8.85-1.49-13.2.26-4.91-1.77-5.65-5.94-5.57-3.34.06-4.51,1.26-4.14,4.35.85,7.11-1.51,13.25-5.38,19.07-1.82,2.73-1.93,6-1.89,9.28,0,2.35.75,4.86-1.57,8.36-2-14.9.86-28.83-1.8-42.41s-5.43-27-8.75-40.53c-8.87,26-12,52.66-10.24,80.74-3.92-2.07-3.75-4.55-3.76-7,0-5.13-.24-10.27-.1-15.4.08-2.92-.84-3.84-3.86-4-16.22-.76-16.22-.86-16.53,15.39-.05,2.66-.06,5.32,0,8,.09,3.4.52,6.91-4.32,8.07v-8.47c0-1.69-.4-3-2.49-3s-3.1,1-3.09,3.11c0,3.24,0,6.47,0,9.7,0,1.14-.1,2.54-1.63,2.47s-1.47-1.48-1.46-2.61c0-3,.12-6.08.14-9.12,0-7.28,0-7.28-7.45-7.28a12.22,12.22,0,0,1-1.71,0c-3.17-.39-4.46,1-4.39,4.17.12,5.89.08,11.79,0,17.68,0,1.52.86,4-1.66,4.12-2.75.17-1.72-2.35-1.9-3.85a15.17,15.17,0,0,1-.07-4c.6-4.2-1-6.12-5.3-5.4-5.51.91-7-1.35-6.9-6.89.5-20.49-1-41,2.06-61.46a29.62,29.62,0,0,1,3-9.07c10.9-21.67,29.12-36.11,48.36-49.6a29.09,29.09,0,0,1,7.27-3.21q21.72-7.75,43.46-15.46c7.22-2.55,11.19-9.4,9.77-17.16a22.47,22.47,0,0,0-1.24-5c-5.47-12.59-3.28-25.33-.53-38,1.42-6.51,6.93-10.75,10.51-16.06,8.3-12.31,14.93-25.59,22.52-38.3,1.16-1.94.79-4.06.22-6.1-6.25-22-7.8-44.58-6.09-67.19,1.23-16.24,5.43-32.25,6.82-48.49,1.17-13.55,9.16-23.29,15.15-34.37,7-13,16.49-22.85,29.81-29.25a63.11,63.11,0,0,0,13.49-8.49c13.06-11.1,28.77-13.67,45-16.8,19.86-3.82,38.06,2,56.7,5.53,20.82,4,38.43,14.38,53.05,29.8,23,24.24,22.93,24.23,28.6,58.77,1.23,7.52,0,14.81-1.23,22-2.75,15.57-1.86,31.11.49,46.48,3.4,22.24-2.51,42.86-9.27,63.45-.8,2.46-1.46,4.51-.11,7,4.7,8.65,6.72,18.11,7.95,27.76a13,13,0,0,0,6.75,10.39c9.41,5.5,17.87,12.06,22.5,22.54,1.31,3,3.08,5.67,3.16,9,.27,10.34,5.14,19.88,5.24,30.25,0,2.76,2.28,3.18,4.16,4,9.6,4.14,19,8.78,28.83,12.28,19.42,6.92,33.54,21.44,48.73,34.11,6.51,5.43,9.28,15,12.08,23.54,9.83,29.91,7.37,60.77,7.32,92.27-7-5.76-8.78-14.39-14.11-20.72,3.29-2,4.73-5.49,3.33-10-.85-2.78.74-4.7,2.51-6.53,2.11-2.2.79-4.88-1.13-4.58-2.95.46-3.21-1.52-4.73-2.59-3.34-2.37-5.56-4.35-3.17-8.89,1-1.79-.87-3.84-3.3-3-4.24,1.5-4.37-1.07-4.38-4,0-2.56-.8-5,0-7.76.52-1.84.88-4.91-1.7-6.82a7.63,7.63,0,0,0-1.69,8.37c1.65,3.66,1.11,6.93.46,10.49-1.51,8.28,1.14,16.37,1.37,24.58.23,7.74,2.13,15.7-3.52,22.5a1.49,1.49,0,0,0-.29.46c-.58,1.63,3,3.91,0,4.66-2,.51-2-3.08-3.43-4.53-5.09-5.23-10.85-9.72-17.92-11.47-6-1.49-8.21-5.44-8.58-10.57a184.12,184.12,0,0,1-.17-21.66c.25-5.43-3.34-4.28-6.38-4.6-3.57-.38-4.57,1.19-4.51,4.63.12,7.21-.11,14.43-.36,21.64-.06,1.69.73,4.65-1.85,4.62s-1.64-3-1.65-4.61c-.06-24,0-47.9,0-71.85,0-2.32,1.3-5.56-1.48-6.71a16.75,16.75,0,0,0-10.66-.27c-2.24.62-1.28,3.29-1.28,5.07,0,18.44.11,36.89,0,55.33,0,2.42,1.83,6.8-2.34,6.82-2.38,0-1.2-4.12-1.22-6.38-.09-16.35-.06-32.7-.07-49.05,0-3.92-5.49-12.18-9-13.52a3.18,3.18,0,0,0-1.61-.2c-3.91.69-11.08,9.52-11.07,13.66q0,20.25.15,40.49c0,1.33-.06,2.66,0,4,0,1.94-.46,3.43-2.73,3.51-2.85.11-2.19-2.1-2.2-3.64q-.12-18.53-.09-37.07c0-12.54,0-25.09.26-37.63.1-4.09-.94-6.24-5.59-5.6,1-2.37,3.78-.38,4.68-3-8.34-.73-6.35-7.08-6.61-12.33a40.79,40.79,0,0,0-1.29-9.56c0,5.69,0,11.38,0,17.07,0,1.78,0,3.44-2.45,3.67-1.51.14-4.26-.8-4.09,1.6s3.34.5,5.29,2.15c-6.18-.94-6.65,2.29-6.61,7,.21,22.43.09,44.87,0,67.3,0,2.35.47,4-3.32,5.39-5.65,2-4.74,9-5.25,13.88s-.86,9.72-1.7,14.54c-.19,1.05.22,2.52-1.39,2.63-2,.14-1.86-1.53-1.87-2.79-.08-8.75-.1-17.49-.15-26.24,0-5.08-4.66-9-3.49-14.55.26-1.23-2.06-1.17-3.37-1.14-2.11,0-2.28,1.5-2.36,3.14-.22,4.16-.7,8.31-.71,12.47,0,3-.65,4.74-4.09,4.41A10.78,10.78,0,0,0,451.86,524.75Zm6.53-364.35c-1.3-3.93-2-7.78-3.78-11.06-3.91-7.3-6.91-15.66-13.76-20.58a223,223,0,0,0-50.45-27.29c-9.54-3.66-19.22-3.93-29-3.79-12.9.19-25,4.55-37.14,8.15-3.26,1-6.69,1.48-9.62,3.4-11.3,7.38-22.08,15.06-30,26.58-4.55,6.65-7.65,13.25-8.88,21.08-.4,2.57.12,3.57,2.28,4.79,5.08,2.88,7.18,7.45,8.59,13.24,2.78,11.4.19,19.62-10.76,24.67-3,1.36-3.4,3.59-2.22,6.59,2.34,6,2.15,12.18,1.6,18.49-1,11.92-1.67,23.88-2.61,35.81a14.31,14.31,0,0,0,1.9,8.7c7.73,13.36,14.27,27.21,16.92,42.61,2.87,16.68,12,29.6,24.44,40.57a131.9,131.9,0,0,1,11,11.58c11.47,12.85,27.51,14,42.87,14.33,8.37.2,16.84-4.19,25.28-6.4A11.92,11.92,0,0,0,402.3,367c4.94-7.31,11.77-12.86,17.79-19.17,7.42-7.79,14.09-16.09,17.28-27,3.77-12.88,5.47-26.47,12.11-38.47,5.27-9.53,9.12-19.5,10-30.54,1.14-15.13,6.95-30.16.35-45.43-1.24-2.87-2.15-5.73-5.12-7.1-10.52-4.86-13.63-12.8-10.12-23.64a11.86,11.86,0,0,0,.34-2.25C445.84,166,450.23,161.57,458.39,160.4Zm-10,17.55c4.18.36,7.3.94,10.4.81,3.31-.14,3.11-3.27,3.48-5.53.25-1.48-.84-1.87-2.18-1.3C456.35,173.48,452.33,174.41,448.35,178ZM283,177.72c-2.38-2.34-5.45-2.84-8.07-4.16-2.18-1.11-2.55.7-2.84,2.18s-1.08,3.35,1.47,3.25C276.65,178.88,279.94,180.17,283,177.72Zm.5,9.39c-4.17,0-7.26-.16-10.33,0-2.68.17-1.8,2.36-1.67,3.88.17,2,1.51,1.79,2.85,1.19C277.19,191,280.4,190.45,283.54,187.11Zm164.43,0c2,2.86,4.24,3.53,6.3,4.34s2.71-.62,3.1-2.21c.49-2.06-1-2.09-2.35-2.12C453,187,450.88,187.07,448,187.07Z" transform="translate(-98.21 -70.27)"/><path d="M555.08,607.87c0,3.61.18,7.23-.05,10.82s1.86,8.15-4.82,8.71c-2.39.2-1.2,3.92-1.3,6.06-.14,3,.65,6.39-4.28,6a2,2,0,0,0-2.16,2.16c.14,3.27-1.47,4.38-4.5,4.17a1.37,1.37,0,0,0-1.55,1.33c.48,6.11-4,4.61-7.27,4.69-4.75.12-9.49.11-14.24.1-1.92,0-3.77,0-3.86-2.86-.09-3,1.57-3.42,3.93-3.37s4.94.06,7.41,0c3.5-.1,8,1.49,7.68-4.92-.09-1.7,1.92-1.56,3.18-1.51,2.76.11,3-1.53,3-3.68-.11-2.66-2-2.24-3.68-2.29-1.9-.05-3.8,0-5.7-.07-1.32,0-3.05.07-3-1.75.1-3.36-1.17-4.85-4.61-4.76-2.22.06-2-1.88-2-3.36q-.06-15.1-.07-30.2c0-5.84,4.47-3.14,7.09-3.54,2.78-.41,5.75-.61,5.65,4-.21,9.3.23,18.62-.17,27.91-.22,5.1,2.2,5.3,6.15,5.32s6.86,0,6.61-5.44c-.42-9.1,0-18.23-.23-27.34-.19-6.34,4.3-4.25,7.46-4.59,3.49-.38,5.83.28,5.38,4.83s-.1,9.11-.1,13.66Z" transform="translate(-98.21 -70.27)"/><path d="M171,620.38c0-2.65-.08-5.32,0-8s-.27-4.58-3.61-4.2c-2.28.26-2.86-1.06-2.93-3.11s.75-3.3,2.89-3.21c3.18.13,3.78-1.61,3.6-4.32s-.15-5.69-.11-8.54-.67-6.45,4.26-6.12c.5,0,1.55-.86,1.54-1.3-.13-6,4.24-4.47,7.56-4.53,4.94-.07,9.87,0,14.81,0,2.36,0,3.47.89,3.38,3.37-.08,2.31-1.38,2.83-3.33,2.83-3.42,0-6.83,0-10.25.07-1.14,0-2.82-.4-3.33.19-3.93,4.5-1,10-1.79,15-.49,2.94,1.89,3.28,4.08,3.33,3.8.07,7.6.11,11.39.07,2.57,0,3.19,1.36,3.13,3.62s-1.39,2.75-3.36,2.72c-3.6-.06-7.22.19-10.82,0-3.39-.2-4.78.9-4.61,4.49.26,5.5,0,11,.07,16.52.13,6.19-4.53,3.53-7.34,4-3.05.48-5.76.14-5.31-4.26C171.19,626.1,171,623.23,171,620.38Z" transform="translate(-98.21 -70.27)"/><path d="M473.13,611.19c0-3.22,0-6.45,0-9.67,0-3,.77-6.42-4.24-5.93-1.77.18-2-1.31-2-2.74,0-1.6,0-3.36,2.15-3.24,5.4.31,4.57-3.52,4.19-6.54-.57-4.55.68-6.61,5.63-6.29,4.19.28,8.33-.09,7.12,6.14-1.06,5.41,1.52,7.07,6.53,6.65,3-.25,6.07,0,9.11,0,2.09,0,3.06.91,3,3.1s-.92,3.07-3.07,3c-4,0-8,.13-12,0-2.68-.09-3.7.92-3.67,3.62.1,8,.05,15.94,0,23.91,0,2.68,1.16,3.66,3.81,3.56,3.79-.15,7.59,0,11.39,0,2.28,0,3.5.71,3.51,3.25s-1.17,3.26-3.48,3.23c-6.07,0-12.14,0-18.22,0a6.45,6.45,0,0,1-1.63-.12c-.43-5.49-8.76-5.4-8.16-11.71.32-3.38.05-6.82.05-10.24Z" transform="translate(-98.21 -70.27)"/><path d="M385.31,633.21c-5.13,0-10.27-.08-15.39,0-2.59.06-3.84-.73-3.8-3.55s1.77-2.82,3.78-3c8.87-.66,8.83-.69,8.74-9.86-.05-5.13-.35-10.29.15-15.37s-1.64-6.41-6.15-5.79a31.26,31.26,0,0,1-4,0c-2.06,0-2.5-1.24-2.45-3s.13-3.16,2.29-3.17c6.84,0,13.67-.11,20.51,0,3,0,2.33,2.39,2.33,4.2,0,8.93.26,17.87-.11,26.79-.2,4.82.92,7.27,6.17,6.35a26,26,0,0,1,3.42,0c2-.06,3.15.65,3.19,2.94s-.84,3.46-3.3,3.42c-5.13-.08-10.26,0-15.39,0Z" transform="translate(-98.21 -70.27)"/><path d="M416.51,611c0-3.6.12-7.21,0-10.81-.13-2.83.24-4.9,3.81-4.57,1.22.11,2.33-.42,2.37-1.84.19-6.68,5.23-3.6,8.4-4.15,1.45-.25,2.67.43,2.57,2.19-.08,1.4.38,2.78-1.5,3.83-4.31,2.41-4.32,10.15-.29,12.67,3,1.86,2.77,4.55.05,5.93-5.21,2.65-2.47,7.07-2.47,10.44,0,3.57,3.85,1.77,6,2,3.2.3,6.44.17,9.66.15,2.18,0,3.08,1,3,3.13-.08,2-.65,3.29-2.94,3.28-6.45,0-12.9,0-19.35,0-1.79,0-2.86-.68-3-2.58-.11-1.27.15-3.29-1.45-3.32-6.54-.09-4.75-4.77-4.86-8.38-.09-2.66,0-5.31,0-8Z" transform="translate(-98.21 -70.27)"/><path d="M238.36,608.12c2.5,1.3,8.58-2.93,8.38,4.73a1.58,1.58,0,0,0,1.1,1.07c6.72-.19,4.77,4.73,5,8.36a9.79,9.79,0,0,1,0,1.71c-.12,1.17-9.63,9.28-10.84,9.18-1.57-.13-3.69.88-4.41-1.38-.51-1.57-.91-3.56.69-4.74s1.49-2.47,1.63-4c.76-8.41.61-8.58-7.88-8.63-2.28,0-4.56-.07-6.83,0s-4.2-.28-4.06-3.29c.05-1.14-.14-2.22-1.58-2.65-1.63-.49-4.32.74-4.59-2.09a64.29,64.29,0,0,1,0-9.1c.07-1.43,1.3-1.74,2.51-1.69,2.6.11,3.87-1,3.73-3.68-.1-2,1.21-2.75,2.93-2.53,3.11.39,6.76-1.36,9.18,1.13,1,1,2.06,4.86-1.73,5.11-7.38.47-3.29,5.85-3.84,8.95-.74,4.25,2.93,3.39,5.41,3.55C234.71,608.2,236.24,608.12,238.36,608.12Z" transform="translate(-98.21 -70.27)"/><path d="M278.07,610.63c0,3.61-.05,7.21,0,10.82,0,2.34-.63,4.88,3,5.68,1.89.42,1.53,2.83,1.21,4.48s-1.86,1.74-3.19,1.59c-3.29-.36-8.25,1.86-7.71-4.79A1.36,1.36,0,0,0,270,627c-5.55.53-4.71-3.27-4.68-6.68,0-7,0-14-.06-21.06,0-1.49-.4-3.45,1.81-3.44,3.23,0,4.49-.94,4.85-4.47.38-3.72,4-1.48,6.15-1.83,1.56-.25,4-.84,4.38,2.16.3,2.35.11,3.94-2.86,4.34-2,.27-1.4,2.4-1.42,3.82-.07,3.6,0,7.21,0,10.81Z" transform="translate(-98.21 -70.27)"/><path d="M315.8,611.12c0-3.61.05-7.22,0-10.83-.05-2.68,0-5,3.8-4.63a1.88,1.88,0,0,0,2.29-1.89c.18-1.54-.78-3.88,1.72-4.17a39.06,39.06,0,0,1,7.94.11c1.44.12,1.46,1.53,1.45,2.68,0,1.3.26,3-1.57,3.13-3.57.24-3,2.79-3,5q0,10,.05,19.95c0,2.81-1.13,6.18,3.54,6.9,1.47.22,1,2.23.93,3.52-.05,1.67-1.12,2.57-2.6,2.24-3.21-.71-8.73,2.83-8.6-4.44,0-.44-.57-1.27-.89-1.28-7.6-.34-4.65-6.08-5.09-10a56.79,56.79,0,0,1,0-6.26Z" transform="translate(-98.21 -70.27)"/><path d="M303.18,611.5c.71,2.47.17,5.68.11,8.72-.08,3.28.78,7.24-4.75,6.81-1.08-.08-1.49.91-1.7,1.93-.3,1.51.7,3.84-1.88,4.09s-5.29.74-7.31-.24c-2.68-1.3-2.64-4.59.11-5.63s2.77-2.57,2.76-4.7c0-7.61-.07-15.21,0-22.82,0-2,.21-3.82-2.65-4-2.2-.16-1.75-2.06-1.76-3.53a2.33,2.33,0,0,1,2.92-2.59c3.15.44,8.32-2.52,7.93,4.39,0,.34.2,1,.39,1C308.46,597,301.49,605.63,303.18,611.5Z" transform="translate(-98.21 -70.27)"/><path d="M454.33,604.44c-.05,10.4-.05,10.4-9.83,10.07l-4.56-.18c-1.39-.06-2.81-.16-2.79-2,0-1.41-.5-2.85,1.21-4a7.5,7.5,0,0,0,0-12.72c-1.44-1-1.25-2.17-1.27-3.44s.32-2.67,1.73-2.39c3.42.66,9-3.49,9.55,4,0,.48.49,1.34.78,1.35C456.83,595.3,453.52,601.24,454.33,604.44Z" transform="translate(-98.21 -70.27)"/><path d="M385.09,583c-5.59,1.5-6.36-1.32-6.61-6.25-.31-6,2.58-6.07,7.08-6.21,4.75-.15,6.21,1.31,6,6.09S391,584.65,385.09,583Z" transform="translate(-98.21 -70.27)"/><path d="M347,602c-3.11.12-6.45.76-6.08-4.13.13-1.74-1.25-2-2.65-2.22-2.57-.38-1.81-2.43-1.78-4,0-2.14,1.7-2.35,3.21-2.19,3.24.35,8.12-1.9,7.7,4.7-.1,1.46,1.5,1.5,2.6,1.43,2.64-.17,3.77.9,3.64,3.61-.15,3.27-2.51,2.64-4.48,2.78C348.41,602,347.66,602,347,602Z" transform="translate(-98.21 -70.27)"/><path d="M348.18,620.76c2.11.33,7.42-.82,4.95,3.72-1.65,3-5.71,5.49-8.39,8.6-.79.92-3.61.11-5.49.08-1.44,0-2.67-.36-2.73-2.12s-.71-3.53,1.65-4.2c1.05-.3,2.68-.22,2.61-1.65C340.5,619.56,344.47,620.79,348.18,620.76Z" transform="translate(-98.21 -70.27)"/><path d="M224.4,633.2c-2.08,0-4.16-.06-6.24,0s-3.3-.53-3.34-2.79.55-3.67,3.14-3.64c4.34.06,8.69,0,13,0,2.18,0,2.93,1,3,3.11,0,2.42-1,3.46-3.33,3.38-2.08-.07-4.16,0-6.24,0Z" transform="translate(-98.21 -70.27)"/><path d="M244.88,595.73c-1.32,0-2.65,0-4,0-2.11.07-3.54-.24-3.6-3-.06-3,1.55-3.43,3.88-3.4,2.64,0,5.29,0,7.93,0,2.15,0,3.64.45,3.64,3.11,0,2.41-.9,3.48-3.35,3.31C247.91,595.65,246.39,595.74,244.88,595.73Z" transform="translate(-98.21 -70.27)"/><path d="M432.82,233c11.34,7.52,21.5,15.93,19.53,30.75-1.75,13.18-5.81,23.12-21.91,24.31-7.76.57-15.51,2.11-23.24.65-15.39-2.9-30.92,3.27-45.73.64-20.37-3.62-40.39,1.93-60.6-1-16.23-2.38-19.95-10.62-22-24.3-2.31-15.25,8.24-23.51,20.26-31.52-.95,3.51-1.32,6.18-2.38,8.54-2.64,5.92-1.79,11.37,3,15.37,5.59,4.7,12.25,6.91,19.57,3.85,6-2.5,11.94-5,17.67-7.9,7.65-3.94,14.12-2.52,20.32,3,7.33,6.56,9.48,6.55,16.75-.07,6-5.46,12.17-6.56,19.8-3.14,8.05,3.6,15.59,8.79,24.87,9.25,12,.58,19.55-9,16-20.32C433.9,238.63,432.56,236.26,432.82,233Z" transform="translate(-98.21 -70.27)"/><path d="M327.35,292.47c8-.93,14.94-2.41,22.16,0a50.15,50.15,0,0,0,30.3.45c7.82-2.26,15.26-2.11,23.79-.27-9.25,12.28-21.07,18.43-36,19C351.19,312.3,338,306.22,327.35,292.47Z" transform="translate(-98.21 -70.27)"/><path d="M438.79,180.45c-.67,2.65-2.29,1.72-3.83.92-4.22-2.19-8.41-4.43-12.63-6.6-5.6-2.88-10.69-2.51-15.81,1.61C399,182.44,391,188,383.31,193.87c-2.93,2.23-5.88,2.94-8.68.28-3.45-3.3-4.74-10.51-1.73-12.25,11.81-6.81,22-17.43,37-17.28,9.87.1,18.22,4.79,26.13,10.21C437.8,176.07,438,178.43,438.79,180.45Z" transform="translate(-98.21 -70.27)"/><path d="M360.36,186.45c-1.56,2.82-1.9,6.81-5.21,8.74-3.08,1.8-5.73-.05-8.25-2-7.54-5.76-15.26-11.27-22.72-17.13-4.75-3.73-9.62-4.07-14.83-1.58-3.94,1.88-7.76,4-11.64,6-1.47.76-3.29,2.41-4.61.92-1.66-1.88.08-4.3,1.3-5.49a40.63,40.63,0,0,1,14.51-8.61c10.7-3.93,21-4,30.81,3,5.25,3.72,11,6.73,16.64,9.87C358.82,181.52,359.71,183.62,360.36,186.45Z" transform="translate(-98.21 -70.27)"/><path d="M301.41,222.15c6-4.15,7.68-10.75,11.15-16.2,4.44-7,12.2-7.41,19.87-6.11,6.47,1.1,10.9,5.07,13.78,10.65,1.67,3.23-1.17,5.33-3.25,7.07-2.78,2.32-3.25,4.37-.14,7.17-6.72-2.83-12.84-6.43-20.12-6.62S308.86,221.39,301.41,222.15Z" transform="translate(-98.21 -70.27)"/><path d="M429.87,222.77c-13.84-4.63-27.39-8-40.75,2.26,3.09-4,.77-6.12-1.73-8.22-3.4-2.84-3.48-5.81-.68-9.29,4.89-6.08,11.28-9.23,18.83-8.34,7.19.84,13.66,3.79,15.56,11.95C422.29,216.22,427.39,218.26,429.87,222.77Z" transform="translate(-98.21 -70.27)"/><path d="M384.92,245.93c1.08-8.73-5.58-12.17-10.53-16.62-5.71-5.13-4-11.59-4.45-17.5,1.55-.68,1.89-.06,1.9.43.17,9,4,15.74,11.34,21.08C387.6,236.53,387.62,239.3,384.92,245.93Z" transform="translate(-98.21 -70.27)"/><path d="M359.88,210.47c1.4,7.59,2.54,14.94-4.57,20.29-5,3.75-9.89,7.61-9.15,15.2-2.61-4.83-2.34-9.22,1.53-12.22C355.36,227.78,360.27,220.65,359.88,210.47Z" transform="translate(-98.21 -70.27)"/><path d="M430.41,195.49c9.56,4.3,11.52,12.11,5,18.94C436.48,207.37,434.23,202,430.41,195.49Z" transform="translate(-98.21 -70.27)"/><path d="M295.55,213.69c-6.22-5.7-4.25-13.62,5-18.29C297.36,201.77,294.39,207.23,295.55,213.69Z" transform="translate(-98.21 -70.27)"/></g></g></svg>
                </div>

                <div className="form-parent">
                    <Form id ="register">
                    <div className="user"></div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="login-label">Username</Form.Label>
                        <Form.Control className="form-control" type="email" placeholder="Enter username" ref={usernameRef} onKeyPress={handleLoginKeypress} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="login-label">Password</Form.Label>
                        <Form.Control className="form-control" type="password" placeholder="********" ref={passwordRef} onKeyPress={handleLoginKeypress} />
                    </Form.Group>
                    <br/>
                    <Form.Text className="text-muted" id="loadingTextId"></Form.Text>
                    </Form>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="userSwitch" onClick={changeUser}/>
                    </div>
            
        </div>
        {/* <CreateAcctModal /> */}
    </div>
    )
}
}

export default Login

