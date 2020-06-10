var express=require("express");
var mysql=require("mysql");
var bodyParser=require("body-parser");
var ejs=require('ejs')
var app=express();

app.use(express.static(__dirname + '/contoller/views'));
app.use(express.static(__dirname + '../public'));
app.set('view engine', 'ejs'); 
app.use(express.json());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( { extended: true }));


//connect knex mysql database
var conn={
    host: "localhost",
    user: "root",
    password: "aijaj123",
    database: "green_silk"
}

var knex=require("knex")({
    client : "mysql", connection : conn
})  

//create tourist_table
knex.schema.hasTable('tourist_table')
.then((exists)=>{
    if (!exists) {
        knex.schema.createTable('tourist_table', (table)=> {
        table.increments('id').primary();
        table.string('firstname');
        table.string('lastname');
        table.string('upload_image');
        table.string('email').unique();
        table.integer('phone');
        table.string('fields');
        table.integer('User_Age');
        table.string('Join_date');
        table.string('leaving_date');
        table.string('response');
        table.string('group_bio');
        table.string('country');
        table.string('Languages');
        table.string('more_languages');
        // table.string('correct_time');
        table.string('short_bio');
        table.string('skills');
        console.log("tourist table successfully!");
      })
      .catch((err)=>{
        console.log("error while create table", err)
    })
    }else{
        console.log("tourist table allready exist")
    }
  });
  

//  create organisation table
knex.schema.hasTable("organisation_table")
.then((exists)=>{
    if(!exists){
        knex.schema.createTable("organisation_table", (table2)=>{
            table2.increments("id").primary();
            table2.string("organisation_name");
            table2.string("website_link");
            table2.string("user_profile")
            table2.string("email").unique();
            table2.integer("phone");
            table2.string("address");
            table2.string("works");
            table2.string("work_2");
            table2.string("fields");
            table2.integer("volenteer");
            table2.string("language");
            table2.string("more_languages");
            table2.string("response");
            table2.string("description");
            table2.string("need");
            table2.string("correct_time");
            console.log("organisation table create successfully!")
        })
        .catch((err)=>{
        console.log(err)
        })  
    }else{
        console.log("organisation table allready exists")
    }
})


//rounter connect
const router=express.Router()
app.use('/', router)
require('./controller/fronted')(router, knex)

app.use('/', router)
require('./controller/backend')(router, knex) 

//connect port
var port=4500;
app.listen(port,()=>{
    console.log("server is listening ",port);
})