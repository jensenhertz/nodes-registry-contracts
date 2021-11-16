const ethProvider = require("eth-provider") // eth-provider is a simple EIP-1193 provider
const frame = ethProvider("frame") // Connect to Frame

async function main() {
  // const [deployer] = await ethers.getSigners()

  // console.log("Deploying contracts with the account:", deployer.address)

  // console.log("Account balance:", (await deployer.getBalance()).toString())

  const IterableMapping = await ethers.getContractFactory("IterableMapping")
  const deployed_im = await IterableMapping.getDeployTransaction()
  deployed_im.from = (await frame.request({ method: "eth_requestAccounts" }))[0]
  await frame.request({ method: "eth_sendTransaction", params: [deployed_im] })

  const NodesRegistry = await ethers.getContractFactory("NodesRegistry", {
    libraries: {
      IterableMapping: deployed_im.address,
    },
  })
  const deployed_nr = await NodesRegistry.getDeployTransaction()
  deployed_nr.from = (await frame.request({ method: "eth_requestAccounts" }))[0]
  await frame.request({ method: "eth_sendTransaction", params: [deployed_nr] })

  console.log("Token address:", deployed_nr.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
