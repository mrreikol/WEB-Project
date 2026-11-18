# MSQ Astana Final Project

MSQ Astana is a client-side website for a clothing store in Astana, Kazakhstan. This project continues our midterm and endterm website. It keeps the existing pages and adds API integration, object-oriented JavaScript, persistent data, product sorting, and an editable shopping bag.

## Team

- Ismail Shargazin
- Mustafa Rayazov
- Abilkaiyr Sultanov

## Links

- **Repository:** [MSQ Astana source code](https://github.com/mrreikol/WEB-Project)
- **Published website:** [MSQ Astana on GitHub Pages](https://mrreikol.github.io/WEB-Project/)

Place the final project files in the repository root, next to index.html. After publishing, check that the link opens the final version.

## Technologies

HTML, CSS, Bootstrap 5.3.3, JavaScript, DOM APIs, jQuery 3.7.1, the GitHub REST API, and browser localStorage. No build step or server-side code is required.

## Pages

| Page | Purpose |
| --- | --- |
| Home (index.html) | Store introduction and New Arrivals from remote data. |
| Catalog (catalog.html) | Products, search, categories, price sorting, favorites, and Add to bag. |
| Shopping Bag (bag.html) | Item editing, order total, and a WhatsApp order draft. |
| Size Guide (size-guide.html) | Size highlighting and measurement instructions. |
| About Us (about.html) | Store and project information. |
| Contact (contact.html) | Contact information and a demo form with validation. |

## Final-Stage Features

1. **API integration.** Home uses fetch with async and await to request the public GitHub repository's images directory. It processes JSON, selects remote product photos, and creates New Arrivals cards in the DOM. Loading, success, empty, and error states have separate feedback. On an error, a local selection and Try again button appear.
2. **Object-oriented products.** The Product class has a constructor, properties, and methods for search and category matching, price and size display, and size checks. The catalog creates and uses nine Product objects.
3. **Persistent browser data.** Favorites and bag items are saved as JSON in localStorage and restored after a reload. Users can remove items or clear the lists. Missing or invalid saved data is handled safely.
4. **Advanced catalog filtering and sorting.** Users can search by name, filter by category, set an inclusive minimum and maximum price, and sort the matching products by price in either direction. Apply price updates the results; Clear price removes only the price range. Invalid prices show a message, and Clear filters resets all controls.
5. **Shopping bag CRUD.** Users can add and view products, change a size or quantity, remove an item, and clear the bag. The total updates after changes. Order via WhatsApp opens a draft with items, sizes, quantities, prices, and the total.

Existing endterm functionality remains available: search, category filters, favorites, size highlighting, jQuery measurement effects, and contact-form validation.

## API Information

- **Endpoint:** https://api.github.com/repos/mrreikol/WEB-Project/contents/images
- **Method:** public GET request; no API key is required.
- **Selection:** images/new-arrivals.json lists product IDs. Product details come from js/products.js.
- **Fallback:** if the request fails, Home displays three local products. If the remote selection is empty, Home displays an empty-data message.

The API reads files from the repository above. If the site moves to another repository, update the repository URLs in js/arrivals.js and the links in this README.

## Run Locally

1. Download or clone the repository and open the folder in VS Code.
2. Open index.html with the Live Server extension.
3. Test the site in your browser. Use the same local address when testing saved data across pages.

You can also run `python3 -m http.server 8000` in the project folder and open http://localhost:8000/. Internet access is needed for the API and WhatsApp. If the API is unavailable, Home shows a local selection.

## Test the Project

1. **Home:** Check New Arrivals and open a product in the catalog. Block the GitHub API request in browser developer tools and reload to see the error message, local products, and Try again button.
2. **Catalog:** Search for “chocolate,” choose a category, set Price from to 18000 and Price to to 30000, then sort by price. Only matching products in that price range should appear. Try Price from 30000 and Price to 10000 to see the validation message. Click Clear price and Clear filters.
3. **Favorites:** Add two products and reload. Remove one and use Clear favorites. On a narrow screen, open the Favorites panel.
4. **Bag:** Add sneakers in size 42 and the cap in One size. Change a size and quantity, remove an item, and check the total. Reload to check storage. Review the WhatsApp draft and use Clear bag.
5. **Size Guide and Contact:** Select M and 2XL and check the highlighted rows. Open and close a measurement instruction. Test the form with empty and valid fields, then reset it.
6. **Responsive layout:** Open every page on desktop, tablet, and mobile. Check navigation, cards, buttons, forms, images, and the size table. Check the browser console for errors.

The contact form only validates input in the browser; it does not send a message to a server. The WhatsApp button prepares a draft but does not send it automatically. Prices and measurements are sample data for this student project.

## Project Structure

| Path | Responsibility |
| --- | --- |
| js/products.js | Product class, product data, and price formatting. |
| js/arrivals.js | API requests, Home states, and New Arrivals cards. |
| js/catalog.js | Catalog search, categories, price range, sorting, favorites, and Add to bag. |
| js/storage.js | Safe JSON reading and writing in localStorage. |
| js/bag-store.js | Bag data checks, item merging, and WhatsApp text. |
| js/bag.js | Bag interface, editing, totals, and clear action. |
| js/size-guide.js | jQuery size selection and measurement effects. |
| js/contact.js | Form validation and feedback. |
| css/, bootstrap/, images/ | Styles and image assets. |

## Group Contributions

- **Ismail Shargazin:** Home page and New Arrivals API integration, including loading, empty, and error states.
- **Mustafa Rayazov:** Product class, catalog data, search, category and price filters, price sorting, and persistent favorites.
- **Abilkaiyr Sultanov:** Shopping bag, item updates, persistent bag data, total calculation, and WhatsApp order draft.

All group members should be able to explain the complete website during the individual defence.
