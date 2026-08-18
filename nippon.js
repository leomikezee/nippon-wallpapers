const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ "Accept-Language": "en, en-US" });
  // adjust resolution according to your monitors
  await page.setViewport({ width: 2560, height: 1600 });
  await page.goto("http://nipponcolors.com/");
  // there are totally 250 different colors
  for (i = 1; i <= 250; i++) {
    let index = i.toString().padStart(3, "0");
    await page.click("#col" + index + " > div:nth-child(1) > a:nth-child(1)");
    // wait for animation which leads to a VERY LONG execution time
    await page.waitForFunction(
      'document.querySelector("#colorTitle").className == "altText fadeOut"',
    );
    await page.waitForFunction(
      'document.querySelector("#colorTitle").className == "altText fadeIn"',
    );
    await page.waitForFunction(
      'document.querySelector("#colorTitle").className == "altText"',
    );
    // remove unwanted elements
    await page.evaluate(
      (sel) => {
        let elements = document.querySelectorAll(sel);
        for (j = 0; j < elements.length; j++) {
          elements[j].parentNode.removeChild(elements[j]);
        }
      },
      [
        "#logo",
        "#E",
        "#safari > a:nth-child(1) > img:nth-child(1)",
        "#switch",
        "#shareButtons",
        "#copy",
        "#heteml",
        "#cite",
      ],
    );
    // take a screenshot and save as .png file
    await page.screenshot({ path: "NIPPON-" + index + ".png" });
  }
  await browser.close();
})();
