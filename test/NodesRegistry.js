const { expect } = require("chai")
const { randomBytes } = require("ethers/lib/utils")
const { ethers } = require("hardhat")

describe("NodesRegistry contract", function () {
  it("Deployment should assign contract to the owner", async function () {
    const [owner] = await ethers.getSigners()
    const IterableMapping = await ethers.getContractFactory("IterableMapping")
    const deployed_im = await IterableMapping.deploy()
    const NodesRegistry = await ethers.getContractFactory("NodesRegistry", {
      libraries: {
        IterableMapping: deployed_im.address,
      },
    })
    const deployed_registry = await NodesRegistry.deploy()
    const owner_value = await deployed_registry.owner()
    expect(owner_value).to.equal(owner.address)
  })

  it("Deployment should add and get 10 writers", async function () {
    const [owner] = await ethers.getSigners()
    const IterableMapping = await ethers.getContractFactory("IterableMapping")
    const deployed_im = await IterableMapping.deploy()
    const NodesRegistry = await ethers.getContractFactory("NodesRegistry", {
      libraries: {
        IterableMapping: deployed_im.address,
      },
    })
    const deployed_registry = await NodesRegistry.deploy()
    const writers = []
    for (let index = 0; index < 10; index++) {
      const wallet = new ethers.Wallet(randomBytes(32))
      const w = [wallet.address, owner.address]
      writers.push(w)
      await deployed_registry.setWriter(w[0], w[1])
    }
    const contract_writers = await deployed_registry.getWriters()
    expect(contract_writers).to.have.members(writers.map(a => a[1]))
  })

  it("Deployment should add and get 10 access", async function () {
    const [owner] = await ethers.getSigners()
    const IterableMapping = await ethers.getContractFactory("IterableMapping")
    const deployed_im = await IterableMapping.deploy()
    const NodesRegistry = await ethers.getContractFactory("NodesRegistry", {
      libraries: {
        IterableMapping: deployed_im.address,
      },
    })
    const deployed_registry = await NodesRegistry.deploy()
    const access = []
    for (let index = 0; index < 10; index++) {
      const wallet = new ethers.Wallet(randomBytes(32))
      const w = [wallet.address, owner.address]
      access.push(w)
      await deployed_registry.setAccess(w[0], w[1])
    }
    const contract_access = await deployed_registry.getAccess()
    expect(contract_access).to.have.members(access.map(a => a[1]))
  })
})
