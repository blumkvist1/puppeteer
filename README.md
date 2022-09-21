1. Ввести команду npm install для подгрузки пакетов
2. Запуск скрипта производится командой:

node scrape.js <URL>
Примеры:

node scrape.js https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202
node scrape.js https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-2-5-950g--310778
node scrape.js https://www.vprok.ru/product/makfa-makfa-izd-mak-spirali-450g--306739
node scrape.js https://www.vprok.ru/product/greenfield-greenf-chay-gold-ceyl-bl-pak-100h2g--307403
node scrape.js https://www.vprok.ru/product/chaykofskiy-chaykofskiy-sahar-pesok-krist-900g--308737

После первого запуска в корне проекта создаются два файла product.txt и screenshot.jpg
Затем, в последующих запусках product.txt добавляются данные, 
а screenshot.jpg полностью заменяется
