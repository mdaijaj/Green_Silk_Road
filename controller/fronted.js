module.exports=(router, knex)=>{

    router.get("/mainPage", (req, res) => {                        
        return res.sendFile(__dirname+"/views/mainPage.html");    //end points
    })
    
    router.get('/contact_form', (req, res)=>{
        res.sendFile(__dirname + '/views/contact_form.html')
    })
    
    router.get('/organisation', (req,res)=>{
        res.sendFile(__dirname + '/views/organisation.html')
    })
}

