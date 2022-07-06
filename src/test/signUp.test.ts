import request from 'supertest';
import express from 'express';
import router from '../routes'
import { faker } from '@faker-js/faker';
import { json, urlencoded } from 'body-parser'
import {MONGO_URL} from "../utils";
const mongoose = require('mongoose');

const app = new express();

app.use(json())
app.use(urlencoded({ extended: false }));
app.use(router);


beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('>> SignUp testing group', () => {

    test('Should create users and return your data', async () => {
        const user = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.datatype.uuid(),
            phones: [{
                number: faker.phone.number(),
                ddd: faker.datatype.number(100).toString()
            }]
        }
        const response = await request(app).post('/signUp').type("form").set('Content-type', 'application/json').send(user)
        expect(response.statusCode).toBe(201)
    })
})
