// import express package for server access
import express from "express";

// import body parser package for parsing through posts
import bodyParser from "body-parser";

// create a constant app using expresss
const app = express();

// create a port 
const port = 3000;

// set up the app and body parser 
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static("public" ));


// create an array of posts to temporarily store information in
let posts = [];

// handle routing

// Create a home route that displays all the posts
app.get( "/", ( req, res ) => 
    {

    res.render("index", { posts });
    } );

// Route to the form submission to create a new post
app.post("/create", ( req, res ) => 
    {
    
    // declare a constant for title, content and author
    const { title, content, author } = req.body;
    
    // initialie a constant created at variable that stores the time the post was submitted
    const createdAt = new Date().toLocaleString();
    
    // push the information
    posts.push( { title, content, author, createdAt } );

    // redirect the page
    res.redirect("/");
    } );

// Route to display the preferences form, which edits the post
app.get( "/preferences/:title", ( req, res ) => 
    {
    
    // create a post title constant variable
    const postTitle = req.params.title;

    // create a constant post variale that finds the title
    const post = posts.find( ( p ) => p.title === postTitle );
    
    // if the post was found, render it
    if( post ) 
        {

        res.render("preferences", { post });
        }
    else
        {
        
        // otherwise redirect
        res.redirect("/");
        }

    } );

// Route to handle the update of a edited post
app.post( "/update", ( req, res ) =>
    {
    
    // create constants for the OG title, the new title, content and author
    const { originalTitle, title, content, author } = req.body;

    // create a post and find the title
    const post = posts.find( ( p )  => p.title === originalTitle);
    
    // if the post was found
    if ( post ) 
        {
        
        // assign the data to the const
        post.title = title;
        post.content = content;
        post.author = author;
        }

    // Redirect
    res.redirect( "/" );
    });

// Route to handle the event of deleting a post
app.post( "/delete", (req, res) =>
    {
    
    // create a constant for the title
    const { title } = req.body;
    
    // filter through the posts
    posts = posts.filter( ( post ) => post.title !== title );
    res.redirect( "/" );
    });

// listen to see if there is a port
app.listen(port, () => 
    {

    console.log( `Server running on port ${ port }.` );
    });
