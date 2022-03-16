const puppeteer = require('puppeteer');
const {
  limitString,
  generateRandomNumberRange,
  editImage,
  selectedDirPhotos
} = require('./helpers.js')

const awaitPageToLoad = 'html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div > div:nth-of-type(1) > div > div > div:nth-of-type(1) > ul > li > div > a > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div > div > span > span'

const env = {
  url: "https://www.facebook.com/",
  createNewPostUrl: "https://www.facebook.com/marketplace/create/item",
  email: 'html > body > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > form > div:nth-of-type(1) > div:nth-of-type(1) > input',
  password: 'html > body > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > form > div:nth-of-type(1) > div:nth-of-type(2) > div > input',
  submit: "html > body > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(1) > form > div:nth-of-type(2) > button",
  createNewPost: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(3) > div:nth-of-type(2) > div > div",
  selectTitleType2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(4) > div > div > label > div > div > input",
  selectTitleType3: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(4) > div > div > label > div > div > input",
  slectPriceType2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(5) > div > div > label > div > div > input",
  slectPriceType3: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(5) > div > div > label > div > div > input",
  selectCategoryType2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(6) > div > div > div > label",
  selectCategoryType3: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(6) > div > div > div > label",
  optionsCategory: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(2) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div > div > div > div > span > div > div:nth-of-type(4) > div > div:nth-of-type(1) > div",
  selectStateType2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(8) > div > div > div > label",
  selectStateType2_2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(7) > div > div > div > label",
  selectStateType3: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(8) > div > div > div > label",
  selectStateType3_2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(7) > div > div > div > label",
  selectStateType4: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(7) > div > div > div > label",
  selectDescriptionType2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(9) > div > div > label > div > div > textarea",
  selectDescriptionType3: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(9) > div > div > label > div > div > textarea",
  selectDescriptionType4: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div > div > div:nth-of-type(8) > div > div > label > div > div > textarea",
  selectNextStepPublishType3: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div > div > div:nth-of-type(2)",
  selectNextStepPublishType4: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(4) > div > div > div > div > div:nth-of-type(2)",
  selectFinishPublishType3_1: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(2) > div > div > div:nth-of-type(1)",
  selectFinishPublishType3_2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(2) > div > div > div:nth-of-type(2)",
  selectFinishPublishType4_1: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(4) > div:nth-of-type(2) > div > div > div:nth-of-type(1)",
  selectFinishPublishType4_2: "html > body > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div > div:nth-of-type(4) > div:nth-of-type(2) > div > div > div:nth-of-type(2)",
}


const {
  url, email, password, submit,
  createNewPostUrl, createNewPost,
  selectTitleType2, selectTitleType3,
  slectPriceType2, slectPriceType3,
  selectCategoryType2, selectCategoryType3, optionsCategory,
  selectStateType2, selectStateType3,
  selectStateType2_2, selectStateType3_2,
  selectStateType4,
  selectDescriptionType2, selectDescriptionType3,
  selectDescriptionType4,
  selectNextStepPublishType3, selectNextStepPublishType4,
  selectFinishPublishType3_1, selectFinishPublishType3_2, selectFinishPublishType4_1, selectFinishPublishType4_2
} = env;



const createRobotDummy = async (stateEmail, statePass, hideBrowser = false) => {
  const browser = await puppeteer.launch({ headless: hideBrowser, slowMo: 10 });
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);

  page = await browser.newPage();
  await page.goto(url);

  await page.type(email, stateEmail)
  await page.type(password, statePass)
  await page.click(submit)

  await page.waitForSelector('[aria-label="Facebook"][role="contentinfo"]')
}


const runFacebookPostDummy = async ({
  title,
  price,
  details,
  cover,
  dirPathPhotos,
}, codition, defaultLabelOnTitleAndDescription, imageText) => {
  editImage(dirPathPhotos, cover, imageText)
  await page.goto(createNewPostUrl);
  await page.waitForSelector(createNewPost)


  // select files
  const photos = await selectedDirPhotos(dirPathPhotos)

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(createNewPost),
  ]);
  await fileChooser.accept(photos);

  await selectTitle(title, defaultLabelOnTitleAndDescription)

  await selectPrice(price)

  await selectCategory()

  await stepCondition()
  await selectCondition(codition)

  await stepsAfterCondition(details, defaultLabelOnTitleAndDescription)

  console.log('keep running');

}

