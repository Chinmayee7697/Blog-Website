//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to DAILY JOURNAL";
const aboutContent = "Welcome to Daily Journal, where passion meets purpose. We're more than just a blog; we're a community of curious minds, dedicated to sharing knowledge and inspiration with the world.";
const contactContent = "We value your feedback, questions, and ideas. Your input is essential in helping me improve and better serve your needs. Feel free to reach out to us through the following channels:";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/", (req,res)=>{
  res.render("home.ejs", {
    homeStartingContent:homeStartingContent,
    posts:posts});

});

app.get("/about", (req,res)=>{
  res.render("about.ejs", {aboutContent});
});

app.get("/contact", (req,res)=>{
  res.render("contact.ejs", {contactContent});
});

app.get("/compose", (req,res)=>{
  res.render("compose.ejs");
});

app.post("/compose", (req,res)=>{
  const blog={
    title: req.body.blogTitle,
    content: req.body.blog
  };
  posts.push(blog);
  res.redirect("/");
  
});

app.get("/posts/:customName", (req,res)=>{
  const requestedTitle = _.lowerCase(req.params.customName);
  posts.forEach(function(posts){
  const postedTitle= _.lowerCase(posts.title);
  if(requestedTitle === postedTitle ){
    res.render("post.ejs", {postedTitle, posts});
  }

})
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
