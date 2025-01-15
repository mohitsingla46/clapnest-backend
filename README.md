
# NestJS ClapNest Project

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

A NestJS project demonstrating JWT authentication, role-based access control, and API documentation using Swagger.

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least these components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) such as 20.x and NPM

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone <repository-url>
```

The next thing will be to install all the dependencies of the project.

```sh
cd <project-folder-name>
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing the environment variables used for development.

```
cp .env.example .env
```

Define a `JWT_SECRET` to sign the JWT tokens and `MONGODB_URI` to connect to MongoDB database.

Now you need to seed the database using the following command.

```
npm run seed
```

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server
npm run start:dev
```

You can now head to `http://localhost:5000/api` and see your API Swagger docs.

## 2. Project goals

The goal of this project is to provide a clean and up-to-date "starter pack" for REST API projects that are built with NestJS.

## 3. Contributing

Feel free to suggest an improvement, report a bug, or ask something.