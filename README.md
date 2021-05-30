# Project AKIRA

This is a simple dynamic listsing website created for Dreamschools. The bread and butter of this project consists of React for the frontend and Express for the backend, written in TypeScript for added type safety. The data is stored in the cloud, using an AWS RDS PostgreSQL database and an AWS S3 image bucket.

## Live Demo

This application (React frontend) is deployed at http://projectakira.herokuapp.com/.

The API (Express backend) is deployed at http://projectakira-api.herokuapp.com/.

## Pages

### Home

![Home page](https://i.imgur.com/zvyzOep.png)

- Hovering over a school preview causes the white overlay and the text "VIEW" to appear over it

### School

![School page 1](https://i.imgur.com/18ShHTR.png)
![School page 2](https://i.imgur.com/9j7b86o.png)

### Submissions

![Submissions page 1](https://i.imgur.com/eVMMcPL.png)
![Submissions page 2](https://i.imgur.com/jaslgxm.png)

## Frontend Dependencies

```json
    "@reduxjs/toolkit": "^1.5.1",
    "@testing-library/jest-dom": "^5.12.0",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "@types/jest": "^26.0.23",
    "@types/node": "^12.20.13",
    "@types/react": "^17.0.8",
    "@types/react-dom": "^17.0.5",
    "@types/react-redux": "^7.1.16",
    "axios": "^0.21.1",
    "bootstrap": "^5.0.1",
    "bootstrap-icons": "^1.5.0",
    "http-status-codes": "^2.1.4",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "typescript": "^4.3.2",
    "web-vitals": "^1.1.2"
```

## Frontend Project Structure

```
src/
└───components/
    └───routes/
└───models/
└───pages/
└───redux/
└───utils/
    └───constants/
```

- `components/` contains shared components between pages
  - `components/routes/` contains the routes defined for the client-side
- `models/` contains the interface for the data to be transferred between frontend/backend
- `pages/` contains the pages displayed on the UI
- `redux/` contains all the state management logic
- `utils/constants/` contains useful constants. In particular, the URL for the backend API

## Database Schema (School)

| id       | name           | about  | location | admission | image          |
| -------- | -------------- | ------ | -------- | --------- | -------------- |
| `SERIAL` | `VARCHAR(255)` | `TEXT` | `TEXT`   | `TEXT`    | `VARCHAR(255)` |

- id is the PRIMARY KEY
- image is the URL to the S3 stored image

## API Endpoints

### Schools

- `GET /schools/` — returns all schools
- `POST /schools/` — create a new school
- `GET /schools/:id` — returns a single school by id
- `PUT /schools/:id` — updates a school by its id
- `DELETE /schools/:id` — deletes a school by its id

When using POST/PUT to create/update a school, the format must be formdata, with the following schema:

```typescript
{
  name: string; // 0-255 char in length
  about: string;
  location: string;
  admission: string;
  image: Blob; // uploaded file of image
}
```

## Backend Dependencies

```json
    "aws-sdk": "^2.918.0",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "http-status-codes": "^2.1.4",
    "multer": "^1.4.2",
    "pg": "^8.6.0"
```

## Backend Project Structure

```
src/
└───data/
└───models/
└───routers/
└───scripts/
└───services/
```

- `data/` contains the connections to the PostgreSQL database and the AWS S3 Bucket
- `models/` contains the interface for the data to be transferred between frontend/backend
- `routers/` contains the route controllers to intercept HTTP requests and define the REST endpoints
- `scripts/` contains useful scripts. In particular, a script to create the database table
- `services/` contains the service layer, which interacts with the database

## Local Installation

1. Download / clone the repository.
2. cd to frontend and backend directories and run `npm install` to install the respective dependencies.
3. Create an AWS account and set up a PostgreSQL RDS database and a S3 bucket to store images.
4. Set up a `.env` file in the `projectakira-api/` directory with the following values:

```
PGUSER='your postgres database username'
PGHOST='your postgres database host'
PGPASSWORD='your postgres database password'
PGDATABASE='your postgres database name'
PGPORT='your postgres database port'
AWS_ACCESS_KEY_ID='your aws access key id'
AWS_SECRET_ACCESS_KEY='your aws secret access key'
AWS_BUCKET_NAME='your aws s3 bucket name'
NODE_ENV=development
```

5. Run the command `npm run dev` in the api directory and `npm start` in the web directory
6. The frontend should now be running on http://localhost:3000/ and the backend on http://localhost:5000/!
