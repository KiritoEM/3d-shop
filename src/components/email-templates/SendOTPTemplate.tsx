import { FC } from "react";

import {
    Html,
    Head,
    Body,
    Preview,
    Container,
    Section,
    Heading,
    Text,
    Img,
} from "@react-email/components";
import { OTPEmailProps } from "@/types";

const SendOTPTemplate: FC<OTPEmailProps> = ({ validationCode }) => {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Confirmer votre adresse email</Preview>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Img
                            src="https://res.cloudinary.com/djviemljt/image/upload/v1751876494/bazzar-logo_m7murj.png"
                            width="188"
                            height="auto"
                            alt="Bazzar"
                        />
                    </Section>

                    <Heading style={h1}>Confirmer votre adresse email</Heading>

                    <Text style={heroText}>
                        Votre code de validation vous attend ci-dessous -
                        Retournez dans l'application et saisissez-le dans le
                        champ de confirmation.
                    </Text>

                    <Section style={codeBox}>
                        <Text style={confirmationCodeText}>
                            {validationCode}
                        </Text>
                    </Section>

                    <Text style={text}>
                        Si vous n'avez pas demandé cet email, ne vous inquiétez
                        pas, vous pouvez l'ignorer en toute sécurité.
                    </Text>

                    <Section>
                        <Text style={footerText}>©2025 Bazzar</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const logoContainer = {
    marginTop: "32px",
    width: "max-content",
    textAlign: "center" as const,
};

const h1 = {
    color: "#000",
    fontSize: "24px",
    fontWeight: "400",
    textAlign: "center" as const,
    padding: "0",
    margin: "30px 0",
};

const heroText = {
    color: "#000",
    fontSize: "14px",
    lineHeight: "24px",
    marginBottom: "38px",
};

const codeBox = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "12px auto 10px",
    verticalAlign: "middle",
    width: "280px",
};

const confirmationCodeText = {
    color: "#000",
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "6px",
    lineHeight: "40px",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    textAlign: "center" as const,
};

const text = {
    color: "#000",
    fontSize: "14px",
    lineHeight: "24px",
};

const footerText = {
    color: "#b7b7b7",
    fontSize: "12px",
    lineHeight: "15px",
    marginTop: "12px",
    marginBottom: "38px",
};

export default SendOTPTemplate;
