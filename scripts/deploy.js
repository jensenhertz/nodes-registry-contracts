const ethProvider = require("eth-provider") // eth-provider is a simple EIP-1193 provider
const frame = ethProvider("frame") // Connect to Frame

async function main() {
  // const [deployer] = await ethers.getSigners()

  // console.log("Deploying contracts with the account:", deployer.address)

  // console.log("Account balance:", (await deployer.getBalance()).toString())
  console.log(process.env.ALCHEMY_API_KEY)
  const provider = await ethers.getDefaultProvider('ropsten', { alchemy: process.env.ALCHEMY_API_KEY })
  const IterableMapping = await ethers.getContractFactory("IterableMapping")
  const deployed_im = await IterableMapping.getDeployTransaction()
  deployed_im.from = (await frame.request({ method: "eth_requestAccounts" }))[0]
  const tx = await frame.request({
    method: "eth_sendTransaction",
    params: [deployed_im],
  })
  await provider.waitForTransaction(tx)
  const tx_receipt = await provider.getTransactionReceipt(tx)
  console.log(tx_receipt)

  const NodesRegistry = await ethers.getContractFactory("NodesRegistry", {
    libraries: {
      IterableMapping: tx_receipt.contractAddress,
    },
  })
  const deployed_nr = await NodesRegistry.getDeployTransaction()
  deployed_nr.from = (await frame.request({ method: "eth_requestAccounts" }))[0]
  const tx2 = await frame.request({ method: "eth_sendTransaction", params: [deployed_nr] })

  await provider.waitForTransaction(tx2)
  const tx_receipt2 = await provider.getTransactionReceipt(tx2)
  console.log(tx_receipt2)

  console.log("Token address:", tx_receipt2.contractAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
