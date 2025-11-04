const fetch = require('node-fetch');

async function testInsuranceSubmission() {
    try {
        const testData = {
            fullName: "Test User",
            email: "test@example.com",
            phone: "9876543210",
            insuranceType: "Vehicle Insurance",
            vehicleInsurance: {
                vehicleType: "Four Wheeler - Private Car",
                registrationNumber: "MH12AB1234",
                manufacturer: "Maruti",
                model: "Swift",
                yearOfManufacture: 2020,
                fuelType: "Petrol",
                previousInsurance: "No - First Time"
            }
        };

        console.log('Submitting test data:', JSON.stringify(testData, null, 2));

        const response = await fetch('http://localhost:5050/api/insurance/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const result = await response.json();
        console.log('Response:', JSON.stringify(result, null, 2));

        if (result.success && result.application && result.application.id) {
            console.log('\n--- Testing retrieval ---');
            
            // Test retrieval
            const getResponse = await fetch(`http://localhost:5050/api/insurance/${result.application.id}`, {
                credentials: 'include'
            });
            
            const getResult = await getResponse.json();
            console.log('Retrieved data:', JSON.stringify(getResult, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

testInsuranceSubmission();
