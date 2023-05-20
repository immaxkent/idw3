import Container from "../../Atoms/Container";
import { useState } from "react";
import { Form, Label, SubmitButton } from "../../Atoms/Form";

const ProprietorKYC = ({ sismoId }: { sismoId: string }) => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [vatNumber, setVatNumber] = useState(null);
  const [railgunWallet, setRailgunWallet] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API with the form data
      const response = await fetch("api/mongo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          email,
          vatNumber,
          railgunWallet,
          sismoId,
        }),
      });

      if (response.ok) {
        // Handle the successful API response
        console.log("Form submitted successfully!");
      } else {
        // Handle errors from the API response
        console.error("Failed to submit form");
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container>
      <p>Now we will go through KYC verification</p>
      <Form onSubmit={handleSubmit}>
        <Label>
          Business Name:
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </Label>
        <br />
        <Label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        <br />
        <Label>
          VAT Number:
          <input
            type="text"
            value={vatNumber}
            onChange={(e) => setVatNumber(e.target.value)}
            required
          />
        </Label>
        <br />
        <Label>
          Railgun Wallet ID:
          <input
            type="text"
            value={railgunWallet}
            onChange={(e) => setRailgunWallet(e.target.value)}
            required
          />
        </Label>
        <br />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default ProprietorKYC;
