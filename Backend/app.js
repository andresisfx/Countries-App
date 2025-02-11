import express from "express";
import cors from "cors";
import morgan from "morgan";
import availableCountriesrouter from "./src/routes/AvailableCountriesRoutes.js";
import countryInfoRouter from "./src/routes/CountryInforoutes.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))



app.use("/api/countries",availableCountriesrouter)
app.use("/api/countries",countryInfoRouter)



app.listen(3001,()=>{
    console.log("server runninig on port 3001")
})