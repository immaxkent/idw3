import Container from "../Atoms/Container";
import { initialize, getSnarkProver } from "../../lib/railgunEngine";
import { createRailgunWallet } from "@railgun-community/quickstart";
import Button from "../Atoms/Button";
import { NetworkName } from "@railgun-community/shared-models";
import { useRouter } from "next/router";

const Railgun = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const { sismoId } = query;

  const railgunEngine = initialize();

  // getSnarkProver();

  console.log("railgunEngine", railgunEngine);

  const handleCreateWallet = async () => {
    // Current block numbers for each chain when wallet was first created.
    // If unknown, provide undefined.
    const creationBlockNumberMap = {
      [NetworkName.Ethereum]: 15725700,
      [NetworkName.Polygon]: 3421400,
    };

    const railgunWallet = await createRailgunWallet(
      "0xB551bFE0996d399246E61A9b6F8742Efc3866B3F996d399246E61A9b6F8742Ef",
      "alert river vicious net critic agree valley mango hip gown upon misery",
      creationBlockNumberMap
    );

    console.log("railgunWallet", railgunWallet.railgunWalletInfo.id);

    await fetch("api/mongo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sismoId,
        railgunWalletId: railgunWallet.railgunWalletInfo.id,
      }),
    });

    router.push({
      pathname,
      query: {
        ...query,
        step: "completed",
      },
    });
  };

  return (
    <Container>
      Railgun integration goes here
      <Button onClick={handleCreateWallet}>Integrate me</Button>
    </Container>
  );
};

export default Railgun;
