const path = require('path')
const rollup = require('rollup')
const svgToSymbol = require('../src/index.js')

const resolve = path.resolve.bind(path, __dirname)

test('basic', async () => {
  const bundle = await rollup.rollup({
    input: resolve('sprite.js'),
    plugins: [
      svgToSymbol()
    ]
  })

  const { code } = await bundle.generate({
    format: 'cjs'
  })

  const sprite = eval(code) // eslint-disable-line
  expect(sprite).toBe('<svg><defs><symbol id="add">add</symbol><symbol id="close">close</symbol></defs></svg>')
})

test('extractId', async () => {
  const bundle = await rollup.rollup({
    input: resolve('sprite.js'),
    plugins: [
      svgToSymbol({
        extractId({ name }) {
          return `icon-${name}`
        }
      })
    ]
  })

  const { code } = await bundle.generate({
    format: 'cjs'
  })

  const sprite = eval(code) // eslint-disable-line
  expect(sprite).toBe('<svg><defs><symbol id="icon-add">add</symbol><symbol id="icon-close">close</symbol></defs></svg>')
})
