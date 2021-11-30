#####playwright-e2e####
========= My Playwright Project :========
Author: Dima Gurevich 29/11/2021 ,  E2E UI testings , Allure reporting fully integrated , package.json scripts ready for CI .

For Jenkins With parameters:

npx playwright test --grep "%Tag%" --browser "%browser%" --workers=%NumberOfThreads%

i.e:
npx playwright test --grep "@API" --browser "chromium" --workers=2