async function selectTitle(title, defaultLabelOnTitleAndDescription) {
  // selec title
  const wichTitleChoose = await page.evaluate((selectTitleType2, selectTitleType3) => {
    const title2 = document.querySelector(selectTitleType2)
    const title3 = document.querySelector(selectTitleType3)

    if (title2) {
      return selectTitleType2
    } else if (title3) {
      return selectTitleType3
    } else {
      return 'none'
    }
  }, selectTitleType2, selectTitleType3)

  // select title
  await page.type(wichTitleChoose, limitString(title + defaultLabelOnTitleAndDescription, 99))
}

async function selectPrice(price) {
  // select price
  const wichPriceChoose = await page.evaluate((slectPriceType2, slectPriceType3) => {
    const price2 = document.querySelector(slectPriceType2)
    const price3 = document.querySelector(slectPriceType3)

    if (price2) {
      return slectPriceType2
    } else if (price3) {
      return slectPriceType3
    } else {
      return 'none'
    }
  }, slectPriceType2, slectPriceType3)

  // select price
  await page.type(wichPriceChoose, price)
}

async function selectCategory() {
  // select category
  const wichCategoryChoose = await page.evaluate((selectCategoryType2, selectCategoryType3) => {
    const category2 = document.querySelector(selectCategoryType2)
    const category3 = document.querySelector(selectCategoryType3)

    if (category2) {
      return selectCategoryType2
    } else if (category3) {
      return selectCategoryType3
    } else {
      return 'none'
    }
  }, selectCategoryType2, selectCategoryType3)

  // select category
  await page.waitForTimeout(generateRandomNumberRange(2500, 1500))
  await page.waitForSelector(selectCategoryType2)
  await page.click(wichCategoryChoose)
  await page.waitForTimeout(1000)
  await page.waitForSelector(optionsCategory)
  await page.click(optionsCategory)
}

async function stepCondition() {
  await page.waitForTimeout(2000)


  const wichStateChoose = await page.evaluate(
    (selectStateType2, selectStateType2_2, selectStateType3, selectStateType3_2, selectStateType4) => {
      const state2 = document.querySelector(selectStateType2)
      const state3 = document.querySelector(selectStateType3)
      const state4 = document.querySelector(selectStateType4)
      const state2_2 = document.querySelector(selectStateType2_2)
      const state3_2 = document.querySelector(selectStateType3_2)

      if (state2) {
        console.log(1);
        console.log(state2);
        return selectStateType2
      } else if (state2_2) {
        console.log(state2_2);
        console.log(2);
        return state2_2
      } else if (state3) {
        console.log(state3);
        console.log(3);
        return selectStateType3
      } else if (state3_2) {
        console.log(state3_2);
        console.log(3);
        return selectStateType3_2
      } else if (state4) {
        console.log(state4);
        console.log(4);
        return selectStateType4
      } else {
        console.log(5);
        return 'none'
      }
    }, selectStateType2, selectStateType2_2, selectStateType3, selectStateType3_2, selectStateType4)

  // select state
  await page.waitForTimeout(3000)
  try {
    console.log(wichStateChoose ? 'try' : 'catch');
    await page.waitForSelector(wichStateChoose)
    await page.waitForTimeout(1000)
    await page.click(wichStateChoose)
  } catch (error) {
    console.log('page label');
    await page.waitForTimeout(1000)
    await page.click('[aria-label="Estado"]')
  }
}

async function selectCondition(loop) {
  const conditionLoop = {
    'new': 1,
    'used-new': 2,
    'used-good': 3,
    'used': 4,
  }
  for (let i = 1; i <= conditionLoop[loop]; i++) {
    await page.waitForTimeout(generateRandomNumberRange(400, 100))
    await page.keyboard.press('ArrowDown');
  }
  await page.waitForTimeout(1000)
  await page.keyboard.press('Enter');
}

