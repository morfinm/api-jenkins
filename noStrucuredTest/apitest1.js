import supertest from 'supertest';
import {expect}from 'chai';
const myKey =`0a0e096ea37793921a8927e457759e76`;
const myToken=`08005c2416e01f12edd1f279e6c83d05f0fb06a38b47c84be951b763fa2ba0b7`;
const auth= `key=${myKey}&token=${myToken}`;
let url=`https://api.trello.com/1/`;
const request = supertest(url);

describe('trello tests REGULAR',() =>{
    
    it('1- Get my ID', async() =>{
        const res= await request.get(`members/me/?${auth}`);
        console.log("My ID: ",res.body.id);
        expect(res.body.id).not.to.be.empty;
        expect(res.statusCode).to.be.equals(200);
            
        

    });
});