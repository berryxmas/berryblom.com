import {
  Body,
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

const SITE_URL = "https://berryblom.com";
const WAX_SEAL_URL = `${SITE_URL}/wax-seal-bb.png`;

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>You're on the list — occasional notes on AI and building.</Preview>
      <Body style={main}>
        <Container style={outer}>
          {/* Letter-style panel with wax seal */}
          <Section style={letterPanel}>
            <Section style={sealWrap}>
              <Img
                src={WAX_SEAL_URL}
                alt="Berry Blom"
                width={64}
                height={64}
                style={sealImg}
              />
            </Section>

            <Heading style={heading}>Thanks for subscribing</Heading>

            <Text style={paragraph}>
              You're on the list. I'll send occasional notes on AI, building, and
              what I'm learning — no spam.
            </Text>

            <Text style={paragraph}>
              In the meantime, you can browse{" "}
              <Link href={`${SITE_URL}/blog`} style={link}>
                the blog
              </Link>{" "}
              or{" "}
              <Link href={`${SITE_URL}/projects`} style={link}>
                projects
              </Link>
              .
            </Text>

            <Text style={linkedInLine}>
              If you'd like to connect, I'm on{" "}
              <Link href="https://linkedin.com/in/berryblom" style={link}>
                LinkedIn
              </Link>
              .
            </Text>

            <Hr style={hr} />

            <Text style={signature}>Berry Blom</Text>
            <Text style={signatureSub}>
              Data & AI Engineer ·{" "}
              <Link href={SITE_URL} style={link}>
                berryblom.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#F4EFE4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const outer = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "520px",
};

const letterPanel = {
  backgroundColor: "#EDE6D6",
  border: "1px solid #DDD5C5",
  borderRadius: "8px",
  padding: "40px 32px 32px",
  boxShadow: "0 4px 24px rgba(42, 37, 32, 0.06)",
};

const sealWrap = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const sealImg = {
  display: "inline-block",
  width: 64,
  height: 64,
};

const heading = {
  color: "#2A2520",
  fontSize: "22px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#7A6F62",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const link = {
  color: "#C45E3A",
  textDecoration: "underline",
};

const linkedInLine = {
  color: "#B5A99A",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#DDD5C5",
  margin: "28px 0 24px",
};

const signature = {
  color: "#2A2520",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  fontWeight: "500",
};

const signatureSub = {
  color: "#B5A99A",
  fontSize: "13px",
  fontWeight: "400",
  margin: "2px 0 0",
};
