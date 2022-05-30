// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IKYC.sol";

contract KYC is IKYC, ERC721Enumerable, Ownable {
    using Strings for uint256;
    string public baseURI;
    string public issuer = "OPT1M1ZE"; //or whatever the name of the KYC platform is...
    mapping(address => Issuer) public Issuers;
    mapping(uint256 => USER) public Users;

    /**
     * @dev Only allowed issuers
     **/
    modifier onlyIssuer(address _issuer) {
        require(Issuers[_issuer].isAllowed, "NOT_ALLOWED");
        _;
    }

    constructor() ERC721("OPTIMIZE NFT KYC", "NFTKYC") {}

    function mint(bytes calldata _user) public onlyIssuer(_msgSender()) {
        (address wallet, string memory signature) = abi.decode(
            _user,
            (address, string)
        );
        USER memory newUser = USER(wallet, block.timestamp, signature);
        uint256 currentSupply = totalSupply();
        Users[currentSupply] = newUser;

        _safeMint(wallet, currentSupply);
    }

    function whitelistNewIssuer(address _wallet, string memory _name)
        public
        onlyOwner
    {
        require(Issuers[_wallet].wallet == address(0), "ISSUER ALREADY EXIST");
        Issuer memory newIssuer = Issuer(_name, _wallet, block.timestamp, true);
        Issuers[_wallet] = newIssuer;
    }

    function verifySignature(uint256 _tokenId, string memory _signature)
        external
        view
        returns (bool)
    {
        if (
            keccak256(abi.encodePacked((Users[_tokenId].signature))) ==
            keccak256(abi.encodePacked((_signature)))
        ) {
            return true;
        } else {
            return false;
        }
    }

    function buildMetadata(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        USER memory user = Users[_tokenId];
        string memory URI = _baseURI();
        return
            string(
                abi.encodePacked(
                    "data:application/json,",
                    abi.encodePacked(
                        '{"wallet":"',
                        Strings.toHexString(uint160(user.wallet), 20),
                        '","description":"This KYC NFT proves that the wallet holder has successfully completed the KYC process fulfilled by OPT1M1ZE","user_signature":"',
                        user.signature,
                        '","issue_date":"',
                        "kk",
                        '","image":"',
                        string(abi.encodePacked(URI, (_tokenId).toString())),
                        '","issuer":"',
                        issuer,
                        '"}'
                    )
                )
            );
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return buildMetadata(_tokenId);
    }
}
