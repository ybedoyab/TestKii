import { Chain } from "viem";

export const kiichainTestnetOro = {
  id: 1336,
  name: "Kiichain Testnet Oro",
  nativeCurrency: {
    name: "Kii",
    symbol: "ukii",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.dos.sentry.testnet.v3.kiivalidator.com"],
    },
    public: {
      http: ["https://json-rpc.dos.sentry.testnet.v3.kiivalidator.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Kiichain Explorer",
      url: "https://app.kiiglobal.io/kiichain3",
    },
  },
  testnet: true,
} as const satisfies Chain;
