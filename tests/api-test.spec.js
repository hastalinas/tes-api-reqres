const { test, expect } = require('@playwright/test');
const { Ajv } = require('ajv');
const exp = require('constants');

const ajv = new Ajv

test('Test Case 1 - GET Single User', async ({ request }) => {
    // cal api
    const response = await request.get('https://reqres.in/api/users/5')

    const responseData = await response.json()
    expect(response.status()).toBe(200)

    // assertion
    expect(responseData.data.id).toBe(5)
    expect(responseData.data.email).toBe('charles.morris@reqres.in')
    expect(responseData.data.first_name).toBe('Charles')
    expect(responseData.data.last_name).toBe('Morris')

    const valid = ajv.validate(require('./jsonschema/get-object-schema.json'), responseData)
    
    // Log errors if validation fails
    if (!valid) {
        console.log("AJV Validation Error:", ajv.errorsText());
        console.log("Detailed Errors:", ajv.errors);
    }
    expect(valid).toBe(true);

})

test('Test Case 2 - POST User', async ({ request }) => {
    const headersData = {
        Accept: 'application/json'
    }

    const bodyData = {
        "name": "Sherina Eria",
        "job": "QA Engineer"
    }

    const response = await request.post('https://reqres.in/api/users', {
        headers: headersData,
        data: bodyData
    })


    // assertion
    const responseData = await response.json()
    expect(response.status()).toBe(201)

    expect(responseData.name).toBe('Sherina Eria')
    expect(responseData.job).toBe('QA Engineer')

    const valid = ajv.validate(require('./jsonschema/post-object-schema.json'), responseData)
    if(!valid){
        console.log("AJV Validation Errors:", ajv.errorsText())
    }
    expect(valid).toBe(true);
})  


test('Test Case 3 - PUT User', async ({ request }) => {
    const bodyData = {
        "name": "Sherina Eria H",
        "job": "Senior QA Engineer"
    };

    const response = await request.put('https://reqres.in/api/users/2', {
        data: bodyData
    });

    const responseData = await response.json();
    expect(response.status()).toBe(200);

    expect(responseData.name).toBe('Sherina Eria H')
    expect(responseData.job).toBe('Senior QA Engineer')
    
    const valid = ajv.validate(require('./jsonschema/put-object-schema.json'), responseData)

    if(!valid){
        console.log("AJV Valitaion error", ajv.errorsText())
    }
    expect(valid).toBe(true)
})

test('Test Case 4 - DELETE User', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2')

    expect(response.status()).toBe(204)

    //const valid = ajv.validate(require('./jsonschema/delete-object-schema.json'), responseData)


})

