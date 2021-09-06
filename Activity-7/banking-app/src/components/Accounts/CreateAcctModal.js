// import React, {useRef} from 'react'

// const CreateAcctModal = () => {
//     //modal display states
//     const [show, setShow] = useState(false);

//     // functions for modal
//     const handleClose = () => setShow(false);
//     const handleShow = () => {
//         setShow(true)
//         generateAcctNum()
//     };
  
//     // input reference
//     const acctNameRef = useRef();
//     const acctEmailRef = useRef();
//     const insecurePwordRef = useRef();
//     const initBalRef = useRef();

//     // Account number generator
//     const generateAcctNum = () => {
//         let date = new Date();
//         let min = (date.getMinutes()).toString().substr(-2);
//         setAcctNum(Math.floor(Math.random() * 90) + min)
//     }

//     const handleRegKeypress = (e) => {
//         //it triggers by pressing the enter key
//         if (e.code === 'Enter') {
//             handleCreateAcct();
//         }
//     };

//     // disable changing of number values via mousewheel
//     var numberInput;
//     useEffect(() => {
//             numberInput = document.querySelectorAll('.number-input');
//             numberInput.forEach(input => {
//                 input.addEventListener("mousewheel", 
//                     function(event){ 
//                         this.blur() 
//                     }
//                 );
//             })
//     }, [])

//     //limit to 2 decimal places onInput
//     const validate = (e) => {
//         e.target.value = (e.target.value.indexOf(".") >= 0) ? (e.target.value.substr(0, e.target.value.indexOf(".")) + e.target.value.substr(e.target.value.indexOf("."), 3)) : e.target.value;
//     }

//     // Function for account creation
//     const handleCreateAcct = () => {
//         setShow(false)

//         console.log(bal)

//         const newAcct = {
//             'Account No.': acctNum, 
//             'Account Name': acctName, 
//             'Email': acctEmail, 
//             'Password': pword, 
//             'Balance': bal
//         }

//         //add new user to previous set of users using spread operator for previous data 
//         setAccts(prevAccts => {
//             return [...prevAccts, newAcct]
//         })
        
//         setAcctName('');
//         setBal('');
//         setAcctEmail('');
//         setPword('');
//     }

//     return (
//         <div>
//             {/*Add Account Modal*/}
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header>
//                 <Modal.Title>Create New Account</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form id="register2">
//                         <Form.Group className="mb-3">
//                             <Form.Label>Account Holder Name</Form.Label>
//                             <Form.Control required type="text" placeholder="Full Name"  ref={acctNameRef} id="name_input" onChange={(e) => setAcctName(e.target.value)} onKeyPress={handleRegKeypress}/>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Email address</Form.Label>
//                             <Form.Control type="email" placeholder="name@example.com" required="true" ref={acctEmailRef} onChange={(e) => setAcctEmail(e.target.value)} onKeyPress={handleRegKeypress}/>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type="password" placeholder="********" ref={insecurePwordRef}  onChange={(e) => setPword(e.target.value)} onKeyPress={handleRegKeypress}/>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Initial Balance</Form.Label>
//                             <Form.Control className="number-input" type="number" min="0" placeholder="0" ref={initBalRef}  onChange={(e) => setBal(e.target.value)} onInput={validate} onKeyPress={handleRegKeypress}/>
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//                 <Button type="submit" variant="primary" onClick={handleCreateAcct}>
//                     Create Account
//                 </Button>
//                 </Modal.Footer>
//             </Modal>  
//         </div>
//     )
// }

// export default CreateAcctModal
