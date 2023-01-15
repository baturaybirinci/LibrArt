// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
contract dex{
    struct nft{
        address owner;
        uint256 price;
    }

    struct lockedNft{
        address owner;
        address tokenAddress; // ADDRESS WILL BE EQUAL TO THIS IF IT IS NOT MINTED
        uint256 tokenAmount;
        uint256 blockHeight;
    }

    struct token {
        uint256 amount;
        uint256 price;
    }

    mapping(address => mapping(uint256 => lockedNft)) private lockedNfts;
    mapping(address => mapping(uint256 => nft)) private offeredNfts; // address = nft contract address , uint256 = tokenId
    mapping(address => mapping(address => token)) private offeredTokens;

    
    event buyHappened(address _oldOwner, uint256 _amount, address _newOwner);
    event lockHappened(address _owner, address _tokenAddr, uint256 _lockAmount, uint256 _blockNum);



// Private mapping-of-mapping variables accessed, and each struct's member can be viewed:

//offeredTokens getters

    function viewofferedTokenAmount(address adrMapping, address adrToken) public view returns (uint256) { //index limit may require this and followings
        return offeredTokens[adrMapping][adrToken].amount;
    }

    function viewofferedTokenPrice(address adrMapping, address adrToken) public view returns (uint256) {
        return offeredTokens[adrMapping][adrToken].price;
    }


//offeredNfts getters


    function viewofferedNftOwner(address adr, uint key) public view returns (address) { //index limit may require this and followings
        return offeredNfts[adr][key].owner;
    }

    function viewofferedNftPrice(address adr, uint key) public view returns (uint256) {
        return offeredNfts[adr][key].price;
    }

//lockedNfts getters

    function viewlockedNftOwner(address adr, uint key) public view returns (address) { //index limit may require this and followings
        return lockedNfts[adr][key].owner;
    }

    function viewlockedNftAddress(address adr, uint key) public view returns (address) {
        return lockedNfts[adr][key].tokenAddress;
    }

    function viewlockedNftAmount(address adr, uint key) public view returns (uint256) {
        return lockedNfts[adr][key].tokenAmount;
    }

    function viewlockedNftBHeight(address adr, uint key) public view returns (uint256) {
        return lockedNfts[adr][key].blockHeight;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function offer(address adr, uint256 id, uint256 price) public {
        IERC721(adr).transferFrom(msg.sender,address(this),id);
        // TODO: Security breach, will be fixed by using a function that does
        // overflow safe multiplication
        offeredNfts[adr][id] = nft(msg.sender, price);
    }



    function buy(address adr, uint256 id) public payable {
        require(offeredNfts[adr][id].price != 0);
        require(msg.value == offeredNfts[adr][id].price);
        payable(offeredNfts[adr][id].owner).transfer(msg.value);
        delete offeredNfts[adr][id]; // DELETE ?
        IERC721(adr).transferFrom(address(this),msg.sender,id);

        emit buyHappened(offeredNfts[adr][id].owner, msg.value, msg.sender);
    }


    
    function lock(address adr, uint256 id, uint256 amount) public {
        IERC721(adr).transferFrom(msg.sender,address(this),id); //Msg.sender dan contract adresine kitler, Approve() needed diye okudum ?
        lockedNfts[adr][id] = lockedNft(msg.sender,address(this),amount,block.number);

        emit lockHappened(msg.sender, address(this), amount, block.number);
    }

    function mint(address adr, uint256 id, address tokenAdr) public {
        require(lockedNfts[adr][id].owner == msg.sender);
        require(lockedNfts[adr][id].blockHeight+64 <= block.number );
        require(IERC20(tokenAdr).totalSupply() == lockedNfts[adr][id].tokenAmount ); // or > 0
        lockedNfts[adr][id].tokenAddress = tokenAdr;
        IERC20(tokenAdr).transferFrom(address(this), msg.sender, lockedNfts[adr][id].tokenAmount);
    }

    //erc 20 tokeni oldugundan emin ol
    function unlock(address adr, uint256 id) public {
        require(lockedNfts[adr][id].blockHeight+128 <= block.number);
        require(((lockedNfts[adr][id].tokenAddress == address(this)) && lockedNfts[adr][id].owner == msg.sender) 
                || (IERC20(lockedNfts[adr][id].tokenAddress).totalSupply() == 0), "cannot be unlocked");
        // TODO: make sure the person who invokes this function owns all tokens.
            IERC721(adr).transferFrom(address(this),msg.sender,id);
    }
    
    function sellErc20(address adr, uint256 price, uint256 amount) public{
        IERC20(adr).transferFrom(msg.sender,address(this),amount);
        offeredTokens[adr][msg.sender] = token(amount,price);
    }
    function buyErc20(address adr, address seller, uint256 amount ) public payable {
        require(msg.value == offeredTokens[adr][seller].price);
        delete offeredTokens[adr][seller]; // DELETE ?
        IERC20(adr).transferFrom(address(this),msg.sender,amount);
        payable(seller).transfer(msg.value);
        
    }
}
    