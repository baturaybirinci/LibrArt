const token1 = artifacts.require("TestToken");
contract('token1',(accounts) => {
    it('User 0 should have 1000 token1 coins', async () =>{
        const token1Instance = await token1.deployed();
        balance = await token1Instance.balanceOf(accounts[0]);
        assert.equal(balance,0,'balance is not 0');

        await token1Instance.mint(accounts[0],1000,{from:accounts[0]});
        balance = await token1Instance.balanceOf(accounts[0]);
        assert.equal(balance,1000,'cannot minted 1k');
    });
    it('User 0 sends 1k token1 to user 1', async() =>{
        const token1Instance = await token1.deployed();
        await token1Instance.mint(accounts[0],1000,{from:accounts[0]});
        balance0 = await token1Instance.balanceOf(accounts[0]);
        assert.equal(balance0,2000,'Token1 cannot minted');

        await token1Instance.approve(accounts[0],1000)
        await token1Instance.transferFrom(accounts[0],accounts[1],1000,{from:accounts[0]})
        balance0 = await token1Instance.balanceOf(accounts[0]);
        const balance1 = await token1Instance.balanceOf(accounts[1]);
        assert.equal(balance0,1000,'Cannot Send 1k');
        assert.equal(balance1,1000,'Cannot recieve 1k');
    });
});
