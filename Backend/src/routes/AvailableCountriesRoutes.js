import { Router } from 'express';
import { getAvailableCountries } from '../controllers/AvailableCountriesController.js';

const availableCountriesrouter = Router();

availableCountriesrouter.get('/list', getAvailableCountries);

export default availableCountriesrouter;
