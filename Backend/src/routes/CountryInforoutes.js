import { Router } from 'express';
import { getCountryInfo } from '../controllers/CountryInfoControllers.js';

const countryInfoRouter = Router();

countryInfoRouter.get('/country-info/:code', getCountryInfo);

export default countryInfoRouter;
