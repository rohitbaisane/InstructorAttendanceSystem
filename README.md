# Welcome to Instructor Attendance System

## Project Setup
- Use node 16 version
- clone the project on your local
- Execute `npm install` from root of the project
- Create a `.env` file in the root directory and add the following environment variable
    - `PORT=3000`
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "Instructors_Attendance_DB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
- Once you've added your db config as listed above, go to the src folder from your terminal and execute followning commands one by one,
`npx sequelize db:create`
`npx sequelize db:migrate`
`npx sequelize db:seed:all`

- Once you've executed all the above commands execute `npm install` to run the project.

```

## DB Design
  - InstructorAttendance Table
  
## Tables

### InstructoerAttendance -> id, instructorId, checkInTime, checkOutTime, isCheckedIn, created_at, updated_at

```

 ## Assumptions

- I have made the following assumptions:
  - DateTime of in/out will be given in input. 
  - DateTime given in input can be invalid E.g:-( checkout time less then checkin time, checkin and checkout time overlapping with other time slots).
  - For every check in there will be a check out on same day.


## Api Documentation 
- Seeder will add multiple checkin and checkout data.

- GetMontlyReport:
```
   GET /api/get-monthly-report
   Query Parameters:
   {
      "month": String,
      "year": Number,
   }
```

- InstructorCheckIn: 
```
   POST /api/in

   {
     "instructorId": Number,
     "checkInTime": ISODateAndTimeString,
   }
```

- InstructorCheckOut:
```
   POST /api/out

   {
      "instructorId": Number,
      "checkOutTime": ISODateAndTimeString,
   }
```