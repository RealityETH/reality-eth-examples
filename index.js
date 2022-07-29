const { ethers } = require("ethers");

const rpc = 'https://rpc.ankr.com/eth_rinkeby';
const reality_contracts = require('@reality.eth/contracts');

testQuery();

async function testQuery() {

    const provider = new ethers.providers.JsonRpcProvider(rpc)
    const network = await provider.getNetwork()

    // console.log('network', network);
    const chain_id = network.chainId;

    // const reality_config = reality_contracts.realityETHConfig(chain_id, 'ETH', '3.0') 
    const reality_config = reality_contracts.realityETHConfig(chain_id, 'ETH') 
    // console.log(reality_config);

    const reality_instance = reality_contracts.realityETHInstance(reality_config);
    const ethers_contract = new ethers.Contract(reality_instance.address, reality_instance.abi, provider);

    // const question_id = '0x7b1bad6cca246d825f9391a64bcff58bb7050cf039e9cdf6aec8df515c78e508';

    const question_id = '0x9d7c0d5a286f917e2adef9c83423dda79e19e9e39fbc1560d223dfc095ffda95';

    //const result = await contract.functions.resultFor(question_id);
    const result = await ethers_contract.functions.resultForOnceSettled(question_id);

    console.log('result for question', question_id, 'is', result);

}
