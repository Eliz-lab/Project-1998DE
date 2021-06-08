const{MongoClient} = require('mongodb'); //destructuring
//connect, get, close the db- the process
const connectionString ='mongodb+srv://Eliz:D3Gs6uFtIG9uLHog@cluster0.u2oaa.mongodb.net/Blog?retryWrites=true&w=majority';
//Sync await//callbacks//promisses - check the differences
let client;

function connect(){
    return new Promise((resolve, reject) =>{
        MongoClient.connect(connectionString,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(con =>{
            client = con;
            resolve();
        }).catch(error => {
            reject(error);
        });
    })
} //check if collection is comment or comments
function addComment(name, commentDate, comment, email){
    return new Promise((resolve, reject) => {
        const db = client.db('Blog');
        db.collection('comments').insertOne({
            name: name,
            commentDate: commentDate,
            comment: comment,
            email:email
        }).then(response => {
            if(response.result.ok){
                resolve();
            }else {
                reject();
            }
        }).catch(error => {
            reject(error);
        })
    });
}

function getComments(){
    return new Promise((resolve, reject)=> {
        const db = client.db('Blog');
        //find method gonna return all docs inside the collection
        db.collection('comments').find().toArray().then(comments =>{
            resolve(comments);
        }).catch(error => {
            reject(error)
        })
    })
}

module.exports = {
    connect,
    addComment,
    getComments
}