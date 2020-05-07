const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const writeStream = fs.createWriteStream('coro_stats.csv');

writeStream.write(`Country, Total Cases, New Cases, Total Deaths, New Deaths, Total Recovered, Active Cases, Critical Cases, Total Tests, Continent \n`);

request("https://www.worldometers.info/coronavirus/#c-all%22", (error, response, html) => {

    if (!error && response.statusCode == 200) {

        //var data = [];

        const $ = cheerio.load(html);


        // const row_world = $("#main_table_countries_today > tbody:nth-child(2) > tr:nth-child(" + i + ")").text().replace(/\s\s+/g, '\n');

        // console.log(row_world);


        for (i = 8; i <= 221; i++) {
            const row_world = $("#main_table_countries_today > tbody:nth-child(2) > tr:nth-child(" + i + ")").each((i, rl) => {
                const country = $(rl).find("td:nth-child(1)").text().replace(/\s\s+/g, '\n');

                const total = $(rl).find("td:nth-child(2)").text().replace(/\s\s+/g, '\n');

                const new_cases = $(rl).find("td:nth-child(3)").text().replace(/\s\s+/g, '\n');

                const total_deaths = $(rl).find("td:nth-child(4)").text().replace(/\s\s+/g, '\n');

                const new_deaths = $(rl).find("td:nth-child(5)").text().replace(/\s\s+/g, '\n');

                const total_Recovered = $(rl).find("td:nth-child(6)").text().replace(/\s\s+/g, '\n');

                const active_cases = $(rl).find("td:nth-child(7)").text().replace(/\s\s+/g, '\n');

                const critical_cases = $(rl).find("td:nth-child(8)").text().replace(/\s\s+/g, '\n');

                const total_tests = $(rl).find("td:nth-child(11)").text().replace(/\s\s+/g, '\n');

                const continent = $(rl).find("td:nth-child(13)").text().replace(/\s\s+/g, '\n');

                //data.push(continent, total, new_cases, total_deaths, total_Recovered, active_cases, Critical_cases)


                //console.log(country, total, new_cases, total_deaths, new_deaths, total_Recovered, active_cases, critical_cases, total_tests, continent);
                writeStream.write(`${country}, ${total}, ${new_cases}, ${total_deaths}, ${new_deaths}, ${total_Recovered}, ${active_cases}, ${critical_cases}, ${total_tests}, ${continent} \n`);

            });
        }

        console.log("scrapped");
    }
});