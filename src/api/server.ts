let token = 'af791673a8320743f3b18918e75c96782c38d8295582e69b';
let base_url = 'https://drone-homies.herokuapp.com/'

export const server_calls = {
    get: async () => {
        const response = await fetch(`${base_url}/api/drones`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            
        });
        // checking to make sure fetch received data
        if (!response.ok){
            throw new Error('Failed to fetch data from the server!')
        }
        return await response.json()
    },
    create: async (data:any = {}) => {
        const response = await fetch(`${base_url}/api/drones`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`  
            },
            body:JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Failed to create a drone in the database!')
        }
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`${base_url}/api/drones/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Failed to edit drone data in the database!')
        }
    },
    delete: async (id:string) => {
        const response = await fetch(`${base_url}/api/drones/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
        if (!response.ok){
            throw new Error('Failed to delete a drone from the database!')
        }
    }
};