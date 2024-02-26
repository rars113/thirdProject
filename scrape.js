//packages

const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();
const accsid = process.env.TWILIOACC_SID;
const authToken = process.env.TWILIOAUTH;
const client =require('twilio')(accsid, authToken);


const url = 'https://www.amazon.com/Scarlet-Letter-Oxford-Worlds-Classics/dp/0199537801/ref=sr_1_9?crid=Y3X9HJJ9Y5TI&dib=eyJ2IjoiMSJ9.vrs_ciTb7h1VlH-vjsVIL9acw8a2smr2fZAy5r6OzNG2ITBaXfM4auYLrmFw1KWveFfGnNHYDgxhw-SMy0txjgB5EKsN-DBYRRJ9A0ECNAUg9G8dQ51YyopWB--PMqTPCq5QS0Mf2H4uFBG8TWnipRXwMGyIBLDkV3uxDXVH_CjwoXVNHq47ktnsU7DKH9YIwUJQy1MLu1uQ1qXZuKAf6oWqkI4dVIUGoCR1H0yQfcka-T1h35W__-Qu3vS6WBD63HswUunITyOukytTX4PVBAIQFEVMUnGq2DMvJJgVHyA.1LfLXxmUG2zTCurnsvlyiJ3r2qnRGYTogRt1NGCYO34&dib_tag=se&keywords=scarlet+letter&qid=1708921250&sprefix=scarlet+letter%2Caps%2C137&sr=8-9';

const product = {name: "", price:"", link: ""};

//set interval
const handle = setInterval(scrape, 20000);


async function scrape() {
    //get data
    const {data} = await axios.get(url);
    //load html with cheerio
    const $ = cheerio.load(data);
    const item = $('div#dp-container')
    //extract needed data
    product.name = $(item).find('h1 span#productTitle').text();
    product.link = url;
    const price = $(item).find('span .a-price-whole'.first().text().replace(/[,.]/g, ""));
    const priceNum = parseInt(price);
    product.price = priceNum;

    //sendSMS
    if(priceNum < 1000) {
        client.messages.create({
            body: "the price of ${product.name} went below ${price}. Purchase at ${product.link}",
            from: "+18554808872",
            to: '+18322107167'
        })
        .then((message) => {
            console.log(message);
            clearInterval(handle);
        })
        
    }

}

scrape();
