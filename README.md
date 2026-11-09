# MSQ Astana Endterm Project

**Team** — Ismail, Mustafa and Abilkayir

[Open MSQ Astana on GitHub Pages](https://mrreikol.github.io/WEB-Project/)

MSQ Astana is a student website for a clothing store in Kazakhstan. This endterm version extends the original responsive midterm website with JavaScript and jQuery. It retains the five connected pages, product photos, sample prices and size chart.

## Pages

| Page | What visitors can do |
| --- | --- |
| [Home](index.html) | Browse featured products and jump to their cards in the catalog. |
| [Catalog](catalog.html) | Search six products by name, filter by category and manage a favorites list. |
| [Size Guide](size-guide.html) | Highlight a size in the table and expand measuring instructions. |
| [About Us](about.html) | Read about the store and the student project. |
| [Contact](contact.html) | Check the contact form and find links to the store and its location. |

## Run locally

Open `index.html` in a browser. Keep the HTML files, `css`, `bootstrap`, `images` and `js` in the same project folder. The site uses HTML, CSS, Bootstrap 5.3.3, JavaScript and a local copy of jQuery 3.7.1. No installation or build is required.

## Test the endterm features

1. **Catalog search and categories.** Search for `jeans` and confirm that only Indigo Straight Jeans appears. Select Shoes while the search is active and confirm that the empty state appears. Click **Clear filters** to restore all six products.
2. **Favorites.** Click the heart on a product card and confirm that the product and count appear in **Favorites**. On a narrow screen, use the **Favorites** button to open the panel. Click **Remove** and confirm that the count and heart update. The list resets when the catalog page reloads.
3. **Size Guide.** Select `M` and confirm that its row is highlighted and a status message appears. Choose **Select a size** to clear the selection. Expand and collapse **Waist** to see the measuring instructions.
4. **Contact form.** Click **Check message** with an empty form and confirm that errors appear next to the required fields. Try an invalid email or a short message. Then enter a name, `student@example.com` and a message of at least 10 characters. Leave the optional phone field empty and confirm that the success message appears next to the form. Click **Clear form** to reset the fields and feedback.
5. **Navigation and layout.** Open all five pages from the header and footer. From Home, use a featured product link to jump to its card. Repeat at a narrow viewport and check the browser console for errors.

## Code for the defence

| File | What to explain |
| --- | --- |
| `js/catalog.js` | The `products` and `favoriteIds` arrays, the loops that filter and render products, and how the favorites buttons update the DOM. |
| `js/size-guide.js` | ID and class selectors, DOM traversal with `find()`, `children()` and `next()`, event handlers and the fade and slide effects. |
| `js/contact.js` | The form's `submit` handler, `preventDefault()`, validation rules and feedback for each field. |

## Project notes

Prices and measurements are examples for this educational project. The contact form checks the entered details in the browser. Visitors can reach the store through the WhatsApp or phone links.
