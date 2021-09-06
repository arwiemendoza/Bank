import React from 'react'

const CreateAcctModal = () => {
    return (
        <div>
            {/*Add Account Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Create New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="register2">
                        <Form.Group className="mb-3">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control required type="text" placeholder="Full Name"  ref={acctNameRef} id="name_input" onChange={(e) => setAcctName(e.target.value)} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" required="true" ref={acctEmailRef} onChange={(e) => setAcctEmail(e.target.value)} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" ref={insecurePwordRef}  onChange={(e) => setPword(e.target.value)} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Initial Balance</Form.Label>
                            <Form.Control className="number-input" type="number" min="0" placeholder="0" ref={initBalRef}  onChange={(e) => setBal(e.target.value)} onInput={validate} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleCreateAcct}>
                    Create Account
                </Button>
                </Modal.Footer>
            </Modal>  
        </div>
    )
}

export default CreateAcctModal
