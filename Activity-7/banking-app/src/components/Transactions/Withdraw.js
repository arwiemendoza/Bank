import React from 'react'

const Withdraw = () => {
    return (
        <div>
            {/* Withdraw Form */}
            <div className="transact-parent">
                <Form className="form-class">
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setWithdrawAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleWithdraw}>
                    Withdraw
                </Button>
            </div>
        </div>
    )
}

export default Withdraw
