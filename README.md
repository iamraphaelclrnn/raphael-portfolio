# Raphael_Pixel · Pixel Art Portfolio

The 8-bit / 16-bit portfolio of **Raphael Robin Calaranan**, Social Media Manager & GoHighLevel Virtual Assistant.

## Project structure

```
raphael-pixel/
├── index.html          all page markup (navigation, sections, footer)
├── css/
│   ├── base.css        page background for dark and light mode
│   ├── nav.css         navigation bar, MORE menu, mobile menu, theme button
│   ├── main.css        every section between the navigation and the footer
│   └── footer.css      footer
└── js/
    ├── theme-init.js   applies the saved light/dark choice before the page shows
    ├── nav.js          menus, smooth scrolling, active section, light/dark mode
    ├── main.js         preloader, animations, galleries, videos, FAQ, contact form
    └── footer.js       footer character, year, back to top
```

Images and videos load from Cloudinary and Loom, so there is no assets folder.

## Run it locally

Open `index.html` in Chrome or Edge. No build step or installs needed.

## Publish it

**GitHub Pages:** in the repository go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save. The site goes live at `https://<username>.github.io/<repository>/` after a minute or two.

**Vercel:** import the repository at vercel.com, leave the framework preset on **Other**, and deploy.

## Contact form (EmailJS)

The IDs are in `js/main.js` (search for `serviceId`):

- Service ID: `service_05n4q3i`
- Template ID: `template_umulqsu`
- Auto reply template ID: `template_qwx24uy`

Template variables: `{{user_name}}`, `{{user_email}}`, `{{service_type}}`, `{{user_message}}`, `{{reply_to}}`.
The auto reply template's **To Email** must be `{{user_email}}`.

The EmailJS public key is meant to be public. To stop it being used elsewhere, add the live domain under **EmailJS → Account → Security**.

## Common edits

| What | Where |
|---|---|
| Section text | `index.html` |
| Workflows, dashboards, AI demos, A2P screenshots | `js/main.js`, search `var WF=`, `var DASH=`, `var AI=`, `var A2P=` |
| Tech stack tools and logos | `js/main.js`, search `var CATS=` and `var LOGO=` |
| FAQ questions | `js/main.js`, search `var COLS=` |
| Testimonials | `js/main.js`, search `TESTIMONIALS` |
| Colors | `css/main.css`, the `.pxv{...}` and theme token blocks near the top |
