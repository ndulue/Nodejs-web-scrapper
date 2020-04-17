const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const writeStream = fs.createWriteStream('coro_stats.csv');

writeStream.write(`Continent,Total Cases, New Cases, Total Deaths, Total Recovered, Active Cases, Critical Cases \n`);

request("https://www.worldometers.info/coronavirus/", (error, response, html) => {

    if (!error && response.statusCode == 200) {

        //var data = [];

        const $ = cheerio.load(html);

        // const row_world = $('#maincounter-wrap').attr("data-continent", "Asia")

        // console.log(row_world.children('h1').next().text());

        $("tbody .total_row").each((i, rl) => {
            const continent = $(rl).find("td[data-continent]").text().replace(/\s\s+/g, '\n');

            const total = $(rl).find("td:nth-child(2)").text().replace(/\s\s+/g, '\n');

            const new_cases = $(rl).find("td:nth-child(3)").text().replace(/\s\s+/g, '\n');

            const total_deaths = $(rl).find("td:nth-child(4)").text().replace(/\s\s+/g, '\n');

            const total_Recovered = $(rl).find("td:nth-child(6)").text().replace(/\s\s+/g, '\n');

            const active_cases = $(rl).find("td:nth-child(7)").text().replace(/\s\s+/g, '\n');

            const critical_cases = $(rl).find("td:nth-child(8)").text().replace(/\s\s+/g, '\n');

            //data.push(continent, total, new_cases, total_deaths, total_Recovered, active_cases, Critical_cases)

            if (i < 6) {
                //Write data to csv
                writeStream.write(`${continent}, ${total}, ${new_cases}, ${total_deaths}, ${total_Recovered}, ${active_cases}, ${critical_cases} \n`)

            }


        });

        console.log("scrapped");

    }
});