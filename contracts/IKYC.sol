// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.10;

interface IKYC {
    struct USER {
        address wallet;
        uint256 issueDate;
        string signature;
    }
}
