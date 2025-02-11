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

const baseUrl= import.meta.env.VITE_API_BASE_URL
const countryInfo_endpoint=import.meta.env.VITE_COUNTRY_INFO_ENDPOINT

export const CountriesInfo = () => {
  const { code } = useParams<{ code: string }>();
  const [countryData, setCountryData] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCountryInfo();
  }, [code]);
  const fetchCountryInfo = async () => {
    try {
      const response = await axios.get<CountryInfo>(
        `${baseUrl}${countryInfo_endpoint}${code}`,
      );
      
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
        <h2>Country not found</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card className="p-3 text-center">
            <Card.Title className="fw-bold">{countryData.country}</Card.Title>
            <Card.Img
              variant="top"
              src={countryData.flagUrl}
              alt={`Flag of ${countryData.country}`}
              className="mt-2"
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3">
            <Card.Title>Border Countries</Card.Title>
            {countryData.borderCountries.length > 0 ? (
              <ListGroup>
                {countryData.borderCountries.map((border) => (
                  <ListGroup.Item key={border.countryCode}>
                    <Link to={`/country-info/${border.countryCode}`}>{border.commonName}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No border countries available</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="p-3">
            <Card.Title>Population Over Time</Card.Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={countryData.population}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
