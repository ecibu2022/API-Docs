const postmanToOpenApi = require('postman-to-openapi')
const fs = require('fs')
const path = require('path')

async function convert() {
    const postmanRaw = path.join(__dirname, 'VetCentre.postman_collection.json')
    const outputFile = path.join(__dirname, 'openapi.yaml')
    try {
        const result = await postmanToOpenApi(postmanRaw, outputFile, { defaultTag: 'General' })
        console.log(`OpenAPI spec generated at ${outputFile}`)
    } catch (err) {
        console.error('Conversion failed:', err)
        process.exit(1)
    }
}

convert()
