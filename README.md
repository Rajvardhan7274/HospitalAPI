
# Covid-19 Hospital API

An API created using NodeJS for the doctors of a hospital to cater to the need of the healthcare system during Covid-19.




## Run Locally

Clone the project

```bash
  

Go to the project directory

```bash
  cd Hospital-API-For-Covid-19
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

  
## Documentation


Routes :

    a. /doctors/register - Registers a new Doctor.
    b. /doctors/login - Authenticates and returns the JWT token to be used.
    c. /patients/register - Allows a doctor to register a new patient (JWT Auth enabled).
    d. /patients/:id/create_report - Allows a doctor to create a patients report (JWT Auth enabled).
    e. /patients/:id/all_reports - Sends all the reports of a patient oldest to latest. (JWT Auth enabled).
    f. /reports/:status - List of all the reports of all patients with a specific status. (JWT Auth enabled).

Data that needs to be sent with a route :
    
    a. /doctors/register - name, email, password (Form type data)
    b. /doctors/login - email, password (Form type data).
    c. /patients/register - JWT Token (In Headers), name, phone, age, sex, comorbidity status (Form type data).
    d. /patients/:id/create_report - JWT Token (In Headers), Patient's ID (params), status (Form type data).
    e. /patients/:id/all_reports - JWT Token (In Headers), Patient's ID (params).
    f. /reports/:status - JWT Token (In Headers), status (params).

Folder Structure

    a. index.js - Server runs here
    b. models - Contains all the models for Doctor, Patient, Report.
    c. routes - Contains all the routes.
    d. controllers - Contains all the controllers.
    e. config - Contains all the config files.
