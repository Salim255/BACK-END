//*USER Authenticatin and Authorization*//
//There are many authentication methodes but  the that we are gonna use is a very modern and simple...
//and secure approche called=> (Json Web Tokens or JWT for short).

//*Json Web Tokens or JWT*//
//Are stateless solution for authentication, so therer is no need to store any session state on the server.
//npm install jsonwebtoken

//The concept of loggin in a user it just to sign a JSON WEB TOKEN and then send it back to the client, and we only issure the Token in case the user is actually exist and the pasword is correct


//NODE MAILLERE p:135

//npm i nodemailer

////*********SECUROTY BEST PRACTICE AND SUGGESTIONS ****//

///A)COMPROMISED DATABASE(MEANING that an attacker gained access to our database)
//1)Strongly encrypt passwords withsalt and hash (bcrypt)
//2)Strongly encrypt password rest tokens (SHA256)

///B)BRUTE FORCE ATTACKS(wher the attacker tries to guess a password by trying millions and millions of random passwords until they find the right one)
//1)Use bcrypt (to make login requests slow)
//2)Implement rate limiting (express-rate-limit)
//3)Implement maximum login attemts

///C)CROSS-SITE SCRIPTING(XSS)ATTACKS(Wher the attacker tries to inject scripts into our page to run his malicious code, so the can read the local storage, thats why we should never ever store the JSON web token in the local storage, instead, it should be stored in an HTTPOnly cookies )
//1)STORE JWT in HTTPOnly cookies
//2)Sanitize user input data
//3)Set special HTTP headers(helmet package)


///D)DENIAL-OF-SERVICE(DOS)ATTACK(It happens when the attacker sends so many request to a server that it breaks down and the application became  unavailable)
//1)Implementing rate limiting (express-rate-limit)
//2)Limt body payload(in body-parser)
//3)Avoid evil regular expressions

///E)NOSQL QUERY INJECTION
//1)Use mongoose for MongoDB(because of Shema Types)
//2)Sanitize user input data

///F)OTHER BEST PRACTICE AND SUGGESTIONS:
//1)Always use HTTPs
//2)Create random password rest tokens with expiry dates
//3)Deny access to JWT after password change
//4)Dont commit sensetive config data to Git
//5)Dont send error details to clients
//6)Prevent Cross-Site Request Forgery(csurf package) 
//7)Require re-authentification before  a high-value action
//8)Implement a blacklist of untrusted JWT
//9)Confirm user email address after firstcreating account
//10)Keep user logged in with refresh tokens
//11)Implement two-factor authentification
//12)Prevent parameter polution causing Uncaught Exception

//npm i express-rate-limit

//****For Security HTTP Header ****//  
      //npm i helmet


////***DATA Sanitization***////
///Means to clean all the data comes into the application from malicious code
//npm i express-mongo-sanitize
//npm i xss-clean

////*****PARAMETERS POLUTIONS ****/////
///
//npm i hpp

////*****GEOSPATIAL DATAT****/////
///It-s data that describes places on earth using longitude and latitude coordinates.


//////***EMBADDING ***//////
///Emadding user documents into tours documents

/////**CHILD REFERENCING *////


////***POPULATING IN ORDER TO GET ACCESS TO REFRENCING TOUR GUIDS USING IDs ***////