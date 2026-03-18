// src/emails/WelcomeEmail.jsx
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Heading,
  Section,
} from '@react-email/components';

const WelcomeEmail = ({ username = 'there', dashboardUrl = 'https://yourapp.com/dashboard' }) => {
  return (
    <Html>
      <Preview>Welcome to Our App! Get started with your dashboard</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {username}! 🎉</Heading>
          
          <Section style={section}>
            <Text style={text}>
              Thank you for joining our community! We're excited to have you on board.
            </Text>
            
            <Text style={text}>
              Your dashboard is ready and waiting for you. Here you can:
            </Text>
            
            <ul style={list}>
              <li>Track your progress</li>
              <li>Manage your settings</li>
              <li>Connect with other members</li>
              <li>Access exclusive features</li>
            </ul>
            
            <Link href={dashboardUrl} style={button}>
              Go to Dashboard
            </Link>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, feel free to reply to this email or contact our support team.
            </Text>
            <Text style={footerText}>
              Best regards,<br />
              The Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0 0 20px',
};

const section = {
  padding: '20px 0',
};

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '10px 0',
};

const list = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.8',
  margin: '20px 0',
  paddingLeft: '20px',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 24px',
  margin: '20px 0',
};

const footer = {
  borderTop: '1px solid #eaeaea',
  marginTop: '20px',
  paddingTop: '20px',
};

const footerText = {
  color: '#888',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '5px 0',
};

export default WelcomeEmail;