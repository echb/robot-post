const limitString = (string = '', limit = 0) => {
  return string.substring(0, limit)
}

const generateRandomNumberRange = (max, min, integer) => {
  if (integer) { return parseInt((Math.random() * (max - min) + min).toFixed(2)) };

  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

const generateRandomTrueOrFalse = () => {
  const isBigger = 0.5

  const num = Math.random();
  if (num <= isBigger) {
    return true
  } else {
    return false
  }
}

const generateRandomInteger = (minNumber, maxNumber) => {
  const minNum = minNumber
  const maxNum = maxNumber
  const makeItNegative = -1

  const positiveOrNegative = generateRandomTrueOrFalse()
  if (positiveOrNegative) {
    return generateRandomNumberRange(minNum, maxNum)
  } else {
    return generateRandomNumberRange(minNum * makeItNegative, maxNum * makeItNegative)
  }
}

const randomHex = () => {
  return `#${Math.floor(Math.random() * 0xffffffff).toString(16)}`
}

const editImage = async (dirPothos, cover, imageText) => {
  const Jimp = require('jimp');

  const deafultName = '1'
  const minNumberDeg = 3
  const maxNumberDeg = 10
  const fontMinXY = 10
  const fontMaxXY = 200
  const fontText = imageText

  const randomInteger = generateRandomInteger(minNumberDeg, maxNumberDeg)

  const imageDetailsWhenSave = {
    pathToSaveFile: dirPothos,
    imageTitle: deafultName,
    extension: '.jpg'
  }

  const { pathToSaveFile, imageTitle, extension } = imageDetailsWhenSave

  const image = await Jimp.read(cover)
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  image.background(Jimp.cssColorToHex(randomHex()))
  image.rotate(randomInteger)
  image.flip(generateRandomTrueOrFalse(), false)
  // image.print(font, generateRandomNumberRange(fontMinXY, fontMaxXY), generateRandomNumberRange(fontMinXY, fontMaxXY), fontText, 300)
  // image.normalize()
  image.shadow()
  image.write(pathToSaveFile + imageTitle + extension);

}

const selectDirnameFromFullPhotoPath = (string) => {
  return string.substring(string.lastIndexOf("/") + 1, string.lastIndexOf("?"));
}

const selectedDirPhotos = async (dirPath) => {
  const fs = require('fs')
  const { promisify } = require('util')
  const readFileAsync = promisify(fs.readdir)

  const dirFiles = await readFileAsync(dirPath)
  const filesPath = await Promise.all(dirFiles.slice(0, 10).map(async file => await dirPath + file))

  return filesPath
}

module.exports = {
  limitString,
  generateRandomNumberRange,
  editImage,
  selectedDirPhotos,
  selectDirnameFromFullPhotoPath
}