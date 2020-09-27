# rumah-food-backend

This will serve as the backend API service


## Setup

Standard, `npm install` and `npm start` will get the ball rolling.

## System Config

All configurations are done via env variables. You can see the environment variables at `/config/index.js`. 

The reason for this would be that it will be make easier for us to do a CI/CD deploy going forward and configure the environment via build task in the future.


### Development

1. Launch Program - DEVL - PORT 3000
    1. Default development run configurations.
1. Launch Program - DEVL - PORT 3000 - Seed & Setup
    1. Same as `Launch Program - DEVL - PORT 3000`, just with additional setup and migration capability.
    1. Run this for your first time setting up your machine for development. It will setup your DB schema and seed data for first time use.
    2. You can also run this to perform alternations on your DB. The schema changes are achieved via the `{alter: true}` parameter in the ORM's `sync` routine.
