# Jon Alejandro

Personal website built with Jekyll and hosted on GitHub Pages at https://jonalejandro.com.

## Writing

Add essays to `_posts` using the existing dated filenames. Give each essay a title, date, and a short `excerpt` describing its takeaway. An optional `topic` provides the label shown in article lists.

The homepage automatically displays the three newest essays after the featured essay. Set `featured: true` on one essay to pin it; remove that flag from the previously featured essay. Existing article URLs are preserved.

## Shared presentation

`_layouts/base.html` owns the page shell. Navigation, metadata, footer, and article cards live in `_includes`; styles live in `assets/theme.css`. Career entries live in `_data/career.yml`.

Contact links use the existing LinkedIn profile. The portrait WebP files are resized versions of the original `assets/profile.png`, which is retained.

## Validation

The Check site workflow builds with the GitHub Pages Jekyll environment, then runs `python3 scripts/check_site.py _site`. It checks generated pages, internal links, images, article metadata, RSS, and the sitemap. It does not deploy the pull request.
