`use client`;

import Layout from "../components/layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { Lender, NFT } from "../utils/constants";
import { usePublicClient } from "wagmi";

function CreateOfferButton({
  nftContract,
  tokenId,
  interestRate,
  duration,
  amount,
  network,
}: any) {
  const {
    data,
    isLoading,
    isSuccess,
    write: createOffer,
  } = useContractWrite({
    address: Lender[network]?.address,
    abi: Lender[network]?.abi,
    functionName: "createOffer",
    args: [nftContract, tokenId, interestRate, duration, amount],
  });

  return (
    <button
      onClick={() => {
        console.log("Creating offer...");
        createOffer();
      }}
      className="mt-5 w-full text-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700"
    >
      Create Offer for #{tokenId} {isSuccess && "Success!"}
    </button>
  );
}

export default function MyNFTs() {
  const [network, setNetwork] = useState<string>("");
  const [nfts, setNfts] = useState<any>([]);
  const { data, isLoading, isSuccess } = useContractRead({
    address: Lender[network]?.address, // [network] is a dynamic variable that will be replaced with the current network
    abi: Lender[network]?.abi,
    functionName: "getListedNfts",
  });

  const { chain } = useNetwork();

  const [offerData, setOfferData] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (chain) {
      setNetwork(chain.network);
    }

    if (isSuccess) {
      setNfts(data);
      console.log("NFTS: ", nfts);
    }
  }, []);

  return (
    <Layout pageTitle="Become a lender">
      <section>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {nfts.length > 0 &&
              nfts.map((nft: any, index: number) => (
                <div key={index}>
                  <li className="relative">
                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                      <img
                        src={`https://api.decentraland.org/v2/parcels/0/${nft.NFTId}/map.png?size=24&width=1024&height=1024`}
                        alt=""
                        className="pointer-events-none object-cover group-hover:opacity-75"
                      />

                      <div className="mt-4 p-3">
                        <label>
                          Interest Rate in basis points:
                          <input
                            type="text"
                            name="interestRate"
                            onChange={(e) => {
                              setOfferData({
                                ...offerData,
                                interestRate: e.target.value,
                              });
                            }}
                          />
                        </label>
                        <br />
                        <label>
                          Duration in secs:
                          <input
                            type="text"
                            name="duration"
                            onChange={(e) => {
                              setOfferData({
                                ...offerData,
                                duration: e.target.value,
                              });
                            }}
                          />
                        </label>
                        <br />
                        <label>
                          Amount in FXD:
                          <input
                            type="text"
                            name="amount"
                            onChange={(e) => {
                              setOfferData({
                                ...offerData,
                                amount: e.target.value,
                              });
                            }}
                          />
                        </label>
                        <br />
                        <CreateOfferButton
                          nftContract={nft.nftContract}
                          tokenId={parseInt(nft.tokenId)}
                          interestRate={
                            offerData.interestRate ? offerData.interestRate : 1
                          }
                          duration={
                            offerData.duration ? offerData.duration : 1000
                          }
                          amount={offerData.amount ? offerData.amount : 1000}
                          network={network}
                        />
                      </div>
                    </div>

                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                      Token: {parseInt(nft.tokenId)} | &nbsp; FastApeMotoClub
                    </p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-500">
                      {nft.NFTName}
                    </p>
                  </li>
                </div>
              ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
