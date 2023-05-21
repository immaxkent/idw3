import {
  FallbackProviderJsonConfig,
  NetworkName,
  createFallbackProviderFromJsonConfig,
} from "@railgun-community/shared-models";
import {
  startRailgunEngine,
  getProver,
  Groth16,
  loadProvider,
  setLoggers,
  ArtifactStore,
} from "@railgun-community/quickstart";
import LevelDB from "level-js";
import localforage from "localforage";

export const initialize = (): any => {
  // Name for your wallet implementation.
  // Encrypted and viewable in private transaction history.
  // Maximum of 16 characters, lowercase.
  const walletSource = "quickstart demo";

  // LevelDOWN compatible database for storing encrypted wallets.
  window.indexedDB.open("temp.db");
  const db = new LevelDB("temp.db");

  console.log("db", db);

  // Whether to forward Engine debug logs to Logger.
  const shouldDebug = true;

  // Persistent store for downloading large artifact files.
  // See Quickstart Developer Guide for platform implementations.
  const artifactStore = new ArtifactStore(
    async (path: string) => {
      return localforage.getItem(path);
    },
    async (dir: string, path: string, item: string | Buffer) => {
      await localforage.setItem(path, item);
    },
    async (path: string) => (await localforage.getItem(path)) != null
  );

  console.log("artifactStore", artifactStore);

  // Whether to download native C++ or web-assembly artifacts.
  // True for mobile. False for nodejs and browser.
  const useNativeArtifacts = false;

  // Whether to skip merkletree syncs and private balance scans.
  // Only set to TRUE in shield-only applications that don't
  //  load private wallets or balances.
  const skipMerkletreeScans = false;

  const railgunEngine = startRailgunEngine(
    walletSource,
    db,
    shouldDebug,
    artifactStore,
    useNativeArtifacts,
    skipMerkletreeScans
  );
  console.log("railgunEngine", railgunEngine);

  return railgunEngine;
};

export const getSnarkProver = () => {
  // Note: SnarkJS library is not properly typed.
  const groth16 = global.snarkjs.groth16;

  return getProver().setSnarkJSGroth16(groth16);
};

export const loadEthereumNetwork = async () => {
  const ETH_PROVIDERS_JSON: FallbackProviderJsonConfig = {
    chainId: 1,
    providers: [
      {
        provider:
          "https://mainnet.infura.io/v3/907216bd3d954504821de1a9df6756fc",
        priority: 1,
        weight: 1,
      },
    ],
  };

  // Whether to forward debug logs from Fallback Provider.
  const shouldDebug = true;

  const { feesSerialized } = await loadProvider(
    ETH_PROVIDERS_JSON,
    NetworkName.Ethereum,
    shouldDebug
  );

  // return feesSerialized;

  const fallbackProvider =
    createFallbackProviderFromJsonConfig(ETH_PROVIDERS_JSON);
  return fallbackProvider;
};

const logMessage = console.log;
const logError = console.error;

setLoggers(logMessage, logError);
