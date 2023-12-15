import { useContractWrite, useAccount, useNetwork } from "wagmi";
import { FXD } from "@/utils/constants";

export function ApproveButton({
  user,
  amount,
  network,
}: {
  user: `0x${string}` | undefined;
  amount: number;
  network: any;
}) {
  const { address } = useAccount();

  const {
    data,
    isLoading,
    isSuccess,
    write: approve,
  } = useContractWrite({
    address: FXD[network]?.address,
    abi: FXD[network]?.abi,
    functionName: "approve",
  });

  return (
    <button
      onClick={() => {
        approve({
          args: [
            "0x9E1f8C7D4eB3fE19CCE7eBfE855eC9F6f1f23c9E",
            "0x9E1f8C7D4eB3fE19CCE7eBfE855eC9F6f1f23c9E",
          ],
        });
      }}
      className="w-full text-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700"
    >
      Step 1: Approve FXD Tokens
    </button>
  );
}
