const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();

app.use(
	cors({
		origin: "*",
	})
);

require("dotenv").config;

const port = process.env.PORT || 5000;

async function execPuppeteer() {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch({
		headless: false,
	});
	const page = await browser.newPage();

	// Navigate the page to a URL
	await page.goto("https://www.google.com/");

	// Set screen size
	await page.setViewport({ width: 1080, height: 1024 });
	setTimeout(() => {
		console.log("2 secs completed");
		browser.close();
	}, 2000);

	// Type into search box
	// await page.type(".search-box__input", "automate beyond recorder");

	// // Wait and click on first result
	// const searchResultSelector = ".search-box__link";
	// await page.waitForSelector(searchResultSelector);
	// await page.click(searchResultSelector);

	// // Locate the full title with a unique string
	// const textSelector = await page.waitForSelector(
	// 	"text/Customize and automate"
	// );
	// const fullTitle = await textSelector?.evaluate((el) => el.textContent);

	// // Print the full title
	// console.log('The title of this blog post is "%s".', fullTitle);
}

app.get("/", (req, res) => {
	console.log("on /");
	return res.status(200).json({ success: true });
});

app.get("/search", (req, res) => {
	execPuppeteer();
	return res.status(200).json({ success: true });
});

app.listen(port, () => console.log(`Example app listening on port, ${port}!`));
