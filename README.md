# socketchat
A simple chat application, written in Node with the help of [Socket.io](http://socket.io).

## Setup
    git clone git@github.com:essoen/socketchat.git
    cd socketchat
    npm install

Now run `npm start` and reach the app on `localhost:3000`.

### Run with Docker
Run with `docker run -t essoen/socketchat npm start`.

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
