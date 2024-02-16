import { useEffect, useState } from "react"
import { useMagic } from "../magic/MagicProvider"
import { createEcdsaKernelAccountClient } from '@zerodev/presets/zerodev';
import { providerToSmartAccountSigner } from 'permissionless';
import { sepolia } from 'viem/chains';

export const useZeroDevKernel = () => {
  const { magic } = useMagic();
  const [kernelClient, setKernelClient] = useState<any>();
  const [scaAddress, setScaAddress] = useState<any>();

  useEffect(() => {
    const fetchAccount = async () => {
      const magicProvider = await magic?.wallet.getProvider();
      const smartAccountSigner = await providerToSmartAccountSigner(magicProvider);

      const client = await createEcdsaKernelAccountClient({
        chain: sepolia,
        projectId: process.env.NEXT_PUBLIC_ZERODEV_SEPOLIA_PROJECT_ID!,
        signer: smartAccountSigner,
        paymaster: "SPONSOR" // defaults to "SPONSOR". Use "NONE" if no policy is required. 
      });
      setKernelClient(client)

      setScaAddress(client.account.address);
    }

    fetchAccount()
  }, [])


  return {
    kernelClient,
    scaAddress,
  }
}