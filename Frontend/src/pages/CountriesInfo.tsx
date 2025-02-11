import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";

interface BorderCountry {
  commonName: string;
  countryCode: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface CountryInfo {
  country: string;
  flagUrl: string;
  borderCountries: BorderCountry[];
  population: PopulationData[];
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const countryInfo_endpoint = import.meta.env.VITE_COUNTRY_INFO_ENDPOINT;

export const CountriesInfo = () => {
  const { code } = useParams<{ code: string }>();
  const [countryData, setCountryData] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCountryInfo();
  }, [code]);
  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get<CountryInfo>(`${baseUrl}${countryInfo_endpoint}${code}`);

      setCountryData(response.data);
    } catch (error) {
      console.error("Error fetching country info:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!countryData) {
    return (
      <Container className="text-center mt-5">
        <h1>Country not found</h1>
      </Container>
    );
  }

  return (
    <Container className="mt-4 animate__animated animate__backInDown  w-100vw">
      <Row>
        {/* Country Name & Flag */}
        <Col md={6}>
          <Card className="p-3 text-center shadow-sm border-primary bg-white">
            <Card.Title className="fw-bold text-primary">{countryData.country}</Card.Title>
            <Card.Img
              variant="top"
              src={countryData.flagUrl}
              alt={`Flag of ${countryData.country}`}
              className="mt-2 border border-primary rounded"
            />
          </Card>
        </Col>

        {/* Border Countries */}
        <Col md={6}>
          <Card className="p-3 shadow-sm border-secondary bg-white">
            <Card.Title className="text-secondary">Border Countries</Card.Title>
            {countryData.borderCountries.length > 0 ? (
              <ListGroup variant="flush">
                {countryData.borderCountries.map((border) => (
                  <ListGroup.Item key={border.countryCode} className="border-0">
                    <Link
                      to={`/country-info/${border.countryCode}`}
                      className="text-decoration-none text-dark"
                    >
                      {border.commonName}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-muted">No border countries available</p>
            )}
          </Card>
        </Col>
      </Row>

      {/* Population Over Time */}
      <Row className="mt-4">
        <Col>
          <Card className="p-3 shadow-sm border-info bg-white">
            <Card.Title className="text-info">Population Over Time</Card.Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={countryData.population}>
                <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />
                <XAxis dataKey="year" tick={{ fill: "#007bff" }} />
                <YAxis tick={{ fill: "#007bff" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
