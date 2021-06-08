// npm i ejs - for templating systems
// npm i nodemailer (for emails)
const express = require('express');
const mongoDb = require('./models/mongodb');
const app = express();
const emailsender = require('./models/emailSender');

//connect to database
mongoDb.connect().then(() =>{
    console.log('Connect to database');
}).catch(error =>{
    console.log('connnection to database failed');
    console.log(error);
})

const port = process.env. PORT || 3000;// the server chooses dinamically OR (I dont have a server I use the port 3000)

// make any file inside public folder accessible without creating routes for each file
app.use(express.static(__dirname + '/Public'));

//set middleware to be able to get POSTED data
//If extended is false, you cannot post "nested object"
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//use fecht for json

//set ejs as a view engine
app.set('view engine','ejs');
//set the views folder
app.set('views', __dirname + '/views');

app.get('/', (req,res)=> {
    //console.log(__dirname);
    //res.sendFile(__dirname + '/views/index.html');
    res.render('index');
})

app.get('/about', (req,res)=> {
    //console.log(__dirname);
    //res.sendFile(__dirname + '/views/about.html');
    res.render('about');
})

app.get('/blog', (req,res)=> {
    //console.log(__dirname);
    //res.sendFile(__dirname + '/views/blog.html');
    mongoDb.getComments().then(comments =>{
        res.render('blog', {commentsArr: comments});

    }).catch(error =>{
        console.log(error);
        res.render('blog',{commentsArr: []});
    })
   
});

app.post('/blog', (req, res)=>{
    console.log(req.body);
//push new data to commentArr
   /*  commentsArr.push({
        name:req.body.name,
        commentDate: new Date(),//doesnt work with Date.now()
        comment: req.body.comment
    }); */
//send data to database
mongoDb.addComment(req.body.name, new Date(), req.body.comment, req.body.email).then(() =>{
    
    mongoDb.getComments().then(comments =>{
        res.render('blog', {commentsArr: comments});

    }).catch(error =>{
        console.log(error);
        res.render('blog',{commentsArr: []});
    })
   
}).catch(error =>{
    res.send(error.message);
})
    
})

app.get('/marketing', (req,res)=> {
    //console.log(__dirname);
    //res.sendFile(__dirname + '/views/marketing.html');
    res.render('marketing');
})
app.get('/contact', (req,res)=> {
    //console.log(__dirname);
    //res.sendFile(__dirname + '/views/contact.html');
    res.render('contact');
})

app.post('/contact',(req,res)=> {
    console.log(req.body);
    if(req.body.name.length < 50 && req.body.email.length < 50 && req.body.subject.length < 50 && req.body.message.length < 50) {

        emailsender.sendEmail(req.body.name, req.body.email, req.body.subject, req.body.message, (ok) => {
            if(ok){
                res.json(1);
            }else {
                res.json(2);
            }
        })
    } else {
        res.json(3);
    }
    
});

app.listen(port, ()=> {
    console.log(`App is running on port:${port}`) //string injection for dynamic way
})

//Per this article, the Unified Topology paradigm moves away from the concept of "connecting" and instead simply sets up a connection string and begins doing operations. Each operation then fails or succeeds depending on whether the driver can reach a server at the time that operation is executed. 
//https://github.com/ahmad-dci/FBW8HH-Mentoring 