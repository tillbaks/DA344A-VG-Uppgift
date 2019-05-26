const webpack = require('webpack')
const path = require('path')
const fs = require('fs').promises

function runWebpack (config) {
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    // Done processing
    console.log(stats.toString({ colors: true }))
  })
}

// Move all files except .js from source to destination directory

async function copyFiles2Dist (srcDir, destDir) {
  const files = await fs.readdir(srcDir)

  // Exclude js files
  files.filter(file => !file.endsWith('.js'))
    .forEach(async file => {
      // Copy each file to dist dir
      const src = srcDir + file
      const dest = destDir + file
      try {
        await fs.copyFile(src, dest)
        console.log(`Successfully copied "${src}" to "${dest}"`)
      } catch (error) {
        console.log(`Error while copying "${src}" to "${dest}"`)
        console.error(error)
      }
    })
}

// Run build

const config = {
  sourceDirectory: './src/',
  destinationDirectory: './dist/',
  webpack: {
    mode: 'production',
    entry: './src/index.js',
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
}

runWebpack(config.webpack)
copyFiles2Dist(config.sourceDirectory, config.destinationDirectory)
