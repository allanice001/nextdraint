import type { ReactElement } from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetLink: string;
  username?: string;
}

export const PasswordResetEmail = ({
  resetLink,
  username = "there",
}: PasswordResetEmailProps): ReactElement => {
  const previewText = `Reset your Draint password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            width="120"
            height="40"
            alt="Draint"
            style={logo}
            src="https://media.draintart.gallery/media/static/image/c29cea01-f05c-426e-bf96-eeb94b526534/source.png"
          />
          <Heading style={heading}>Reset your password</Heading>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            Someone recently requested a password change for your Draint
            account. If this was you, you can set a new password here:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Reset password
            </Button>
          </Section>
          <Text style={paragraph}>
            If you don&#39;t want to change your password or didn&#39;t request
            this, just ignore and delete this message.
          </Text>
          <Text style={paragraph}>
            This password reset link will expire in 1 hour for security reasons.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Draint - Digital Art Marketplace
            <br />
            If you have any questions, please{" "}
            <Link href="https://draint.art/contact" style={link}>
              contact our support team
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const logo = {
  margin: "0 auto 20px",
  display: "block",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  color: "#333",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#555",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#7c3aed",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "22px",
};

const link = {
  color: "#7c3aed",
  textDecoration: "underline",
};
