import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

interface Country {
  countryCode: string;
  name: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const availableCountries_endpoint = import.meta.env.VITE_AVAILABLE_COUNTRIES_ENDPOINT;

export const ListOfCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${baseUrl}${availableCountries_endpoint}`);
        if (!response.ok) {
          throw new Error("Error fetching countries");
        }
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const colors = ["primary", "success", "warning", "danger", "info"];

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4 animate__animated animate__backInDown">List of Countries</h1>
      <Row>
        {countries.map((country, index) => (
          <Col key={country.countryCode} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card
              className={`h-100 shadow-lg text-white bg-${colors[index % colors.length]} rounded animate__animated animate__backInLeft 
              transition`}
            >
              <Card.Body className="text-center animate__animated animate__backInUp">
                <Card.Title>{country.name}</Card.Title>
                <Card.Text>({country.countryCode})</Card.Text>
                <Link to={`/country-info/${country.countryCode}`} className="btn btn-light">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
