import Layout from "../components/layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useAccount } from "wagmi";

const data = [
  {
    token_no: "1",
    price: "0.1",
    collection: "Bored Ape 1",
    url: "https://lh3.googleusercontent.com/wur2s6d0WyBQBeNI1z8bA4HdRkDrLwHavm3Pvekc21p12sFveXEok_RWUvB_wesMPs0Dpr22bHnLmOmpudtmeG1TttS-Zf3JXmA=s1000",
  },
  {
    token_no: "100",
    price: "0.2",
    collection: "Azuki",
    url: "https://lh3.googleusercontent.com/OGuRe6fR03GpnGWjQkGgtZmsykr_g8Cq5F68DHG51wbzyQ64AzbhPPKNVG2SiHmIGwlfPXvzrxUmETKJlBqBFdH_LSTkxJTnAQ=s1000",
  },
  {
    token_no: "3",
    price: "0.3",
    collection: "Pudging Penguins",
    url: "https://lh3.googleusercontent.com/IAkzMyPiP4NBmaWtiFHJDLww5XhD9XFILJ5Ei0lSLebXkyO50VFb18nx09WDDapUXZZ3q31NVctrKxZCtuoZxVt4GPhp0GCx5g=s1000",
  },
  {
    token_no: "23",
    price: "0.4",
    collection: "Doodles",
    url: "https://lh3.googleusercontent.com/M-d1JOoA0O4uYU-lyBqFhaxuh4prGQPvU0_kOZ4hdgvXzsd9-1sVa7fRRN2kx4zpcPQxha_q1ACWMa7I3lekdMLbGrmXhiqldyo=s1000",
  },
];

export default function MyNFTs() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let wallet = "0x0cfecb5D359E6C59ABd1d2Aa794F52C15055f451";

  useEffect(() => {
    axios
      .get(
        `https://xdsea.com/api/v1/front/nft/myItemList?TabName=owned&limit=12&CustomUrl=xdsea-creator-0003&NFTOwner=${wallet}&page=1&from=myItem&cursor=`
      )
      .then((res) => {
        setNfts(res.data.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setNfts(err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout pageTitle="Select NFT to get a loan for">
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
                  href={`/nft?Contract=${nft.ContractAddress}&Id=${nft.NFTId}`}
                >
                  <li className="relative">
                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                      <img
                        src={nft.NFTOrginalImage}
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
                      Token: {nft.NFTId} | Price: {nft.NFTPrice}&nbsp;
                      {nft.CoinName}
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
