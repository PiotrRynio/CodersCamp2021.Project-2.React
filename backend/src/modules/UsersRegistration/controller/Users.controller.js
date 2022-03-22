import jwt from 'jsonwebtoken';
import { request, response, Router } from 'express';
import { UserRegistration } from '../service/UserRegistration.js';
import { UserLogIn } from '../service/UserLogIn.js';

export class UsersController {
  constructor(service) {
    this.service = service;
    this.router = Router();

    this.router.route('/sign-up').post((request, response) => {
      this.service
        .signUp(
          new UserRegistration({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password,
          }),
        )
        .then((email) => {
          const returnedData = { email: email };
          response.status(200).send(returnedData);
        })
        .catch((error) => {
          response.status(400).send({ message: error.message });
        });
    });

    this.router.route('/log-in').post((request, response) => {
      this.service
        .logIn(
          new UserLogIn({
            email: request.body.email,
            password: request.body.password,
          }),
        )
        .then((data) => {
          const payload = { email: data.email };
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
          response
            .cookie('auth_token', token, { httpOnly: true, maxAge: 3600000, secure: false })
            .status(200)
            .send({
              tokenString: token,
              authorized: true,
              email: data.email,
              avatarUrl: data.avatarUrl,
            });
        })
        .catch((error) => {
          response.status(400).send({
            authorized: false,
            message: error.message,
          });
        });
    });
    this.router.route('/logout').post((request, response) => {
      this.service
        .logOut(response)
        .then(() => {
          response.status(200).send('Successfully logged out!');
        })
        .catch((error) => {
          response.status(400).send();
        });
    });
  }
}
