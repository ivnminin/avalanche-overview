```
avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"
```

```
AVALANCHEGO_EXEC_PATH=avalanchego/build/avalanchego
```

```
curl -X POST -k http://localhost:8081/v1/control/start -d '{"execPath":"'${AVALANCHEGO_EXEC_PATH}'","numNodes":5,"logLevel":"INFO"}'
```

we have

```
node1: node ID "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg", URI "http://127.0.0.1:33457"
node2: node ID "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ", URI "http://127.0.0.1:28842"
node3: node ID "NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN", URI "http://127.0.0.1:44972"
node4: node ID "NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu", URI "http://127.0.0.1:15036"
node5: node ID "NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5", URI "http://127.0.0.1:56655"
```

next I used [https://docs.avax.network/](https://docs.avax.network/)

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    }
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/keystore
```

`
{"jsonrpc":"2.0","result":{"success":true},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```
`
{"jsonrpc":"2.0","result":{"address":"P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3"},"id":1}
`

maybe you can use any private

```
curl --location --request POST '127.0.0.1:33457/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    }
}'
```

`
{"jsonrpc":"2.0","result":{"address":"X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3",
        "assetID": "AVAX",
        "amount": 4000000000000,
        "changeAddr": "X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p",
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    }
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/bc/X
```

`
{"jsonrpc":"2.0","result":{"txID":"vwcwzhTUkHKFjvm1sgPt5fFxyRf6JjPUVC4vTF8YRksKYRC2Y","changeAddr":"X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"},"id":1}
`

```
curl --location --request POST '127.0.0.1:33457/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p",
      "assetID": "AVAX"
  }
} '
```

`
{"jsonrpc":"2.0","result":{"balance":"299995999999000000","utxoIDs":[{"txID":"vwcwzhTUkHKFjvm1sgPt5fFxyRf6JjPUVC4vTF8YRksKYRC2Y","outputIndex":0}]},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.importAVAX",
    "params": {
        "to":"P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3",
        "sourceChain":"X",
        "changeAddr":"P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p",
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/bc/P
```

after will be minnig blocks

`
{"jsonrpc":"2.0","result":{"txID":"RMPD1zZy6nwHjLYP2tK71588oNgX4FesCXxjnhDhNCRjTETP1","changeAddr":"P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getBalance",
    "params":{
        "address":"P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/bc/P
```

`
{"jsonrpc":"2.0","result":{"balance":"3999999000000","unlocked":"3999999000000","lockedStakeable":"0","lockedNotStakeable":"0","utxoIDs":[{"txID":"RMPD1zZy6nwHjLYP2tK71588oNgX4FesCXxjnhDhNCRjTETP1","outputIndex":0}]},"id":1}
`

for create subnet add second address
```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```
`
{"jsonrpc":"2.0","result":{"address":"P-custom1xz4fqde3we0v24ptnldz38wh8ddmazhmyjz3zr"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3",
            "P-custom1xz4fqde3we0v24ptnldz38wh8ddmazhmyjz3zr"
        ],
        "threshold":2,
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"txID":"WcqRHTf8JJ3nZACsQT2vgx7kvpvSAeP48mVF1Vt53pnbHoN7N","changeAddr":"P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"subnets":[{"id":"WcqRHTf8JJ3nZACsQT2vgx7kvpvSAeP48mVF1Vt53pnbHoN7N","controlKeys":["P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3","P-custom1xz4fqde3we0v24ptnldz38wh8ddmazhmyjz3zr"],"threshold":"2"},{"id":"11111111111111111111111111111111LpoYY","controlKeys":[],"threshold":"0"}]},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/info
```

`
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
        "subnetID":"WcqRHTf8JJ3nZACsQT2vgx7kvpvSAeP48mVF1Vt53pnbHoN7N",
        "startTime":'$(date --date="10 minutes" +%s)',
        "endTime":'$(date --date="30 days" +%s)',
        "weight":30,
        "changeAddr": "P-custom1prmvt0tg9hjj9q3vlnjd3zcsk673zfc724t8uf",
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"txID":"2rsBnQAnSGgwNNcu5VywhVBwkzt85mpEe6K7g1qihNnSXoLVaG","changeAddr":"P-custom1prmvt0tg9hjj9q3vlnjd3zcsk673zfc724t8uf"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getTxStatus",
    "params": {
        "txID":"2rsBnQAnSGgwNNcu5VywhVBwkzt85mpEe6K7g1qihNnSXoLVaG"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"status":"Committed"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getPendingValidators",
    "params": {"subnetID":"WcqRHTf8JJ3nZACsQT2vgx7kvpvSAeP48mVF1Vt53pnbHoN7N"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"validators":[{"txID":"2rsBnQAnSGgwNNcu5VywhVBwkzt85mpEe6K7g1qihNnSXoLVaG","startTime":"1652460876","endTime":"1655052276","weight":"30","nodeID":"NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg"}],"delegators":[]},"id":1}
`

mb it is first step

```
git clone https://github.com/ava-labs/subnet-evm.git
cd subnet-evm
./scripts/build.sh ./build/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
cp ./build/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy ../avalanchego/build/plugins/
```

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "subnetevm.buildGenesis",
    "params": {
    "genesisData": {
        "config": {
        "chainID": 13213,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0,
        "feeConfig": {
            "gasLimit": 8000000,
            "targetBlockRate": 2,
            "minBaseFee": 13000000000,
            "targetGas": 15000000,
            "baseFeeChangeDenominator": 36,
            "minBlockGasCost": 0,
            "maxBlockGasCost": 1000000,
            "blockGasCostStep": 200000
        },
        "allowFeeRecipients": false
        },
        "alloc": {
        "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
            "balance": "333333333333333333333"
        }
        },
        "timestamp": "0x0",
        "gasLimit": "0x7A1200",
        "difficulty": "0x0",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "coinbase": "0x0000000000000000000000000000000000000000",
        "number": "0x0",
        "gasUsed": "0x0",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
    }
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc
```

`
{"jsonrpc":"2.0","result":{"genesisBytes":"8WigDBVuqFPxoanycxLED2YCVuzjCBoSPLL2Q9PWrVZnh4vwVgBxodTBJBzD7CVC3UJDSe2EfmQgBPFb1UKWHV2TgtjtZMDuSTfxmtu9fFmvY7FsdUzrx7WQUF4w6XkZpybsp3a8gHgf2JBWvNEKsytRAP24kyuZ8amp9v3ecgVVCNu6h1z4W2iAwnXuq9TZZSrhK2RHQLr1tB8XTX16aqSg5uQuEb261p5XuQQ5atbeScJkG9pVfL2Tk7ZULjyGYVv72AkA7zn1qZehYq31dusjHfEhqfPBnAZ641dxRMjwJZ9NjCfye6dz78BdAA2X3aUYyhfvC8P6NK8nHXZ7Ux6cHfc5aQhdw1gk2oH5ffRE7gAEbCChwyjmdTqZTm3pur1X7QxbzuqQvBAc6Ay9QszfwD4wqf5JAZtAs7qiPTT3EA9qzty4TV6DBfVkq8cJsNPiRjtuG4TLj7tCSiHLskticWB2J8mgKyK5xRgA9886JJxsmBuDvD167Ac6fB5UKvgp1MTDm1Kx5DmYytvUvWJa3bQoHhHGjyxXg5qrn3Nd76dcNzwcE2GkVBT3AWsyANAAYLTS9VEgZv4tLsy54x35VwuhswTRxikPqDJ9ZAFcgpWXSzkYAmBNCcdk1h5CSRfnTUURW4Dzaok1GZx2jbnorzxwpxcz7FDDaquLtwskJoXs3joCxM4Rr3Ty7pZLRS3hYevBdvNKV6a2CYi9FwCWEEPi1rxUHXQq3LsjJ5F5ygeH9NQsDXRQf3upiDDkqYGd13v1kfuWek1d7PkUADK8RtVctvrNdB4nvrHkpbb7ZHKsLN9B1z5yHJzFkdd7Z2Tp7NogmF6iPwBbXPm6VG5nRgLZB6wzHfuQ5eGSMJr1pwHFSnTsHg9KDJz9LuSZWQ7QEASAXDhxwCruQuAmg7mSf7RFx6kaEBUcHd37RhtWPEftmsjP3KVkirVnFoALTkS79JckhmSTYfRTyeb2EYpUzPQJjUVSY7tCroejNfr3LYh9J4Bm68vFjZNaWbTNs9mZrEvpRqEfR3KE8bwL4mtM1JwENZGG7fttMN1ZvxwiHjYTFuSGgdfEcC1GWzrUwKzyY1Hy8uVxXvbnf1UrVsCLRGT4RtCXxrAHjx9aRbECHK4fCi4yq6QQ7gfeBWGUtzHroM3z4kAC3AYhAfB9p952PrCee7msUazvnpZpLuRExN9hjhMfB3tm4xA6xqH3dhgAam27MSmeoY8yWQwxaaroJ2psqKN6HDCajxvHQxAFtNnx9AVXFvSBuv8nA3fzGX1Ah5x4RkuMyKBnknthCp8yd4hXcSdtsdhwUuY4m7UDc7QTf1EbZX4tj2fykdybzGBSQZnSTi5YresNpmLLhqzUXuEv7ye5KpHncKUonXncGHZdfeuStsZK1kV1MgN5kJn2pqi7R4n9whEtNLNW637f4fcgGHacJv4yTrc4wmPjNoUszN5agfzShEAQcns12tdPYUEHSWhEm4HojcBq4BcfKUguimF5v1Dy193BoMNpP3Bd2QydR3B3TtHXguSmhQBAMByJ46azkg12wYugWMn1XRf3AenKuwuujppNUESTCEPFjWya788NCCjt7zMT8JttXeJ7EUzuFsnfe9mweDLyGiRTrEHqtgSk8dpk6qQTk1oWGGEGKs9Wwqbs6s63opQp9kxAatW1rLXfgTmXQgBL3i6caayvbprG2bmfUMa6myKSTYctbGdeJ96XeCg95CXJa3FuhvN7CGWBycE","encoding":"cb58"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "WcqRHTf8JJ3nZACsQT2vgx7kvpvSAeP48mVF1Vt53pnbHoN7N",
        "vmID":"srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy",
        "name":"My new EVM",
        "genesisData": "8WigDBVuqFPxoanycxLED2YCVuzjCBoSPLL2Q9PWrVZnh4vwVgBxodTBJBzD7CVC3UJDSe2EfmQgBPFb1UKWHV2TgtjtZMDuSTfxmtu9fFmvY7FsdUzrx7WQUF4w6XkZpybsp3a8gHgf2JBWvNEKsytRAP24kyuZ8amp9v3ecgVVCNu6h1z4W2iAwnXuq9TZZSrhK2RHQLr1tB8XTX16aqSg5uQuEb261p5XuQQ5atbeScJkG9pVfL2Tk7ZULjyGYVv72AkA7zn1qZehYq31dusjHfEhqfPBnAZ641dxRMjwJZ9NjCfye6dz78BdAA2X3aUYyhfvC8P6NK8nHXZ7Ux6cHfc5aQhdw1gk2oH5ffRE7gAEbCChwyjmdTqZTm3pur1X7QxbzuqQvBAc6Ay9QszfwD4wqf5JAZtAs7qiPTT3EA9qzty4TV6DBfVkq8cJsNPiRjtuG4TLj7tCSiHLskticWB2J8mgKyK5xRgA9886JJxsmBuDvD167Ac6fB5UKvgp1MTDm1Kx5DmYytvUvWJa3bQoHhHGjyxXg5qrn3Nd76dcNzwcE2GkVBT3AWsyANAAYLTS9VEgZv4tLsy54x35VwuhswTRxikPqDJ9ZAFcgpWXSzkYAmBNCcdk1h5CSRfnTUURW4Dzaok1GZx2jbnorzxwpxcz7FDDaquLtwskJoXs3joCxM4Rr3Ty7pZLRS3hYevBdvNKV6a2CYi9FwCWEEPi1rxUHXQq3LsjJ5F5ygeH9NQsDXRQf3upiDDkqYGd13v1kfuWek1d7PkUADK8RtVctvrNdB4nvrHkpbb7ZHKsLN9B1z5yHJzFkdd7Z2Tp7NogmF6iPwBbXPm6VG5nRgLZB6wzHfuQ5eGSMJr1pwHFSnTsHg9KDJz9LuSZWQ7QEASAXDhxwCruQuAmg7mSf7RFx6kaEBUcHd37RhtWPEftmsjP3KVkirVnFoALTkS79JckhmSTYfRTyeb2EYpUzPQJjUVSY7tCroejNfr3LYh9J4Bm68vFjZNaWbTNs9mZrEvpRqEfR3KE8bwL4mtM1JwENZGG7fttMN1ZvxwiHjYTFuSGgdfEcC1GWzrUwKzyY1Hy8uVxXvbnf1UrVsCLRGT4RtCXxrAHjx9aRbECHK4fCi4yq6QQ7gfeBWGUtzHroM3z4kAC3AYhAfB9p952PrCee7msUazvnpZpLuRExN9hjhMfB3tm4xA6xqH3dhgAam27MSmeoY8yWQwxaaroJ2psqKN6HDCajxvHQxAFtNnx9AVXFvSBuv8nA3fzGX1Ah5x4RkuMyKBnknthCp8yd4hXcSdtsdhwUuY4m7UDc7QTf1EbZX4tj2fykdybzGBSQZnSTi5YresNpmLLhqzUXuEv7ye5KpHncKUonXncGHZdfeuStsZK1kV1MgN5kJn2pqi7R4n9whEtNLNW637f4fcgGHacJv4yTrc4wmPjNoUszN5agfzShEAQcns12tdPYUEHSWhEm4HojcBq4BcfKUguimF5v1Dy193BoMNpP3Bd2QydR3B3TtHXguSmhQBAMByJ46azkg12wYugWMn1XRf3AenKuwuujppNUESTCEPFjWya788NCCjt7zMT8JttXeJ7EUzuFsnfe9mweDLyGiRTrEHqtgSk8dpk6qQTk1oWGGEGKs9Wwqbs6s63opQp9kxAatW1rLXfgTmXQgBL3i6caayvbprG2bmfUMa6myKSTYctbGdeJ96XeCg95CXJa3FuhvN7CGWBycE",
        "username":"admin",
        "password":"18jma8ppw3nhx5r4ap8claz"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"txID":"2pBdKavzid8xEJ4foeMRcMoEH36RsuBjTdn1q86FRiUTezR3Gy","changeAddr":"P-custom1rde3ylkuns8e40gs6nhd3j5ym6gdarquymvnx3"},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"blockchains":[{"id":"2pBdKavzid8xEJ4foeMRcMoEH36RsuBjTdn1q86FRiUTezR3Gy","name":"My new EVM","subnetID":"WcqRHTf8JJ3nZACsQT2vgx7kvpvSAeP48mVF1Vt53pnbHoN7N","vmID":"srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy"},{"id":"BR28ypgLATNS6PbtHMiJ7NQ61vfpT27Hj8tAcZ1AHsfU5cz88","name":"C-Chain","subnetID":"11111111111111111111111111111111LpoYY","vmID":"mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"},{"id":"qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7","name":"X-Chain","subnetID":"11111111111111111111111111111111LpoYY","vmID":"jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"}]},"id":1}
`

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"2pBdKavzid8xEJ4foeMRcMoEH36RsuBjTdn1q86FRiUTezR3Gy"
    }
}' -H 'content-type:application/json;' 127.0.0.1:33457/ext/P
```

`
{"jsonrpc":"2.0","result":{"status":"Created"},"id":1}
`

#!!!WARRING!!

[from docs](https://docs.avax.network/subnets/create-evm-blockchain#validating-blockchain)

```
Validating the Blockchain
Every blockchain needs a set of validators to validate and process transactions on it. You can check if a node is validating a given blockchain by calling platform.getBlockchainStatus on that node:

curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"zZtgbGDPpJaz7zWL6cXi1sSJRW1sMQH4s119GURVYGPXkrUaE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P

{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}

If it responds "Validating", the node is validating the given chain. If it responds "Syncing", then the chain tracked by this node but it is not validating. If it responde "Created" then the chain exists but it is not being synced. Note that in order to validate or watch a subnet, you need to start your node with argument --whitelisted-subnets=[subnet ID goes here] (e.g. --whitelisted-subnets=29uVeLPJB1eQJkzRemU8g8wZDw5uJRqpab5U2mX9euieVwiEbL) as well as add the node to the subnet's validator set.

More information can be found in the Adding a Subnet Validator tutorial. 
```

I started a cluster nodes [https://docs.avax.network/quickstart/create-a-local-test-network#start-a-new-avalanche-network-with-five-nodes-a-cluster](https://docs.avax.network/quickstart/create-a-local-test-network#start-a-new-avalanche-network-with-five-nodes-a-cluster)

I don't know how restart these nodes with `--whitelisted-subnets=` argument. May be it possible through API.

