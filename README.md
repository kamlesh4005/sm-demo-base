# HL_BackendAPI
Backend APIs for High Level Assignment

## Calendar Appointment System

The Calendar Appointment System is a web application that simplifies the process of booking appointments. Users can view available time slots and book appointments accordingly.

## Table of Contents
- Introduction
- Features
- Technologies Used
- Getting Started
- API Documentation
- Deployment
- MongoDB Indexes
- Contributing
- License

## Introduction

The purpose of this application is to provide appointment booking between people by providing an interface to see available time slots and book appointments accordingly.

## Features

- View available time slots.
- Book appointments for a specific time slot.
- Get a list of booked appointments within a date range.

## Technologies Used

The project uses the following technologies:

- Node.js/Express.js for the backend server.
- MongoDB for data storage.
- React.js for the frontend application.

## Getting Started

Follow these steps to set up the project locally:

1. Clone the repository:

   git clone https://github.com/kamlesh4005/HL_BackendAPI.git
   
   cd HL_BackendAPI

3. Prepare a .env file and save the below environment variables:

   DBUSERNAME=YOUR_DATABASE_USER_NAME
   PASSWORD=YOUR_DATABASE_PASSWORD
   PROJECT=YOUR_DATABASE_INSTANCE_ID
   CORS_URL=SUPPORTED_CORS_URL
   REQUEST_LIMIT=REQUEST_LIMITS_PER_5_MINUTES

5. Update the PORT and configs at the config.json file.

6. Start the app via - node index.js (Or you can use pm2 as well as - pm2 start index.js)

7. The FrontEnd's build is already available within the repo, under the client folder. To update it, follow these instructions:

   a. Set up the FrontEnd repo in your local from - https://github.com/kamlesh4005/HL_FrontEndCode
   b. Follow the instructions in its readme.md file.
   c. Build this code via - npm run build.
   d. Replace all content inside the build folder (HL_FrontEndCode) with the client folder (HL_BackendAPI).
   e. Restart the backend code.

## API Documentation

The backend API has the following endpoints:

- GET /api/free-slots: Get a list of available time slots for a given date and timezone.
- POST /api/events: Book an appointment for a specific date and time slot.
- GET /api/events: Get a list of booked appointments within a date range.

### Request Parameters

#### Get Free Slots (/api/free-slots)
- startDate: The start date to retrieve available time slots.
- endDate: The end date to retrieve available time slots.
- timezone: The timezone in which the user wants to view available time slots.

#### Book Event (/api/events)
- title: The title of the appointment.
- startTime: The start time of the appointment.
- timezone: The timezone in which the user wants to book the appointment.

#### Get Events (/api/events)
- startDate: The start date to retrieve booked appointments.
- endDate: The end date to retrieve booked appointments.
- skip: The number of results to skip (optional).
- limit: The maximum number of results to return (optional).

## Deployment

The application is deployed on Google Cloud Platform (GCP). Access this application at - http://35.244.26.177:3005/.

## MongoDB Indexes

To optimize database queries, make sure to create the following indexes in your MongoDB database:

- events collection:
  - Index on { startTime: -1, endTime: -1 } with background: true.
  - Index on { startTime: -1 } with background: true.

You can create these indexes using the provided script in Models/scripts/createIndex.js.

Follow this command to run this script:
mongo "mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>" Models/scripts/createIndex.js 
