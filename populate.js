require('dotenv').config()

const Game = require('./models/game')
const Genre = require('./models/genre')
const Merchandise = require('./models/merchandise')
const Developer = require('./models/developer')
const Platform = require('./models/platform')
const Accessory = require('./models/accessory')

const games = []
const genres = []
const merchandiseArr = []
const developers = []
const platforms = []
const accessories = []

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoDB = process.env.MONGO_CT_URL

main().catch((err) => console.log(err))

async function main() {
  console.log("Debug: About to connect")
  await mongoose.connect(mongoDB)
  console.log("Debug: Should be connected?")
  await createGenres()
  await createDevelopers()
  await createPlatform()
  await createAccessories()
  await createGames()
  await createMerchandise()
  console.log("Debug: Closing mongoose")
  mongoose.connection.close()
}

async function genreCreate(index, name) {
  const genre = new Genre({ name: name })
  await genre.save()
  genres[index] = genre
  console.log(`Added genre: ${name}`)
}

async function developerCreate(index, name) {
  const developer = new Developer({ name: name })
  await developer.save()
  developers[index] = developer
  console.log(`Added developer: ${name}`)
}

async function platformCreate(index, name, price, numberInStock, summary, manufacturer, releaseDate) {
  const platform = new Platform({ 
    name: name, 
    price: price,
    numberInStock: numberInStock, 
    summary: summary,
    manufacturer: manufacturer,
    releaseDate: releaseDate
  })
  await platform.save()
  platforms[index] = platform
  console.log(`Added platform: ${name}`)
}

async function accessoryCreate(index, name, price, summary, numberInStock, compatiblePlatforms) {
  const accessoryDetails = {
    name: name,
    price: price,
    summary: summary,
    numberInStock: numberInStock,
    compatiblePlatforms: compatiblePlatforms
  }  

  const accessory = new Accessory(accessoryDetails)
  await accessory.save()
  accessories[index] = accessory
  console.log(`Added accessory: ${name}`)
}

async function gameCreate(index, title, price, summary, numberInStock, developer, genre, platform) {
  const gameDetails = {
    title: title,
    price: price,
    summary: summary,
    numberInStock: numberInStock,
    developer: developer,
    genre: genre,
    platform: platform,
  }  

  const game = new Game(gameDetails)
  await game.save()
  games[index] = game
  console.log(`Added game: ${title}`)
}
async function merchandiseCreate(index, name, price, summary, numberInStock, relatedGames) {
  const merchandiseDetails = {
    name: name,
    price: price,
    summary: summary,
    numberInStock: numberInStock,
    relatedGames: relatedGames
  }

  const merchandise = new Merchandise(merchandiseDetails)
  await merchandise.save()
  merchandiseArr[index] = merchandise
  console.log(`Added merchandise: ${name}`)
}

