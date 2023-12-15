import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import Layout from "@/components/layout";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function NFT() {
  const { address } = useAccount();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [collection, setCollection] = useState<any>(null);
  const [milestoneData, setMilestoneData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  let wallet = "0xc0f184cc590ef2e414675e03e80ed32f312b57e9";
  let Contract = router.query.Contract;
  let Id = router.query.Id;

  useEffect(() => {
    if (Contract && Id) {
      axios
        .get(
          `https://xdsea.com/api/v1/front/nft/info?TabName=All&limit=4&Owner=${wallet}&page=1&from=info&Contract=${Contract}&Id=${Id}&MyAdd=`
        )
        .then((res) => {
          setCollection(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Layout
      pageTitle={
        loading
          ? "Loading..."
          : collection?.token?.data[0]?.CollectionName +
            " - #" +
            collection?.token?.data[0]?.NFTId
      }
    >
      {/* Step 1 Panel Start */}
      {!loading ? (
        <>
          <div className="mt-0 px-4 py-5 sm:p-6 sm:py-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 gap-y-5 lg:gap-y-0 bg-white shadow sm:rounded-2xl overflow-hidden">
            <div>
              <div>
                <picture>
                  <source
                    srcSet={collection?.token.data[0].NFTOrginalImage}
                    type="image/*"
                  />
                  <img
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                    src={collection?.token?.data[0]?.NFTOrginalImage}
                    alt="image"
                  />
                </picture>
              </div>

              <div className="mt-8">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {collection?.token?.data[0]?.NFTName}
                </label>
                <div className="mt-2">
                  <p
                    defaultValue=""
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                  >
                    {collection?.token?.data[0]?.NFTId}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  NFT Contract Address
                </label>
                <div className="mt-2">
                  <input
                    defaultValue=""
                    disabled
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                    placeholder={collection.token.data[0].ContractAddress}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="font-black text-xl">About This Collection</div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-x-3">
                    <picture>
                      <source
                        srcSet={collection?.token?.data[0]?.NFTOrginalImage}
                        type="image/*"
                      />
                      <img
                        className="w-12 h-auto"
                        loading="lazy"
                        src={
                          collection?.token?.data[0]?.NFTOrginalImage ||
                          "https://via.placeholder.com/150"
                        }
                        // fallback
                        alt="image"
                      />
                    </picture>
                    <Link href="#" passHref={true}>
                      {collection?.token?.data[0]?.CollectionName}
                    </Link>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    NFT
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    XRC {collection?.token?.data[0]?.ContractType}
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-gray-600 text-sm">
                  {collection?.token?.data[0]?.NFTDescription}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="font-medium text-lg text-gray-600">
                  {collection?.token?.data[0]?.NFTName}
                </div>
                <div className="rounded-md text-end bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Last updated{" "}
                  {new Date(
                    collection?.token?.data[0]?.updatedAt
                  ).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-gray-600 text-sm">
                  Creator:{" "}
                  {JSON.stringify(
                    collection?.token?.data[0]?.Creator_WalletAddress
                  )}
                </p>
              </div>

              <div className="mt-8 bg-sky-50 sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6 sm:py-14">
                  <div className="mt-2 w-full pt-0.5 bg-gray-300" />
                  <div className="mt-3 relative flex items-start justify-between">
                    <div className="text-3xl  leading-6 font-bold text-gray-900">
                      {
                        collection?.token?.data[0]?.tokenowners_list[0]
                          ?.NFTPrice
                      }{" "}
                      {
                        collection?.token?.data[0]?.tokenowners_list[0]
                          ?.CoinName
                      }
                    </div>
                    <div className="h-6 text-sky-600 text-sm">
                      Last updated price
                    </div>
                  </div>
                </div>
              </div>

              {/* Claim Funds Button */}
              <div className="mt-8 flex justify-center items-center">
                <button
                  type="button"
                  className="flex items-center rounded-lg w-full bg-sky-600 px-10 py-5 text-2xl text-center  font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black disabled:bg-slate-500 disabled:hover:text-gray-100"
                >
                  Get a loan against your NFT
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount / Rate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      0xa9shdapsnapuijsnauisnbnausixaji
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">100 days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">1000 XDC / 18%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-md text-center text-white bg-sky-500 p-3 rounded-lg">
                      Accept Offer
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      0xa9shdapsnapuijsnauisnbnausixaji
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">100 days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">1000 XDC / 18%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-md text-center text-white bg-sky-500 p-3 rounded-lg">
                      Accept Offer
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-sky-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Layout>
  );
}
