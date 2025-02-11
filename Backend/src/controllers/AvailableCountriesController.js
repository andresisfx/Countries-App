import e from "express";

export const getAvailableCountries = async (req, res) => {
  const url = 'https://date.nager.at/api/v3/AvailableCountries';

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    
    res.status(500).json({ error: 'something went wrong getting available countries',error });
  }
};
