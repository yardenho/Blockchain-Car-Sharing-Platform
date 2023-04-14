// import fs from "fs";
// var keythereum = require("keythereum");

export let privateKeys = [
    [
        "0x7746932b9155EeeC3e5AfeA762F51f1F76788acA",
        "49520ebac00ecc389bf45000a3365e4a46d6722d36555f3817d72128b013974b",
    ], // the register node
    [
        "0xD0d655817d50f0A299ba5AdAFE6A7383339b63a1",
        "e2f476abb51b56c49ec3a712d777ba076433b83261a898d420e9c01e2ab33532",
    ],
];
export let index = 1;

export const increaceIndex = () => {
    console.log("index " + index);
    if (index + 1 <= privateKeys.length) {
        index = index + 1;
        return index;
    } else {
        return null;
    }
};

export const addPrivateKey = () => {
    // const KEYSTORE_DIR =
    //     "node2keystoreUTC--2023-04-12T13-56-26.389425900Z--d0d655817d50f0a299ba5adafe6a7383339b63a1";
    // const PASSWORD_FILE = "node2password.txt";
    // for (const file of fs.readdirSync(KEYSTORE_DIR)) {
    //     const keyObject = JSON.parse(
    //         fs.readFileSync(KEYSTORE_DIR + "/" + file, "utf8")
    //     );
    //     const publicAddr = keyObject.address;
    //     const privateKey = keythereum
    //         .recover(fs.readFileSync(PASSWORD_FILE), keyObject)
    //         .toString("hex");
    //     console.log(`0x${publicAddr}: 0x${privateKey}`);
    // }
};
