# 📌 Project: Countries Full Stack Application&#x20;

This project is a full-stack application tha allows us to obtain useful information about any country. It was built by using **React** with Typescript  for the frontend and **Express** with javascript for the backend. Below are the steps to install, configure, and run the application.

---

## 🛠️ **Prerequisites**

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) (for package management)

---

## 🚀 **Installation**

### 1️⃣ Clone the repository

```sh
git clone https://github.com/andresisfx/Countries-App.git
```

### 2️⃣ Install dependencies

#### **Frontend**

```sh
cd frontend
npm install  
```

#### **Backend**

```sh
cd backend
npm install  
```

---

## 🔧 **Environment Variable Configuration**

Create a `.env` file in the root `frontend`  to define the necessary environment variables.

### 📌 **Frontend (********`frontend/.env`********\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*)**

```env
VITE_API_BASE_URL=http://localhost:3001/api/countries
VITE_AVAILABLE_COUNTRIES_ENDPOINT=/list
VITE_COUNTRY_INFO_ENDPOINT=/country-info/
```

###

---

## ▶️ **Running the Application**

### 1️⃣ Start the Backend

From the `backend` folder, run:

```sh
npm run dev  
```

The server will start at `http://localhost:3001`.

### 2️⃣ Start the Frontend

From the `frontend` folder, run:

```sh
npm run dev  
```

The client will run at `http://localhost:5173` (default for Vite).

---

## 🧪 **Format code**

To run ESLint and Prettier:

```sh
npm run lint  # Analyze the code with ESLint
npm run format  # Format the code with Prettier
```



---

## 📜 **Project Structure**

```
repo/
│── frontend/         # React application with Vite
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│── backend/          # API in Express.js
│   ├── src/
│   ├── .env
│   ├── package.json
│── .gitignore
│── README.md         # Documentation
```

---

## 📡 **API Endpoints**

### 🔹 **Get country information**

**GET** `/api/countries/country-info/:code`

**Example response:**

```json
{
    "country": "Colombia",
    "borderCountries": [
      {
        "commonName": "Brazil",
        "officialName": "Federative Republic of Brazil",
        "countryCode": "BR",
        "region": "Americas",
        "borders": null
      },
      {
        "commonName": "Ecuador",
        "officialName": "Republic of Ecuador",
        "countryCode": "EC",
        "region": "Americas",
        "borders": null
      }
      
    ],
    "population": [
      {
        "year": 1960,
        "value": 16057724
      },
      {
        "year": 1961,
        "value": 16567811
      },
      {
        "year": 1962,
        "value": 17092918
      }
      
      
    ],
    "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg"
  }
```

### 🔹 **Get all countries**

**GET** `/api/countries`

**Example response:**

```json
[
  { "code": "US", "name": "United States" },
  { "code": "FR", "name": "France" },
  { "code": "DE", "name": "Germany" }
]
```

