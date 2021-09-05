import React from 'react'

const Transfer = () => {
    return (
        <div>
           {/* Transfer Form */}
           <div className="transact-parent">
                <Form className="form-class">
                    <Form.Group className="mb-3">
                        <Form.Label>Sender Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Receiver Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setToAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setTransferAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleTransfer}>
                    Transfer
                </Button>
            </div> 
        </div>
    )
}

export default Transfer