async function stepsAfterCondition(details, defaultLabelOnTitleAndDescription) {

  await selectDescription(details, defaultLabelOnTitleAndDescription)

  await nextStepPublish()

  await stepSelectGroups()

  await stepFinishPublish()
}

async function selectDescription(details, defaultLabelOnTitleAndDescription) {
  // select description
  const wichDescriptionChoose = await page.evaluate((selectDescriptionType2, selectDescriptionType3, selectDescriptionType4) => {
    const description2 = document.querySelector(selectDescriptionType2)
    const description3 = document.querySelector(selectDescriptionType3)
    const description4 = document.querySelector(selectDescriptionType4)

    if (description2) {
      return selectDescriptionType2
    } else if (description3) {
      return selectDescriptionType3
    } else if (description4) {
      return selectDescriptionType4
    } else {
      return 'none'
    }
  }, selectDescriptionType2, selectDescriptionType3, selectDescriptionType4)

  // select description
  await page.type(wichDescriptionChoose, details + defaultLabelOnTitleAndDescription)
}

async function nextStepPublish() {
  // select next step publish
  const wichNextPublishChoose = await page.evaluate((selectNextStepPublishType3, selectNextStepPublishType4) => {
    const nextStepPublish3 = document.querySelector(selectNextStepPublishType3)
    const nextStepPublish4 = document.querySelector(selectNextStepPublishType4)

    if (nextStepPublish3) {
      return selectNextStepPublishType3
    } else if (nextStepPublish4) {
      return selectNextStepPublishType4
    } else {
      return 'none'
    }
  }, selectNextStepPublishType3, selectNextStepPublishType4)

  // select next step publish
  await page.waitForSelector(wichNextPublishChoose)
  await page.waitForTimeout(generateRandomNumberRange(600, 300))
  await page.click(wichNextPublishChoose)
}

async function stepSelectGroups() {
  console.log('groups');

  await page.waitForTimeout(generateRandomNumberRange(600, 300))
  await page.waitForSelector('[role="main"]')
  await page.click('[aria-label="Ruta de navegación"]')
  for (let i = 0; i < generateRandomNumberRange(10, 19, true); i++) {
    await page.waitForTimeout(generateRandomNumberRange(600, 300))
    await page.keyboard.press('Tab');
    await page.waitForTimeout(generateRandomNumberRange(600, 300))
    await page.keyboard.press('Enter');
  }
  console.log('end groups');

}

async function stepFinishPublish() {
  // select finish publish
  const wichFinishPublishChoose = await page.evaluate((selectFinishPublishType3_1, selectFinishPublishType3_2, selectFinishPublishType4_1, selectFinishPublishType4_2) => {
    const finishPublish3_1 = document.querySelector(selectFinishPublishType3_1)
    const finishPublish3_2 = document.querySelector(selectFinishPublishType3_2)
    const finishPublish4_1 = document.querySelector(selectFinishPublishType4_1)
    const finishPublish4_2 = document.querySelector(selectFinishPublishType4_2)

    // if (finishPublish3_1) {
    //   return selectFinishPublishType3_1
    // } else if (finishPublish3_2) {
    //   return selectFinishPublishType3_2
    // } else if (finishPublish4_1) {
    //   return selectFinishPublishType4_1
    // } else if (finishPublish4_2) {
    //   return selectFinishPublishType4_2
    // } else {
    //   return 'none'
    // }

    // if (finishPublish4_2) {
    //   return selectFinishPublishType4_2
    // } else {
    //   return 'none'
    // }

  }, selectFinishPublishType3_1, selectFinishPublishType3_2, selectFinishPublishType4_1, selectFinishPublishType4_2)

  // select finish publish
  await page.waitForSelector(selectFinishPublishType4_2)
  await page.waitForTimeout(1000)
  await page.click(selectFinishPublishType4_2)
}

