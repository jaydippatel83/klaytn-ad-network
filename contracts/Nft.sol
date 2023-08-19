//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@klaytn/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("KlayAdNetwork", "KAN") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}