const postmanToOpenApi = require('postman-to-openapi')
const fs = require('fs')
const path = require('path')

const postmanFile = path.join(__dirname, 'VetCentre.postman_collection.json');
const outputFile = path.join(__dirname, 'openapi.yaml');

async function convert() {
    try {
        // Step 1: Pre-process the collection to make paths unique
        // This ensures all requests show up in Swagger UI even if they hit the same endpoint
        const collection = JSON.parse(fs.readFileSync(postmanFile, 'utf8'));

        function makePathsUnique(items) {
            items.forEach(item => {
                if (item.item) {
                    makePathsUnique(item.item);
                } else if (item.request && item.request.url) {
                    const name = item.name.toLowerCase().replace(/\s+/g, '-');
                    // Append the request name as a sub-path for documentation uniqueness
                    if (Array.isArray(item.request.url.path)) {
                        item.request.url.path.push(name);
                    } else if (typeof item.request.url === 'string') {
                        item.request.url += '/' + name;
                    }
                }
            });
        }

        makePathsUnique(collection.item);
        
        const tempFile = path.join(__dirname, 'temp_collection.json');
        fs.writeFileSync(tempFile, JSON.stringify(collection, null, 2));

        // Step 2: Convert to OpenAPI
        const options = {
            outputFormat: 'yaml',
            defaultTag: 'General'
        };

        await postmanToOpenApi(tempFile, outputFile, options);
        
        // Clean up temp file
        fs.unlinkSync(tempFile);

        // Step 3: Post-process the YAML to fix security and base URL
        let yamlContent = fs.readFileSync(outputFile, 'utf8');
        
        // Ensure https
        yamlContent = yamlContent.replace(/url: undefined:\/\//g, 'url: https://');
        
        // Add security globally if not present
        if (!yamlContent.includes('components:')) {
            yamlContent += `
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
security:
  - BearerAuth: []
`;
        }

        fs.writeFileSync(outputFile, yamlContent);

        console.log(`OpenAPI spec generated at ${outputFile}`);
    } catch (err) {
        console.error('Conversion failed:', err);
        process.exit(1)
    }
}

convert()
