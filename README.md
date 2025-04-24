# Estate Ease Real Estate Platform
> A web application to help you find your next rental property.

The `_theme_files` folder contains the pure HTML files with Tailwind classes.


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

## Usage

- Create MongoDB Atlas account and a cluster. [MongoDB](https://www.mongodb.com/)
- Create Cloudinary account. [Cloudinary](https://cloudinary.com/)

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