async function runStuckCondition() {
  const wichStateChoose = await page.evaluate(
    (selectStateType2, selectStateType2_2, selectStateType3, selectStateType3_2, selectStateType4) => {
      const state2 = document.querySelector(selectStateType2)
      const state3 = document.querySelector(selectStateType3)
      const state4 = document.querySelector(selectStateType4)
      const state2_2 = document.querySelector(selectStateType2_2)
      const state3_2 = document.querySelector(selectStateType3_2)
      if (state2) {

      }

      if (state2) {
        // console.log(1);
        return selectStateType2
      } else if (state2_2) {
        // console.log(2);
        return state2_2
      } else if (state3) {
        // console.log(3);
        return selectStateType3
      } else if (state3_2) {
        // console.log(3);
        return selectStateType3_2
      } else if (state4) {
        // console.log(4);
        return selectStateType4
      } else {
        // console.log(5);
        return 'none'
      }
    }, selectStateType2, selectStateType2_2, selectStateType3, selectStateType3_2, selectStateType4)


}


/** 
 * Class to create a Robot post. 
 */
class robotFabric {
  constructor({
    stateEmail,
    statePass,
    velocity
  }) {
    this.page = undefined
    this.browser = undefined
    this.stateEmail = stateEmail
    this.statePass = statePass
    this.velocity = velocity
  }

  createRobotDummy = async (hideBrowser = false) => {
    this.browser = await puppeteer.launch({ headless: hideBrowser, slowMo: this.velocity = 5 });
    const context = this.browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);

    this.page = await this.browser.newPage();
    await this.page.goto(url);

    await this.page.type(email, this.stateEmail)
    await this.page.type(password, this.statePass)
    await this.page.click(submit)

