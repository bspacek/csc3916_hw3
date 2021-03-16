let envPath = __dirname + "/../.env"
require('dotenv').config({path:envPath});
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let User = require('../Users');
let Movie = require('../Movies');
chai.should();

chai.use(chaiHttp);

let login_details = {
    name: 'test',
    username: 'email@email.com',
    password: '123@abc'
}

let movie_details = {
    title: 'Test Movie',
    year: '0000',
    genre: 'test',
    actor: ['actor 1, character 1, actor 2, character 2, actor 3, character 3']
}

describe('Register, Login and Call Test Collection with Basic Auth and JWT Auth', () => {
   beforeEach((done) => { //Before each test initialize the database to empty
       //db.userList = [];

       done();
    })

    after((done) => { //after this test suite empty the database
        //db.userList = [];
        User.deleteOne({ name: 'test'}, function(err, user) {
            if (err) throw err;
        });
    })

    //Test the GET route
    describe('/signup', () => {
        it('it should register, login and check our token', (done) => {


          chai.request(server)
              .post('/signup')
              .send(login_details)
              .end((err, res) =>{
                console.log(JSON.stringify(res.body));
                res.should.have.status(200);
                res.body.success.should.be.eql(true);
                //follow-up to get the JWT token
                chai.request(server)
                    .post('/signin')
                    .send(login_details)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('token');
                        let token = res.body.token;
                        console.log(token);
                        console.log('Begin saving movie.');

                        chai.request(server)
                            .post('/Movie')
                            .send(movie_details)
                            .end((err, res) =>{
                            console.log(JSON.stringify(res.body));

                            console.log('Movie save finished.');

                            chai.request(server)
                                .get('/allMovies')
                                .send(movie_details)
                                .end((err, res) =>{
                                    console.log(JSON.stringify(res.body));
                                    res.should.have.status(200);
                                    res.body.success.should.be.eql(true);
                                })


                        })
                        done();
                   })
              })
        })
    });

});
