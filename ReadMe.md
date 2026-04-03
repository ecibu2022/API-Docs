# VetCentre API Documentation

This repository contains the static web-based API documentation for the **VetCentre HR Training** system. It is powered by **Swagger UI** and automatically generated from a Postman collection.

## 🚀 Quick Start

1. Open `index.html` in any browser (or view via GitHub Pages).
2. Enter your **Bearer Token** in the header bar.
3. Click "Try it out" on any endpoint, then click **SEND**.

---

## 🛠 Deployment & Updates

The documentation is built by converting the `VetCentre.postman_collection.json` into an OpenAPI specification (`openapi.yaml`).

### How to update the endpoints:

Whenever you make changes to the Postman collection (add/remove/edit requests), follow these steps:

1. **Replace the Postman file**:
   Overwrite `VetCentre.postman_collection.json` with your exported collection from Postman.

2. **Run the conversion script**:
   Open your terminal in this directory and run:
   ```bash
   node convert_postman_to_openapi.js
   ```

3. **Verify the change**:
   The script will generate a new `openapi.yaml`. Refresh `index.html` to see the updates.

4. **Push to GitHub**:
   Commit and push your changes to the repository to update the live GitHub Pages site.
   ```bash
   git add .
   git commit -m "Update API documentation from Postman"
   git push origin main
   ```

---

## 🔑 Authentication

This API uses **OAuth 2.0 Client Credentials**. 
For the documentation UI, the token entered in the header is:
- **Persisted**: Saved in your browser's `localStorage` (no need to re-enter).
- **Automatically Injected**: Added to every request sent via the "SEND" button.

---

## 🏗 Project Structure

- `index.html`: The main UI with custom styling and Swagger UI config.
- `openapi.yaml`: The auto-generated API specification.
- `convert_postman_to_openapi.js`: The automation script.
- `VetCentre.postman_collection.json`: The source data.
- `dist/`: Swagger UI library files.
