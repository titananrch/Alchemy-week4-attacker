# 🏆 Alchemy Week 4 — Winner Event Challenge (Sepolia)

This project completes the **Alchemy University Week 4 Smart Contract Challenge**, where the goal is to trigger the `Winner` event on a remote contract by bypassing the `tx.origin` check.

---

# 📌 Challenge Summary

The target contract deployed on **Sepolia**:

```
0x71828844593c9C0525b6A0F99eFd0ec5771C52b8
```

contains the following logic:

```solidity
require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
```

This condition **prevents EOAs from calling the contract directly**. Instead, a smart contract must act as an intermediary so that:

* `tx.origin` → your wallet
* `msg.sender` → your attacker contract

If successful, the contract emits:

```
Winner(address)
```

Your task: **Deploy an attacker contract and call the target contract through it.**

---

# 🚀 How This Project Works

### **1. Write an Attacker Contract**

A simple proxy contract that forwards the call to the challenge contract:

```solidity
interface IChallenge {
    function attempt() external;
}

contract Attacker {
    function callAttempt(address target) external {
        IChallenge(target).attempt();
    }
}
```

When your attacker contract calls `attempt()`, the challenge contract sees:

* `msg.sender` = attacker contract address → ✅ valid
* `tx.origin` = your wallet → happens automatically

This bypasses the restriction.

### **2. Deploy the Attacker Contract**

Using Hardhat:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### **3. Execute the Attack**

Call your deployed attacker contract to trigger the challenge:

```bash
npx hardhat run scripts/attack.js --network sepolia
```

If successful, you will see your transaction emit the `Winner` event.

---

# 🛠️ Tech Stack & Tools Used

| Tool                      | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| **Hardhat**               | Smart contract development & execution         |
| **Solidity**              | Attacker contract implementation               |
| **Alchemy RPC (Sepolia)** | Network connection for deploying & interacting |
| **Metamask**              | Wallet used to sign and fund Sepolia txs       |
| **Ethers.js**             | Scripting deployments & interactions           |

---

# 📥 Installation & Setup

### **1. Clone the repo**

```bash
git clone https://github.com/yourusername/alchemy-week4-attacker.git
cd alchemy-week4-attacker
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Create a `.env` file**

> ⚠️ Do **NOT** commit this file.

```
ALCHEMY_SEPOLIA_URL=your_rpc_url
PRIVATE_KEY=your_private_key
```

### **4. Compile contracts**

```bash
npx hardhat compile
```

### **5. Deploy attacker contract**

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### **6. Run attack script**

```bash
npx hardhat run scripts/attack.js --network sepolia
```

After execution, your address should appear in the **Events** tab of the challenge contract.

---

# 📊 Verification

Once completed, verify the transaction on Sepolia Etherscan and check the **Winner** event log.

If everything worked successfully, you should see:

```
Winner(<your attacker contract address>)
```

---

# 🎯 Goal Achieved

This project demonstrates:

* Understanding of `msg.sender` vs `tx.origin`
* Smart contract–based attack flow
* Hardhat scripting & deployment
* Interacting with external challenge contracts

