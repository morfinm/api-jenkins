const {sendRequest}=require('../helpers/api.helper');
const {expect}=require('chai');

describe('trello tests',() =>{
    let boardName;
    let id;

    it('1- GET - get all my boards', async() =>{
        const response=  await sendRequest(`members/me/boards`,'get');
        //console.log("response: ",response);
        console.log(JSON.stringify(response,null,3))
        expect(response.data).not.to.be.empty;
        expect(response.status).to.be.equals(200); 
    });

    it('2- POST -Create a board', async() =>{
        boardName='MyBoard3'
        let data= {name:boardName};
        const response= await sendRequest(`boards`,'post',data);
        //console.log("response: ",response);
        console.log(JSON.stringify(response));
        expect(response.data).not.to.be.empty;
        expect(response.status).to.be.equals(200);

    });
    //63375156d287440218f0f592
    it('3- PUT - Update a board name', async() =>{
        id='6335ea85eece5d021f7026c7'; //hardcoded id/ retreived form DB records usually

        let reponseBoard = await sendRequest(`members/me/boards`,'get'); //get boards
        //console.log("myBoard--- ",reponseBoard.data);
        id=reponseBoard.data[0].id; //getting the id of the board on the top
        console.log("myBoard ID--- ",id);
        
        //put request to edit name
        let data= {name:'MyBoard2Updated'};
        const response= await sendRequest(`boards/${id}`,'put',data);
        console.log("response: ",response);
        expect(response.data.name).to.be.equals('MyBoard2Updated');
        expect(response.status).to.be.equals(200);

    });
    it('3- Delete - delete MyBoard2Updated', async() =>{
        
        id='6335ea85eece5d021f7026c7'; //hardcoded id/ retreived form DB records usually

        let reponseBoard = await sendRequest(`members/me/boards`,'get'); //get boards
        console.log("myBoard--- ",reponseBoard.data);
        id=reponseBoard.data[0].id; //getting the id of the board on the top
        console.log("myBoard ID--- ",id);

        const response= await sendRequest(`boards/${id}`,'delete');
        console.log("response: ",response);
        
        expect(response.status).to.be.equals(200);
        
        let reponseBoardAfter = await sendRequest(`members/me/boards`,'get'); //get boards
        console.log("myBoards after--- ",reponseBoardAfter.data);
        expect(JSON.stringify(reponseBoardAfter.data)).not.contains(`id: '${id}'`); //review is not there
        
    });
});