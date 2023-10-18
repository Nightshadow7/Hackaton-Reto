import React, { useState } from 'react';
import '../App.css';

function UserN_Cuenta() {
    const accountsData = [
        { id: 1, accountNumber: '12345', balance: 1000 },
        { id: 2, accountNumber: '67890', balance: 2000 },
        { id: 3, accountNumber: '12312', balance: 3000 },
        { id: 4, accountNumber: '65465', balance: 4000 },
        { id: 5, accountNumber: '98798', balance: 5000 },
        { id: 6, accountNumber: '31312', balance: 6000 },
        { id: 7, accountNumber: '64826', balance: 7000 },
        { id: 8, accountNumber: '92922', balance: 8000 },
        { id: 9, accountNumber: '64576', balance: 9000 },
        { id: 10, accountNumber: '73273', balance: 10000 },
    ];

    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    return (
        <div className="user-cuenta-container">
            <div className="user-section">
                <div className="user-header">
                    <div className="user-logo">User Logo</div>
                    <div className="user-info">
                        <h2>User Information</h2>
                        <p>User: John Doe</p>
                    </div>
                </div>
                {selectedAccount ? (
                    <div className="account-details">
                        <h2>Account Details</h2>
                        <p>Account Number: {selectedAccount.accountNumber}</p>
                        <p>Balance: {selectedAccount.balance}</p>
                    </div>
                ) : null}
            </div>
            <div className="account-list">
                <h2>N° Cuentas</h2>
                <div className="account-list-scroll">
                    {accountsData.map((account) => (
                        <div
                            key={account.id}
                            className={`account-card account-item ${selectedAccount && selectedAccount.id === account.id ? 'selected' : ''}`}
                            onClick={() => handleAccountClick(account)}
                        >
                            {account.accountNumber}
                        </div>
                    ))}
                </div>
                <div className="qr-button">
                    <button className='btn-qr'>QR</button>
                </div>
            </div>
            
        </div>
    );
}

export default UserN_Cuenta;
