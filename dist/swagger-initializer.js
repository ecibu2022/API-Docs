window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // Create Swagger UI bundle
  window.ui = SwaggerUIBundle({
    url: "openapi.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    tryItOutEnabled: true,          // ✅ Enable interactivity
    persistAuthorization: true,     // Key for keeping tokens between refreshes
    displayRequestDuration: true,   // Helpful for debugging
    filter: true,                  // Add search filter for tags/paths
  });

  //</editor-fold>
};
