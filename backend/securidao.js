const https = require('https');
const fs = require('fs')

let url = "https://api.showkarma.xyz/api/dao/delegates?name=ens&pageSize=250&offset=0";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let raw = JSON.parse(body);
						let line = "#rank #name #perc #votes" + "\n"
						fs.writeFileSync('ENS.log', line)
						for (var i = 0; i < Object.keys(raw.data.delegates).length; i++){
  						var data = raw.data.delegates[i]
							let rank = i + 1
							let votes = Math.max(data.stats[0].delegatedVotes, data.stats[1].delegatedVotes)
							let totalVotes = 25000000 / 100
							let percentage = votes / totalVotes
							let values = rank + " " + data.ensName + " " + percentage + " " + votes + "\n"
							fs.writeFileSync('ENS.log', values, { flag: 'a+' }, err => {})
  						//for (var key in data){
    					//	var value = data[key];
    					//	console.log(" - " + key + ": " + value);
  						//}
						}
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});
