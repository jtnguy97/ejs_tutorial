const express = require("express");
const app = express();

//to get working directories need path
const path = require('path');
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

//if you want to run ejs in any director you need to set the view directory
//taking current directory(index.js) and joining the path name to views
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    //name of our EJS engine, default is inside directory "views"
    res.render('home');
})

app.get('/cats', (red, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats });
})


app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    
//check test case error, check if there is a subreddit first. otherwise display error 
    if(data){
        //spreading data will allow you to access the properties of redditData 
        res.render('subreddit', { ...data });
    }
    else{
        res.render('notfound', { subreddit })
    }




})

//you can pass in another parameter, when the template is rendered, have access to a variable called rand
app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    //num variable is set to rand in EJS file
    res.render('random', { num });
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})