//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Over the next two years, Anne wrote faithfully in the diary, which she came to consider a friend, addressing many of the entries to “Dear Kitty.” In the journal and later notebooks, Anne recounted the day-to-day life within the annex. The close quarters and sparse supplies led to various arguments among the inhabitants, and the outgoing Anne came to find the conditions stifling. Heightening tensions was the ever-present concern that they would be discovered. However, many entries involve typical adolescent issues—jealousy toward her sister; annoyance with others, especially her mother; and an increasing sexual awareness. Anne wrote candidly about her developing body, and she experienced a brief romance with Peter van Pels. She also discussed her hopes for the future, which included becoming a journalist or a writer. In addition to the diary, Anne penned several short stories and compiled a list of “beautiful sentences” from other works.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];


app.get("/", function(req, res){
  res.render("home",{
    startingContex: homeStartingContent,
    posts: posts
  });

});


app.get("/about", function(req, res){
res.render("about", {aboutDetail: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactData: contactContent});
  });


app.get("/compose", function(req, res){
  res.render("compose",);
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
   const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,       
        content: post.content
      });
    }

  });

});




app.listen(3000, function() {
  console.log("Bruh! You Started The Server");
});
