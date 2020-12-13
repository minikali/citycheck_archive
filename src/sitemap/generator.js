import { sitemapBuilder as buildSitemap } from "react-router-sitemap";
import path from "path"; // add path which will be needed for file write
import fs from "fs"; // import file system object
import routes from "./routes";

// use your website root address here. Optimally you can
// include dev and production enviorenments with variable
routes.then(r => {
  const hostname = "https://citycheck.fr/";

  // define our destination folder and sitemap file name
  const dest = path.resolve("./public", "sitemap.xml");

  // Generate sitemap and return Sitemap instance
  const sitemap = buildSitemap(hostname, r);

  // write sitemap.xml file in /public folder
  // Access the sitemap content by converting it with .toString() method
  fs.writeFileSync(dest, sitemap.toString());
});
