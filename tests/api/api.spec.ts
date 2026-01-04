import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing', () =>  {

    const baseUrl = 'https://reqres.in/api'
    const authToken = 'QpwL5tke4Pnpja7X4'

    test('Simple API Test - Assert response status', async({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`, {headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
    })

     test('Simple API Test - Assert Invalid Endpoint', async({ request }) => {
        const response = await request.get(`${baseUrl}/users/nonexisting`, {headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        expect(response.status()).toBe(404)
    })

    test('Get Request - Get User Detail', async({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`, {headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST request - Create New User', async({request}) => { 
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 1000,
            },
            headers: {'Authorization': `Bearer ${authToken}`
            }
        })
        
        expect(response.status()).toBe(201)
        const responseBody = await JSON.parse(await response.text())
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST request - Login', async({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
            headers: {'Authorization': `Bearer ${authToken}`
            }
        })
        expect(response.status()).toBe(200)
        const responseBody = await JSON.parse(await response.text())
        console.log(responseBody)
        expect(responseBody.token).toBeTruthy()
    })

     test('POST request - Login Failed', async({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@gmail.com',
            },
            headers: {'Authorization': `Bearer ${authToken}`
            }
        })
        expect(response.status()).toBe(400)
        const responseBody = await JSON.parse(await response.text())
        expect(responseBody.error).toBe('Missing password')
    })

    test.only('PUT request - Update User', async({request}) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data:{
                name: 'MS',
                job: 'Tester'
            },
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('MS')
        expect(responseBody.job).toBe('Tester')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE request - delete user', async({request}) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(203)
    })
})