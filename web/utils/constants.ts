import FXD_mumbai from "@/contracts/deployments/mumbai/FXD.json";
import FXD_pegoTestnet from "@/contracts/deployments/pegoTestNet/FXD.json";
// import FXD_pegoMainnet from "@/contracts/deployments/pegoMainnet/FXD.json";
import NFT_mumbai from "@/contracts/deployments/mumbai/Famcnft.json";
import NFT_pegoTestnet from "@/contracts/deployments/pegoTestNet/Famcnft.json";
// import NFT_pegoMainnet from "@/contracts/deployments/pegoMainnet/Famcnft.json";
import Lender_mumbai from "@/contracts/deployments/mumbai/Lender.json";
import Lender_pegoTestnet from "@/contracts/deployments/pegoTestNet/Lender.json";
// import Lender_pegoMainnet from "@/contracts/deployments/pegoMainnet/Lender.json";

const FXD: any = {
  maticmum: FXD_mumbai,
  pegoTestnet: FXD_pegoTestnet,
  // pegoMainnet:
};

const NFT: any = {
  maticmum: NFT_mumbai,
  pegoTestnet: NFT_pegoTestnet,
  // pegoMainnet:
};

const Lender: any = {
  maticmum: Lender_mumbai,
  pegoTestnet: Lender_pegoTestnet,
  // pegoMainnet:
};

export { FXD, NFT, Lender };
