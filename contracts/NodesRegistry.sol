// contracts/NodesRegistry.sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import { IterableMapping } from './IterableMapping.sol';

contract NodesRegistry is Ownable {
    using IterableMapping for IterableMapping.Map;

    IterableMapping.Map private writers;
    IterableMapping.Map private access;

    function setWriter(address writer_address, string memory backbone_address) onlyOwner public {
        writers.set(writer_address, backbone_address);
    }

    function getWriters() public view returns (string[] memory) {
        string[] memory values = new string[](writers.size());
        
        for (uint i = 0; i < writers.size(); i++) {
            address key = writers.getKeyAtIndex(i);
            string memory val = writers.get(key);
            values[i] = val;
        }   
        return values;
    }

    function setAccess(address access_address, string memory backbone_address) onlyOwner public {
        access.set(access_address, backbone_address);
    }

    function getAccess() public view returns (string[] memory) {
        string[] memory values = new string[](access.size());
        
        for (uint i = 0; i < access.size(); i++) {
            address key = access.getKeyAtIndex(i);
            string memory val = access.get(key);
            values[i] = val;
        }   
        return values;
    }

// uint constant MAX_OUTPUT = 5;
        // string[MAX_OUTPUT] memory writers;
        // uint[MAX_OUTPUT] memory used_numbers;
        // for (uint r = 0; r < MAX_OUTPUT; r++) {
        //     uint256 i = randomish(0, values.length, r+1, rand);
        //     bool exists = false;
        //     for (uint a = 0; a < used_numbers.length; a++) {
        //         if(used_numbers[a] == i) exists = true;
        //     }
        //     if(!exists) {
        //         writers[r] = values[i];
        //         used_numbers[r] = i;
        //     }
        // }
    // function randomish(uint min, uint max, uint seed, uint rand) public view returns(uint) {
    //     return uint(block.timestamp/seed/rand)%max + min;
    // }
}