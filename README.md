# thirdProject

Description:
The scrape.js file utilizes a given url to break down into certain given variables such as price and name of a certain product. When the desired information is found (in this case, a certain price level), the program notifies the user via SMS. The package.json and package-lock.json files store the packages as dependencies and store information about each package, respectively. 

USAGE:
To change link or page that needs to be scraped, simply change the url under the const variable "url". 
To change scraping parameters change the variables under the "scrape" function. 
To change the phone number that will recieve the notification of updated scraping information do the following:
- create a Twilio account
- put the authentication token and account SID under the appropriate variables within the .env file
- use the provided twilio phone number under the "from" parameter under the SMS function
- use a twilio verified phone number under the "to" parameter

Dependencies (Packages):
1. Node js
2. npm i cheerio
3. npm i axios
4. npm i twilio (for the SMS notiification)
5. npm i dotenv

To run code (for best results use an appropriate vm such as vscode):
** node scrape.js **