async function createGenres() {
  console.log('Adding genres...')
  await Promise.all([
    genreCreate(0, 'Action'),
    genreCreate(1, 'First-person shooter'),
    genreCreate(2, 'Role-playing'),
    genreCreate(3, 'Adventure'),
  ])
}
async function createDevelopers() {
  console.log('Adding developers...')
  await Promise.all([
    developerCreate(0, 'Bandai Namco Studios'),
    developerCreate(1, 'Nintendo'),
    developerCreate(2, 'Game Freak'),
    developerCreate(3, 'Insomniac Games'),
    developerCreate(4, 'FromSoftware'),
    developerCreate(5, 'Blizzard'),
    developerCreate(6, 'GSC Game World'),
    developerCreate(7, 'Hardsuit Labs')
  ])
}
async function createPlatform() {
  console.log('Added platforms...')
  await Promise.all([
    platformCreate(0,
      'Nintendo Switch',
      399,
      10,
      'Nintendo Switch is designed to go wherever you do, transforming from home console to portable system in a snap.',
      'Nintendo',
      '2017-03-03'),
    platformCreate(1,
      'PlayStation 5',
      799,
      7,
      'The PS5 console unleashes new gaming possibilities that you never anticipated.',
      'Sony',
      '2020-11-12'),
    platformCreate(2,
      'Xbox Series X',
      799,
      8,
      'Play thousands of titles from four generations of consoles - all games look and play best on Xbox Series X.',
      'Microsoft',
      '2020-11-10'),
  ])
}
async function createAccessories() {
  console.log('Adding accessories...')
  await Promise.all([
    accessoryCreate(0,
      'Nintendo Switch Pro Controller',
      99,
      'A wireless controller with the form factor of a traditional controller, comfortable and great for gaming for long periods of time in TV and tabletop mode.',
      10,
      [platforms[0]]),
    accessoryCreate(1,
      'Nintendo Switch Joy-Con Controller Set',
      119,
      'One controller or two, vertical or sideways, motion controls or buttons... Joy-Cons give you total gameplay flexibility.',
      5,
      [platforms[0]]),
    accessoryCreate(2,
      'Razer Barracude X Multi-Platform Wireless Gaming Headset',
      129,
      'Immersive home gaming, seamless on-the-go audio - the Razer Barracuda X is built for both.',
      4,
      [platforms[0], platforms[1], platforms[2]]),
    accessoryCreate(3,
      'PlayStation 5 DualSense Wireless Controller',
      109,
      'Discover a deeper, highly immersive gaming experience that brings the action to life in the palms of your hands.',
      6,
      [platforms[1]]),
    accessoryCreate(4,
      'Atrix Universal Game Storage Tower',
      29,
      "For the avid game collector, games are mor than just what you play - they\'re the entire package",
      4,
      [platforms[0], platforms[1], platforms[2]]),
    accessoryCreate(5,
      'Xbox Wireless Controller',
      89,
      'Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhances comfort during gameplay.',
      5,
      [platforms[2]]),
    accessoryCreate(6,
      'Turtle Beach Ear Force Recon 50X Gaming Headset',
      39,
      'Experience the sleek, lightweight design and crystal clear audio of the EAR FORCE Recon 50X gaming headset.',
      4,
      [platforms[0], platforms[1], platforms[2]])
  ])
}
async function createGames() {
  console.log('Adding games...')
  await Promise.all([
    gameCreate(0,
      'Super Smash Bros. Ultimate',
      89,
      'Legendary game worlds and fighters collide in the ultimate showdown.',
      6,
      [developers[0]],
      [genres[0]],
      [platforms[0]]),
    gameCreate(1,
      'The Legend of Zelda: Tears of the Kingdom',
      89,
      'An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda: Tears of the Kingdom.',
      10,
      [developers[1]],
      [genres[3]],
      [platforms[0]]),
    gameCreate(2,
      'Pokemon Violet',
      79,
      'The Pokemon series takes a new evolutionary step, allowing you to explore freely in a richly expressed open world.',
      6,
      [developers[2]],
      [genres[2]],
      [platforms[0]]),
    gameCreate(3,
      'Pokemon Scarlet',
      79,
      'The Pokemon series takes a new evolutionary step, allowing you to explore freely in a richly expressed open world.',
      6,
      [developers[2]],
      [genres[2]],
      [platforms[0]]),
    gameCreate(4,
      'Marvels Spider-Man 2',
      125,
      'Spider-Men, Peter Parker and Miles Morales, return for an exciting new adventure in the critically acclaimed Spider-Man franchise.',
      0,
      [developers[3]],
      [genres[0], genres[3]],
      [platforms[1]]),
    gameCreate(5,
      'Elden Ring',
      109,
      'The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
      5,
      [developers[4]],
      [genres[0], genres[2]],
      [platforms[1], platforms[2]]),
    gameCreate(6,
      'Diablo IV',
      109,
      'Diablos IVs version of Sanctuary is vast, and is rife with opportunity for adventure.',
      13,
      [developers[5]],
      [genres[0], genres[2]],
      [platforms[1], platforms[2]]),
    gameCreate(7,
      'Vampire: The Masquerade - Bloodlines 2',
      89,
      'The successor to the iconic RPG Vampire: The Masquerade - Bloodlines, featuring reactive storytelling, fast-paces melee combat, and intriguing characters with their own hidden motives.',
      0,
      [developers[7]],
      [genres[0], genres[2]],
      [platforms[1], platforms[2]]),
    gameCreate(8,
      'Armored Core VI: Fires of Rubicon',
      109,
      'Armored Core VI: Fires of Rubicon combines FromSoftwares longstanding expertise in mech games with their signature action gameplay to bring a brand-new, high-octane experience to the series.',
      4,
      [developers[4]],
      [genres[0]],
      [platforms[1], platforms[2]]),
    gameCreate(9,
      'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
      119,
      'Discover the vast Chornobyl Exclusion Zone full of dangerous enemies, deadly anomalies and powerful artifacts.',
      0,
      [developers[6]],
      [genres[1]],
      [platforms[2]]),
  ])
}
async function createMerchandise() {
  console.log('Adding merchandise...')
  await Promise.all([
    merchandiseCreate(0, 'Spider-Man - Miles Morales Flat-Brim Cap', 29, 'Adjustable snap back. One size fits most', 3, [games[4]]),
    merchandiseCreate(1, 'The Legend of Zelda: Tears of the Kingdom The Complete Official Guide', 59, 'Answers revealed! Reliable walkthroughs. Comprehensive atlas of Hyrule. 100% complete', 2, [games[1]]),
    merchandiseCreate(2, 'Pokemon Scarlet & Violet Handbook', 20, 'Its everything you ever wanted to know about the Pokemon of this all-new region!', 3, [games[2], games[3]]),
    merchandiseCreate(3, 'Diablo IV - Inarius Pop! Vinyl figure', 23, 'Formerly an archangel of the High Heavens, his actions would lead to the creation of Sanctuary and the nephalem.', 2, [games[6]]),
  ])
}
