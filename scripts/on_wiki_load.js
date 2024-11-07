/*
 * This script runs when a Wikipedia page is loaded, specifically on URLs matching
 * "https://*.wikipedia.org/wiki/*". It extracts and processes reference URLs from the page.
 *
 * Steps:
 * 1. Get the references from the page.
 * 2. Extract URLs, types, and titles from the references.
 * 3. [TODO] Analyze if URLs are updated.
 * 4. [TODO] Return useful data based on the extracted information.
 */

/**
 * @function extractReferences
 * @description Extracts URLs, types, and titles from references within the
 *              Wikipedia page's ".mw-references-wrap .reference-text" elements.
 *              Supports both <cite> elements (used in Wikipedia references) and direct <a> tags.
 *              Metadata extraction can be expanded if needed (e.g., publisher, date).
 *
 * @returns {Array<Object>} An array of objects, each containing:
 * - `url` (string|null): The URL of the reference, if available.
 * - `type` (string|null): The type of reference (e.g., 'web', 'book') based on class names.
 * - `title` (string|null): The title text from the reference link or citation.
 */
function extractReferences() {
  const references = document.querySelectorAll(
    ".mw-references-wrap .reference-text"
  );

  return Array.from(references).map((ref) => {
    let url = null;
    let type = null;
    let title = null;

    const cite = ref.querySelector("cite");
    const link = cite
      ? cite.querySelector("a.external.text")
      : ref.querySelector("a");

    if (link) {
      url = link.href;
      title = link.textContent || title;
    } else {
      title = ref.textContent;
    }

    if (cite) {
      const typeMatch = cite.className.match(/citation (\w+)/);
      type = typeMatch ? typeMatch[1] : type;
    }

    return {
      url: url,
      type: type,
      title: title,
    };
  });
}

/**
 * Main function to run the extraction and log the results.
 */
async function main() {
  const references = extractReferences();
  console.table(references);
}

main();
