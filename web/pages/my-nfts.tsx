import Layout from "../components/layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { NFT } from "../utils/constants";
import { usePublicClient } from "wagmi";

export default function MyNFTs() {
  const [network, setNetwork] = useState<string>("");
  const { chain } = useNetwork();
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let wallet = "0xc0f184cc590ef2e414675e03e80ed32f312b57e9";
  let totalSupply = 10;

  useEffect(() => {
    if (chain) {
      setNetwork(chain.network);
    }
  }, [chain]);

  async function getNFTs() {
    let nfts = [];
    for (let i = 0; i < totalSupply; i++) {
      const data = await publicClient
        .readContract({
          address: NFT[network]?.address,
          abi: NFT[network]?.abi,
          functionName: "ownerOf",
          args: [i],
        })
        .catch((err) => {
          console.log(err);
        });

      nfts.push(data);
    }

    return nfts
      .map((nft: any, index) => ({
        NFTId: index,
        NFTName: "FastApeMotoClub",
        owner: nft,
      }))
      .filter((nft: any) => nft.owner == address);
  }

  useEffect(() => {
    if (loading && network) {
      getNFTs().then((nfts) => {
        setNfts(nfts);
        setLoading(false);
        console.log("Hello World", nfts);
      });
    }
  }, [nfts]);

  return (
    <Layout pageTitle="Select one of your NFTs to get a loan">
      <section>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {nfts.length > 0 &&
              nfts.map((nft: any, index) => (
                <Link
                  key={index}
                  href={`/nft?Contract=${NFT.contract}&Id=${nft.NFTId}`}
                >
                  <li className="relative">
                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                      <img
                        src={`https://api.decentraland.org/v2/parcels/0/${nft.NFTId}/map.png?size=24&width=1024&height=1024`}
                        alt=""
                        className="pointer-events-none object-cover group-hover:opacity-75"
                      />
                      <button
                        type="button"
                        className="absolute inset-0 focus:outline-none"
                      >
                        <span className="sr-only">
                          View details for {nft.NFTId}
                        </span>
                      </button>
                    </div>
                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                      Token: {nft.NFTId} | &nbsp; FastApeMotoClub
                    </p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-500">
                      {nft.NFTName}
                    </p>
                  </li>
                </Link>
              ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
