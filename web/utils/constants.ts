import FXD_mumbai from "@/contracts/deployments/mumbai/FXD.json";
import FXD_pegoTestnet from "@/contracts/deployments/pegoTestNet/FXD.json";
import FXD_pegoMainnet from "@/contracts/deployments/pegoMainNet/FXD.json";
import NFT_mumbai from "@/contracts/deployments/mumbai/Famcnft.json";
import NFT_pegoTestnet from "@/contracts/deployments/pegoTestNet/Famcnft.json";
import NFT_pegoMainnet from "@/contracts/deployments/pegoMainNet/Famcnft.json";
import Lender_mumbai from "@/contracts/deployments/mumbai/Lender.json";
import Lender_pegoTestnet from "@/contracts/deployments/pegoTestNet/Lender.json";
import Lender_pegoMainnet from "@/contracts/deployments/pegoMainNet/Lender.json";

const FXD: any = {
  maticmum: FXD_mumbai,
  PEGOTestnet: FXD_pegoTestnet,
  PEGOMainnet: FXD_pegoMainnet,
};

const NFT: any = {
  maticmum: NFT_mumbai,
  PEGOTestnet: NFT_pegoTestnet,
  PEGOMainnet: NFT_pegoMainnet,
};

const Lender: any = {
  maticmum: Lender_mumbai,
  PEGOTestnet: Lender_pegoTestnet,
  PEGOMainnet: Lender_pegoMainnet,
};

export { FXD, NFT, Lender };
