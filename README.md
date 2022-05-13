# avalanche-overview

## Download AvalancheGo

preinstall

```
sudo apt install build-essential
```

You're first going to need to install Go 1.17.9 or later. Follow the instructions [here](https://go.dev/doc/install).

Download the AvalancheGo repository into your $GOPATH:

```
cd $GOPATH
mkdir -p src/github.com/ava-labs
git clone git@github.com:ava-labs/avalanchego.git
cd avalanchego
```

Build AvalancheGo:

```
./scripts/build.sh
```

## Start a Node, and Connect to Avalanche

```
./build/avalanchego
```

check sync

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

got AVAX
```
https://testnet.avascan.info/blockchain/c/tx/0x742132ee1282881b8b64cdecea20fe70b1c52ef2f95a2880fcfe07724517521f
```