const token1 = artifacts.require('TestToken');
const nft1 = artifacts.require('TestNFT');
const dex = artifacts.require('dex');

contract("Dex",(accounts) => {
    it("Should mint new tokens", async () => {
        const dexInstance = await dex.deployed();
        const token1Instance = await token1.deployed();

        await token1Instance.mint(accounts[0],2000,{from:accounts[0]});
        const balance = await token1Instance.balanceOf(accounts[0]);
        assert.equal(balance,2000,'cannot minted 2k');
        await token1Instance.approve(dexInstance.address,1000)

        await dexInstance.mintingToken(token1Instance.address,1000);
        assert.equal(await dexInstance.getMintedTokenCount(token1Instance.address),1000,'Cannot minted tokens to dex');
    });
    it("Should sell new nft", async () => {
        const dexInstance = await dex.deployed();
        const nft1Instance = await nft1.deployed();

        await nft1Instance.safeMint(accounts[0]);
        await nft1Instance.approve(dexInstance.address,0)
        const balance = await nft1Instance.balanceOf(accounts[0]);
        assert.equal(balance,1,'nft is not exist');

        await dexInstance.sellingNft(nft1Instance.address,0,400);
        assert.equal(await dexInstance.isNftMinted(nft1Instance.address,0),1,'Cannot minted nft to dex')
    });
    it("Should buy nft id 0", async () =>{
        const dexInstance = await dex.deployed();
        const nft1Instance = await nft1.deployed();
        const token1Instance = await token1.deployed();
        assert.equal(await dexInstance.isNftContractAdded(nft1Instance.address),true,'nft address cannot added');

        await token1Instance.approve(dexInstance.address,500);
        await dexInstance.buyNft(nft1Instance.address,0,{from:accounts[0]});
        
        const nftBalance = await nft1Instance.balanceOf(accounts[0]);
        assert.equal(nftBalance,1,'Account cannot get nft');
        const tokenBalance = token1Instance.balanceOf(dexInstance.address);
        assert.equal(tokenBalance,1500,"Dex cannot get token");

    })
})