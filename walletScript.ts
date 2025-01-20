import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

function generateSignerKeys() {
  // Generate a random private key
  const privateKey = generatePrivateKey()
  
  // Create an account from the private key
  const account = privateKeyToAccount(privateKey)
  
  return {
    address: account.address,
    privateKey: privateKey,
    publicKey: account.publicKey
  }
}

// Usage
const keys = generateSignerKeys()
console.log('Address:', keys.address)
console.log('Private Key:', keys.privateKey)
console.log('Public Key:', keys.publicKey)