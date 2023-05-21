import Container from "../../Atoms/Container";
import { useState } from "react";
import { Form, Label, SubmitButton } from "../../Atoms/Form";
import { useRouter } from "next/router";

const SentientKYC = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const { sismoId } = query;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState(null);
  const [selfie, setSelfie] = useState(null);

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
          name,
          email,
          passport,
          selfie,
          sismoId,
          kyc: true,
        }),
      });

      if (response.ok) {
        // Handle the successful API response
        console.log("Form submitted successfully!");

        router.push({
          pathname,
          query: {
            ...query,
            step: "railgun",
          },
        });
      } else {
        // Handle errors from the API response
        console.error("Failed to submit form");
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("An error occurred:", error);
    }
  };

  const handleFileChange = (e, photoType) => {
    const file = e.target.files[0];

    if (photoType == "passport") {
      setPassport(file);
    } else {
      setSelfie(file);
    }
  };

  return (
    <Container>
      <p>Now we will go through KYC verification</p>
      <Form onSubmit={handleSubmit}>
        <Label>
          <div>Name:</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />
        </Label>
        <br />
        <Label>
          <div>Email:</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </Label>
        <br />
        <Label>
          <div>Passport Photo:</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "passport")}
          />
        </Label>
        <br />
        <Label>
          <div>Upload Selfie:</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "selfie")}
          />
        </Label>
        <br />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default SentientKYC;
