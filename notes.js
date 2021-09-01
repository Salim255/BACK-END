//*USER Authenticatin and Authorization*//
//There are many authentication methodes but  the that we are gonna use is a very modern and simple...
//and secure approche called=> (Json Web Tokens or JWT for short).

//*Json Web Tokens or JWT*//
//Are stateless solution for authentication, so therer is no need to store any session state on the server.
//npm install jsonwebtoken

//The concept of loggin in a user it just to sign a JSON WEB TOKEN and then send it back to the client, and we only issure the Token in case the user is actually exist and the pasword is correct
