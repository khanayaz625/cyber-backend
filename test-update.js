const axios = require('axios');

const testUpdate = async () => {
    try {
        const id = '69aec6312048454ec8b30ee2'; // Aashi
        const res = await axios.patch(`http://localhost:5000/api/forms/${id}/status`, { status: 'Verification' });
        console.log('Update Success:', res.data);
    } catch (err) {
        console.error('Update Failed:', err.response?.data || err.message);
    }
};

testUpdate();
