import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Button, Container, Typography } from '@mui/material';

function App() {
    const [message, setMessage] = useState('');
    const [account, setAccount] = useState('');
    const keypair = Keypair.generate();

    useEffect(() => {
        setAccount(keypair.publicKey.toString());
    }, []);

    const mintTokens = async () => {
        try {
            const response = await fetch('https://605a3506-6911-4d7f-b64c-aed6ba598812-00-1wni5uj7nrwkd.kirk.replit.dev/mint', { // Your Replit URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicKey: keypair.publicKey.toString() }),
            });

            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage('Error minting tokens');
            console.error(error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">LLM Token Generator on Solana</Typography>
            <Typography variant="subtitle1">Account: {account}</Typography>
            <Button variant="contained" color="primary" onClick={mintTokens}>Mint Tokens</Button>
            <Typography variant="subtitle1">{message}</Typography>
        </Container>
    );
}

export default App;
