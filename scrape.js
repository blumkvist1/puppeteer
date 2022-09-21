const fs = require('fs');
const puppeteer = require('puppeteer');

function writer(price, priceOld, raiting, reviewCount) {
   //Здесь я проверяю, если файл не существует, то создаю и записываю в него данные,
   //если он существует, то я добавляю к нему данные


   fs.stat('product.txt', err => {
      if (priceOld === 0) {
         var newProducts = `price=${price}\nraiting=${raiting}\nreviewCount=${reviewCount}\n` + '\n';
         
      }
      else {
         newProducts = `price=${price}\npriceOld=${priceOld}\nraiting=${raiting}\nreviewCount=${reviewCount}\n` + '\n';
      }

      if (err) {
         fs.writeFile('product.txt', newProducts, (err) => { if (err) console.log(err); });
      }
      else {
         fs.appendFile('product.txt', newProducts, (err) => { if (err) console.log(err); })
      }
   })
}

let scrape = async (link) => {

   const browser = await puppeteer.launch({ headless: true });
   const page = await browser.newPage();

   await page.goto(link);
   await page.waitForSelector('.js-price-rouble', { timeout: 60000 }) //жду появления селектора и  устанавливаю новое дефолтное значение времени ожидания
   await page.setViewport({ width: 1280, height: 720 }); //задаю размеры окна
   

   await page.screenshot({ path: 'screenshot.jpg' });

   //Достаю все данные которые нужны

   let price = await page.$eval('.js-price-rouble', span => span.textContent);
   let pricePenny = await page.$eval('.xf-product-new__price-main-text-penny.js-price-penny', span => span.textContent);

   let priceOld = await page.$eval('.js-old-price-rouble', span => span.textContent);
   let pricePennyOld = await page.$eval('.xf-product-new__price-main-text-penny.js-old-price-penny', span => span.textContent);

   let raiting = await page.$eval('.xf-product-new-statistics__rating-value', span => span.textContent);
   let reviewCount = await page.$eval('.xf-product-new-statistics__buyers-count', span => span.textContent);
   
   await browser.close();

   //Конвертирую все данные в числовой формат
   price = parseFloat((price + pricePenny).replace(/,/, '.'));
   priceOld = parseFloat((priceOld + pricePennyOld).replace(/,/, '.'));
   raiting = parseFloat(raiting);
   reviewCount = parseInt(reviewCount);

   writer(price, priceOld, raiting, reviewCount);
};

//Проверяю передана ли ссылка третьим аргументом
if (process.argv[2]) { 
   scrape(process.argv[2]);
}
else {
   console.log("Don't founded URL!")
}