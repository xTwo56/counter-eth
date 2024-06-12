import { ethers } from "ethers";
import { useEffect, useState } from 'react'
import { Display } from "./components/display"
import { Button } from "./components/button"
import { Info } from "./components/info"
import contractAbi from "./lib/CounterAbi.json"

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {

  const [login, setLogin] = useState(false);
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  async function loadBlockchainData() {
    try {
      const newProvider = new ethers.BrowserProvider(window.ethereum)
      setProvider(newProvider)

      const newContract = new ethers.Contract(contractAddress, contractAbi.abi, newProvider)
      setContract(newContract)
      setLoading(false)
    } catch (err) {
      console.log("ERROR:\n" + err)
    }
  }

  useEffect(() => {
    loadBlockchainData();
  }, [])

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Info provider={provider} setLogin={setLogin} setContract={setContract} contractAddress={contractAddress} contractAbi={contractAbi} />
          <Button change="dec" login={login} contract={contract} setValue={setValue} />
          <Display contract={contract} value={value} setValue={setValue} />
          <Button change="inc" login={login} contract={contract} setValue={setValue} />
        </div>
      )}
    </div>
  )
}

export default App
