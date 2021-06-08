const ejs = require('ejs');
const nodemailer = require('nodemailer');
 //transporter of the data
const transporter = nodemailer.createTransport({
    host: "mail.coding-school.org",
    port: 465,
    //secure: true, // use TLS
    auth: {
        user: "fbw8@coding-school.org",
        pass: "!234qweR"
    },
    tls: {
    // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
      
function sendEmail(name, email, subject, message, callback){
    const mailOption = {
        from: "bw8@coding-school.org",
        to: 'elizgiffey@gmail.com',
        subject:'email from your website',
        html: ejs.renderFile(__dirname + '/email-template.ejs',{subject,name,email, message}, (error, text) => {
            const mailOption = {
                
            }
        }),
        
    };
    //fbw8@coding-school.org
    transporter.sendMail(mailOption, (error, info)=> {
        if(error){
            console.log(error);
            callback(false);
        }else{
            console.log(info);
            callback(true);
        }
    })
}
 module.exports = {
     sendEmail
 }
