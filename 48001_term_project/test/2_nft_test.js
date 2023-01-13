const nft1 = artifacts.require('TestNFT');
contract("Nft", (accounts) => {
    it('Should mint nft id 0', async () =>{
        const nft1Instance = await nft1.deployed();
        await nft1Instance.safeMint(accounts[0]);
        const balance = await nft1Instance.balanceOf(accounts[0]);
        assert.equal(balance,1,'nft is not exist');
    });
    it('Should send nft id 0 account 0 to account 1', async () => {
        const nft1Instance = await nft1.deployed();
        await nft1Instance.transferFrom(accounts[0],accounts[1],0,{from:accounts[0]})
        const balance1 = await nft1Instance.balanceOf(accounts[0]);
        const balance2 = await nft1Instance.balanceOf(accounts[1]);
        assert.equal(balance1,0,'nft cannot sended');
        assert.equal(balance2,1,'nft cannot recieved');
    })
})
