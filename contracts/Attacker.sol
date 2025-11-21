// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IChallenge {
    function attempt() external;
}

contract Attacker {
    // call the target contract's attempt() from this contract
    function callAttempt(address target) external {
        IChallenge(target).attempt();
    }

    // optional: helper to call with low-level call
    function callAttemptLowLevel(address target) external {
        (bool ok, ) = target.call(abi.encodeWithSignature("attempt()"));
        require(ok, "call failed");
    }
}
