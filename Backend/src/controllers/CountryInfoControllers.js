export const getCountryInfo = async (req, res) => {
  const countryCode = req.params.code.toUpperCase();

  try {
    const borderRes = await fetch(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );
    const borderData = await borderRes.json();

    if (!borderData.commonName) {
      return res.status(404).json({ error: 'Country Not Found!!!' });
    }

    const countryName = borderData.commonName;
    const borderCountries = borderData.borders || [];

    const populationRes = await fetch(
      'https://countriesnow.space/api/v0.1/countries/population',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: countryName }),
      }
    );
    const populationData = await populationRes.json();

    const flagRes = await fetch(
      'https://countriesnow.space/api/v0.1/countries/flag/images',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ iso2: countryCode }),
      }
    );
    const flagData = await flagRes.json();

    res.json({
      country: countryName,
      borderCountries,
      population: populationData.data?.populationCounts || [],
      flagUrl: flagData.data?.flag || 'No flag found',
    });
  } catch (error) {
    console.error('Error fetching country info:', error);
    res.status(500).json({ error: 'Error retrieving country info', error });
  }
};
