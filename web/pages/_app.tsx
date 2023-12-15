import "@/styles/globals.css";
import "@/styles/index.scss";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const pegoTestNet = {
  id: 123456,
  name: "PEGO TestNet",
  network: "PEGOTestnet",
  iconUrl:
    "https://pbs.twimg.com/profile_images/1610657755672743937/9iMng9Ud_400x400.jpg",
  iconBackground: "#fff",
  nativeCurrency: {
    name: "PG",
    symbol: "PG",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://rpc.pegotest.net"] },
    default: { http: ["https://rpc.pegotest.net"] },
  },
  blockExplorers: {
    default: { name: "pegoscan", url: "https://scan.pegotest.net/" },
  },
  testnet: true,
};

const pegoMainNet = {
  id: 20201022,
  name: "PEGO MainNet",
  network: "PEGOMainnet",
  iconUrl:
    "https://pbs.twimg.com/profile_images/1610657755672743937/9iMng9Ud_400x400.jpg",
  iconBackground: "#fff",
  nativeCurrency: {
    name: "PG",
    symbol: "PG",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://rpc.pego.io"] },
    default: { http: ["https://rpc.pego.io"] },
  },
  blockExplorers: {
    default: { name: "pegoscan", url: "https://scan.pego.io/" },
  },
  testnet: false,
};

const { chains, publicClient } = configureChains(
  [polygonMumbai, pegoTestNet, pegoMainNet],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "lenft",
  projectId: "be406d96fe3535516143cb4e26e5c857",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#089bbc",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
        coolMode
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