    await this.page.waitForSelector('[aria-label="Facebook"][role="contentinfo"]')
  }

  runFacebookPostDummy = async ({
    title,
    price,
    details,
    cover,
    dirPathPhotos,
  }, itemCodition, defaultLabelOnTitleAndDescription, imageText, itemCategory) => {
    editImage(dirPathPhotos, cover, imageText)
    await this.page.goto(createNewPostUrl);
    await this.page.waitForSelector(createNewPost)


    // select files
    const photos = await selectedDirPhotos(dirPathPhotos)

    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(createNewPost),
    ]);
    await fileChooser.accept(photos);

    await this.selectTitle(title, defaultLabelOnTitleAndDescription)

    await this.selectPrice(price)

    await this.selectCategory()
    await this.selectCategoryLoop(itemCategory)

    await this.stepCondition()
    await this.selectCondition(itemCodition)

    await this.page.waitForTimeout(5000)

    await this.stepsAfterCondition(details, defaultLabelOnTitleAndDescription)

  }

  async selectTitle(title, defaultLabelOnTitleAndDescription) {
    // selec title
    const wichTitleChoose = await this.page.evaluate((selectTitleType2, selectTitleType3) => {
      const title2 = document.querySelector(selectTitleType2)
      const title3 = document.querySelector(selectTitleType3)

      if (title2) {
        return selectTitleType2
      } else if (title3) {
        return selectTitleType3
      } else {
        return 'none'
      }
    }, selectTitleType2, selectTitleType3)

    // select title
    await this.page.type(wichTitleChoose, limitString(title + defaultLabelOnTitleAndDescription, 99))
  }

  async selectPrice(price) {
    // select price
    const wichPriceChoose = await this.page.evaluate((slectPriceType2, slectPriceType3) => {
      const price2 = document.querySelector(slectPriceType2)
      const price3 = document.querySelector(slectPriceType3)

      if (price2) {
        return slectPriceType2
      } else if (price3) {
        return slectPriceType3
      } else {
        return 'none'
      }
    }, slectPriceType2, slectPriceType3)

    // select price
    await this.page.keyboard.press("Tab")
    await this.page.keyboard.type(price)
    // await this.page.type(price)
  }

  async selectCategory() {
    // select category
    const wichCategoryChoose = await this.page.evaluate((selectCategoryType2, selectCategoryType3) => {
      const category2 = document.querySelector(selectCategoryType2)
      const category3 = document.querySelector(selectCategoryType3)

      if (category2) {
        return selectCategoryType2
      } else if (category3) {
        return selectCategoryType3
      } else {
        return 'none'
      }
    }, selectCategoryType2, selectCategoryType3)

    // select category
    // await this.page.waitForTimeout(generateRandomNumberRange(2500, 1500))
    // await this.page.waitForSelector(selectCategoryType2)
    // await this.page.click(wichCategoryChoose)
    // await this.page.waitForTimeout(1000)
    // await this.page.waitForSelector(optionsCategory)
    // await this.page.click(optionsCategory)


    await this.page.keyboard.press("Tab")
    await this.page.keyboard.press('Enter')

  }

  async selectCategoryLoop(selectedCategory = 'household') {
    const categorySpanish = [
      'tools',
      'furniture',
      'household',
      'garden',
      'appliances',
      'video_games',
      'books_movies_music',
      'bags_&_luggage',
      'women_clothes_&_shoes',
      'mens_clothes_&_shoes',
      'jewerly_&_accesories',
      'health_&_beauty',
      'pet_supplies',
      'baby_&_kids',
      'toys_&_games',
      'electronics_&_computers',
      'mobile_phones',
      'bicycles',
      'arts_&_crafts',
      'sports_&_outdoors',
      'auto_parts',
      'musical_instruments',
      'antiques_&_collectibles',
      'garage_sale',
      'miscellaneous',
    ]
    const categoryEnglish = [
      'tools',
      'furniture',
      'garden',
      'appliances',
      'household',
      'books_movies_music',
      'video_games',
      'jewerly_&_accesories',
      'bags_&_luggage',
      'mens_clothes_&_shoes',
      'women_clothes_&_shoes',
      'toys_&_games',
      'baby_&_kids',
      'pet_supplies',
      'health_&_beauty',
      'mobile_phones',
      'electronics_&_computers',
      'sports_&_outdoors',
      'musical_instruments',
      'arts_&_crafts',
      'antiques_&_collectibles',
      'auto_parts',
      'bicycles',
      'garage_sale',
      'miscellaneous',
    ]

    const index = categorySpanish.findIndex((element) => element === selectedCategory)

    for (let i = 0; i < index; i++) {
      await this.page.keyboard.press('Tab');
    }
    await this.page.keyboard.press('Enter');
  }

  async stepCondition() {
    await this.page.waitForTimeout(2000)


    const wichStateChoose = await this.page.evaluate(
      (selectStateType2, selectStateType2_2, selectStateType3, selectStateType3_2, selectStateType4) => {
        const state2 = document.querySelector(selectStateType2)
        const state3 = document.querySelector(selectStateType3)
        const state4 = document.querySelector(selectStateType4)
        const state2_2 = document.querySelector(selectStateType2_2)
        const state3_2 = document.querySelector(selectStateType3_2)

        if (state2) {
          return selectStateType2
        } else if (state2_2) {
          console.log(state2_2);
          console.log(2);
          return state2_2
        } else if (state3) {
          console.log(state3);
          console.log(3);
          return selectStateType3
        } else if (state3_2) {
          console.log(state3_2);
          console.log(3);
          return selectStateType3_2
        } else if (state4) {
          console.log(state4);
          console.log(4);
          return selectStateType4
        } else {
          console.log(5);
          return 'none'
        }
      }, selectStateType2, selectStateType2_2, selectStateType3, selectStateType3_2, selectStateType4)

    // select state
    // await this.page.waitForTimeout(3000)
    // try {
    //   console.log(wichStateChoose ? 'try' : 'catch');
    //   await this.page.waitForSelector(wichStateChoose)
    //   await this.page.click(wichStateChoose)
    // } catch (error) {
    //   console.log('label');
    //   await this.page.waitForTimeout(1000)
    //   await this.page.click('[aria-label="Estado"]')
    // }
    await this.page.waitForTimeout(1000)
    await this.page.click('[aria-label="Estado"]')
  }

  async selectCondition(loop = 'new') {
    const conditionLoop = {
      'new': 1,
      'used-new': 2,
      'used-good': 3,
      'used': 4,
    }
    for (let i = 1; i <= conditionLoop[loop]; i++) {
      // await this.page.waitForTimeout(generateRandomNumberRange(400, 100))
      await this.page.keyboard.press('ArrowDown');
    }
    // await this.page.waitForTimeout(1000)
    await this.page.keyboard.press('Enter');
  }

  async stepsAfterCondition(details, defaultLabelOnTitleAndDescription) {

    await this.selectDescription(details, defaultLabelOnTitleAndDescription)

    await this.nextStepPublish()

    await this.stepSelectGroups()

    await this.stepFinishPublish()
  }

  async selectDescription(details, defaultLabelOnTitleAndDescription) {
    // select description
    const wichDescriptionChoose = await this.page.evaluate((selectDescriptionType2, selectDescriptionType3, selectDescriptionType4) => {
      const description2 = document.querySelector(selectDescriptionType2)
      const description3 = document.querySelector(selectDescriptionType3)
      const description4 = document.querySelector(selectDescriptionType4)

      if (description2) {
        return selectDescriptionType2
      } else if (description3) {
        return selectDescriptionType3
      } else if (description4) {
        return selectDescriptionType4
      } else {
        return 'none'
      }
    }, selectDescriptionType2, selectDescriptionType3, selectDescriptionType4)

    // select description
    await this.page.type(wichDescriptionChoose, details + defaultLabelOnTitleAndDescription)
  }

  async nextStepPublish() {
    // select next step publish
    const wichNextPublishChoose = await this.page.evaluate((selectNextStepPublishType3, selectNextStepPublishType4) => {
      const nextStepPublish3 = document.querySelector(selectNextStepPublishType3)
      const nextStepPublish4 = document.querySelector(selectNextStepPublishType4)

      if (nextStepPublish3) {
        return selectNextStepPublishType3
      } else if (nextStepPublish4) {
        return selectNextStepPublishType4
      } else {
        return 'none'
      }
    }, selectNextStepPublishType3, selectNextStepPublishType4)

    // select next step publish
    await this.page.waitForSelector(wichNextPublishChoose)
    await this.page.waitForTimeout(generateRandomNumberRange(600, 300))
    await this.page.click(wichNextPublishChoose)
  }

  async stepSelectGroups() {

    await this.page.waitForTimeout(generateRandomNumberRange(600, 300))
    await this.page.waitForSelector('[role="main"]')
    await this.page.click('[aria-label="Ruta de navegación"]')
    for (let i = 0; i < generateRandomNumberRange(10, 19, true); i++) {
      await this.page.waitForTimeout(generateRandomNumberRange(600, 300))
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(generateRandomNumberRange(600, 300))
      await this.page.keyboard.press('Enter');
    }

  }

  async stepFinishPublish() {
    // select finish publish
    const wichFinishPublishChoose = await this.page.evaluate((selectFinishPublishType3_1, selectFinishPublishType3_2, selectFinishPublishType4_1, selectFinishPublishType4_2) => {
      const finishPublish3_1 = document.querySelector(selectFinishPublishType3_1)
      const finishPublish3_2 = document.querySelector(selectFinishPublishType3_2)
      const finishPublish4_1 = document.querySelector(selectFinishPublishType4_1)
      const finishPublish4_2 = document.querySelector(selectFinishPublishType4_2)

      // if (finishPublish3_1) {
      //   return selectFinishPublishType3_1
      // } else if (finishPublish3_2) {
      //   return selectFinishPublishType3_2
      // } else if (finishPublish4_1) {
      //   return selectFinishPublishType4_1
      // } else if (finishPublish4_2) {
      //   return selectFinishPublishType4_2
      // } else {
      //   return 'none'
      // }

      // if (finishPublish4_2) {
      //   return selectFinishPublishType4_2
      // } else {
      //   return 'none'
      // }

    }, selectFinishPublishType3_1, selectFinishPublishType3_2, selectFinishPublishType4_1, selectFinishPublishType4_2)

    // select finish publish
    await this.page.waitForSelector(selectFinishPublishType4_2)
    await this.page.waitForTimeout(1000)
    await this.page.click(selectFinishPublishType4_2)
  }

  async destroyRobot() {
    await this.browser.close();
  }
}


module.exports = {
  robotFabric
}