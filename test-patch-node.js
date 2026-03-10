const http = require('http');

const data = JSON.stringify({
    totalAmount: 100,
    paidAmount: 100,
    paymentMethod: 'Online'
});

const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/forms/69b017052e9a65675ad0ac10/payment',
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
