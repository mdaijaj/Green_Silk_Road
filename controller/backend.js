var pdf=require("pdfkit");
var fs=require("fs");
var ejs=require('ejs')
var nodemailer=require('nodemailer')

module.exports=( router, knex)=>{

    //volenteer backend api
    router.post('/postData_form', (req, res) => {             
        knex('tourist_table')
        .insert({id:null, firstname: req.body.firstname, lastname: req.body.lastname, upload_image: req.body.upload_image, email: req.body.email, phone: req.body.phone, fields: req.body.fields, User_Age: req.body.User_Age, Join_date: req.body.Join_date, leaving_date: req.body.leaving_date, response: req.body.response, group_bio: req.body.group_bio, country: req.body.country, Languages: req.body.Languages, more_languages: req.body.Languages_lists, short_bio: req.body.short_bio, skills: req.body.skills})
        .then(()=>{
            console.log(`data inserted successfully`);
            knex.select('*').from('tourist_table').where('email', req.body.email)
            .then((data)=>{
                const doc = new pdf();
                let filenames = JSON.stringify(data)
                var file=JSON.parse(filenames)

                //write file and same path and download
                doc.pipe(fs.createWriteStream(__dirname+ '/'+ file[0].firstname +'.pdf'));
                
                //pdf style size
                doc.fontSize(25).text(filenames, 100, 100)
                doc.end()
                
                // nodemailer
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 25,
                    auth: {
                        user: "aijaj18@navgurukul.org",
                        pass: "aijaj@#123"
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                var mailOptions = {
                    from: "aijaj18@navgurukul.org",
                    to: file[0].email.toString(),
                    subject: "Welcome to All Fedration Organisation",
                    text: "attach pdf file please have a look for confirmation",
                    attachments: [{
                        filename: file[0].firstname+'.pdf',
                        path: __dirname + '/' + file[0].firstname+'.pdf',
                        contentType: 'application/pdf'
                    }]
                };
                if (transporter.sendMail(mailOptions)) {
                    console.log("mail sent successfully!")
                    return res.sendFile(__dirname+'/views/submit.html');
                }else{
                    console.log("mail not sent")
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    })


    // organisation backend api
    router.post("/postData_organisation", (req, res) => {
        knex('organisation_table')
        .insert({id:null, organisation_name: req.body.organisation_name, website_link: req.body.website_link, user_profile: req.body.user_profile, email: req.body.email, phone: req.body.phone, address: req.body.address, works: req.body.works, work_2: req.body.work_2, fields: req.body.fields, volenteer: req.body.volenteer, language: req.body.vehicle, more_languages: req.body.Languages_lists,  response: req.body.negative, description: req.body.description, need: req.body.need, correct_time:new Date().toLocaleString()})
        .then((data)=>{
            console.log(`data inserted successfully`, data);
            return res.sendFile(__dirname+'/views/submit.html');
        })
        .catch((err)=>{
            console.log(err)
        })
    })


    //all show ngo data
    router.get('/all_ngo', (req,res)=>{
        knex.select('*').from('organisation_table')
        .then((data)=>{
            console.log(data)
            return res.render(__dirname + '/views/sample.ejs', {data: data})
        })
        .catch((err)=>{
            console.log(err)
        })
    })

}
