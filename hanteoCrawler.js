const puppeteer = require('puppeteer');

module.exports = monthlySale = async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://gaonchart.co.kr/main/section/chart/album.gaon?nationGbn=T&serviceGbn=&termGbn=month');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const albumList = await page.evaluate(() => {
        let nameListHtml = document.getElementsByClassName('subject');
        nameListHtml = [...nameListHtml].splice(0, 10);
        let saleCountListHtml = document.getElementsByClassName('count');
        saleCountListHtml = [...saleCountListHtml].splice(0, 10);
        let nameList = nameListHtml.map((html, index) => `${index+1}: ${html.innerText}`);
        let saleCountList = saleCountListHtml.map(html => html.innerText);
        let result = [];
        for (let i = 0; i <= nameList.length-1; i++) {
            result += `${nameList[i]} \n amount: ${saleCountList[i]} \n\n`
        }
        return result;
    });

    // In ra kết quả và đóng trình duyệt
    await browser.close();
    return albumList
}
