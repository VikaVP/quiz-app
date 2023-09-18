<br />
<p align="center">

  <h3 align="center">Quiz App - Backend</h3>

  <p align="center">
    <br />
    <a href="https://github.com/VikaVP/quiz-app"><strong>Explore the docs »</strong></a>
    <br />
    ·
    <a href="https://github.com/VikaVP/quiz-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/VikaVP/quiz-app/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contact](#contact)


## Built With

- [Express JS](https://expressjs.com/)
 
  <!-- GETTING STARTED -->

## Getting Started

```
## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name note, and Import file [note.sql](quiz.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_HOST=[your_database_host]
DB_PORT=[your_database_port]
DB_USER=[your_database_username]
DB_PASS=[your_database_pass]
DB_NAME=quiz

BASE_URL=http://localhost:8080/

SECRET=[jwt_secret_key]

You can login as administrator with this account : { email: admin@gmail.com, password: Admin123 }

## End Point

**1. Auth**
  * **POST** `/api/v1/auth/register`
  * **POST** `/api/v1/auth/login`

**2. Quiz**
  * **GET** `/api/v1/quiz`
  * **POST** `/api/v1/quiz/add`
  * **PUT** `/api/v1/quiz/update`
  * **DELETE** `/api/v1/quiz/:id`
  * **GET** `/api/v1/quiz/timer`
  * **PUT** `/api/v1/quiz/timer`
  * **GET** `/api/v1/quiz/try`
  * **GET** `/api/v1/quiz/try/:id`

**3. Users**
  * **GET** `/api/v1/users`
  * **POST** `/api/v1/users/add`
  * **PUT** `/api/v1/users/update`
  * **DELETE** `/api/v1/users/:id`

```

### Prerequisites

- Node Js

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/VikaVP/quiz-app.git
```

2. Install NPM packages

```sh
npm install
```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

email me - [@vika_vp](vikavp0@gmail.com) - vikavp0@gmail.com

Project Link: [https://github.com/VikaVP/quiz-app](https://github.com/VikaVP/quiz-app)