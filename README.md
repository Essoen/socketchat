# socketchat
A simple chat application, written in Node with the help of [Socket.io](http://socket.io).

## Installation
    git clone git@github.com:Essoen/socketchat.git
    cd socketchat
    npm install
    
Now run `node app.js` from the folder `app`, and the app is served at `localhost:3000`.

## API
Some documentation for the communcation between the client and the server:

`login`-object:

    {
        username: String
    }
    
`users`-object is a list of usernames currently in the chat.
    
`msg`-object:

    {
        username: String
        msg: String
    }
    
`ctrl`-object:

    {
        msg: String 
    }

