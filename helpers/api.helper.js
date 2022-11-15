const supertest = require('supertest');
const myKey =`0a0e096ea37793921a8927e457759e76`;
const myToken=`08005c2416e01f12edd1f279e6c83d05f0fb06a38b47c84be951b763fa2ba0b7`;
const auth= `key=${myKey}&token=${myToken}`;

//const res= await request.get(`members/me/?${auth}`);
const sendRequest = async(url, method="get", data=null) => {
    try{
        const request = supertest(`https://api.trello.com/1/`);
        let response;
        if(method==='get'){
            response = await request
            .get(`${url}/?${auth}`)
            .set()
            .send(data);
            
        }
        if(method==='post'){
            response = await request
            .post(`${url}/?${auth}`)
            .send(data);
            
        }
        if(method==='put'){
            response = await request
            .put(`${url}/?${auth}`)
            .send(data);
        }
        if(method==='delete'){
            response = await request
            .delete(`${url}/?${auth}`)          
        }
        console.log("---", response);
        return {
            status: response.status,
            data: response.body
        };

    } catch(error){
        return {
            status: error.response.status
        };
    }
};


module.exports= {
    sendRequest
};