# Estate Ease Real Estate Platform
> A full stack web application to help you search for your next rental property.

<img src="./frontend/public/screen.png">

## Features

- User authentication with Google & Next Auth
- User authorization
- User profile with user listings
- Property Listing CRUD
- Property image upload (Multiple) with Cloudinary
- Property search
- Internal messages with 'unread' notifications
- Photoswipe image gallery
- Property bookmarking / saved properties
- Property sharing to social media

## Technologies Used
  <p>
      <a href="#"><img alt="React" src="https://img.shields.io/badge/React-20232a.svg?logo=react&logoColor=%2361DAFB"></a>
      <a href="#"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white"></a>
      <a href="#"><img alt="Spring Boot" src="https://img.shields.io/badge/Spring_Boot-6DB33F.svg?logo=springboot&logoColor=white"></a>
      <a href="#"><img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-4ea94b.svg?logo=mongodb&logoColor=white"></a>
      <a href="#"><img alt="Cloudinary" src ="https://img.shields.io/badge/Cloudinary-00F.svg?logo=cloudinary&logoColor=white"></a>
  </p>

## Usage

- Create [MongoDB](https://www.mongodb.com/) Atlas account and a cluster.
- Create [Cloudinary](https://cloudinary.com/) account. 

Add a `.env` file in the `backend/propertyapp/src/main/resources` and add the following

```
MONGO_DATABASE= YOUR MONGO DB NAME
MONGO_URI= YOUR MONGO DB URI
CLOUDINARY_URL= YOUR CLOUDINARY API KEY
```

### Install Dependencies

```bash
cd frontend/
npm install
```

### Run the Frontend Development Server

```bash
cd frontend/
npm run dev
```

### Run the Backend Development Server

```bash
cd backend/
./mvnw spring-boot:run
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## License

This project is licensed under the MIT License
