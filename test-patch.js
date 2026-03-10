const axios = require('axios');

const testUpdate = async () => {
    try {
        const id = '69b017052e9a65675ad0ac10'; // Ayaz Khan ID
        const res = await axios.patch('http://localhost:5000/api/forms/' + id + '/payment', {
            totalAmount: 100,
            paidAmount: 100,
            paymentMethod: 'Online'
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

testUpdate();
