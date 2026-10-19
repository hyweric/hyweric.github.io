# Eric Hou — Portfolio

Static HTML, CSS, and Markdown, hosted on GitHub Pages.

## Preview

Run `python3 -m http.server 4173` from the repository root, then open
http://localhost:4173. Use a local server: opening HTML directly as a file
prevents the browser from loading the Markdown.

## Edit project pages

The six selected project pages share `assets/css/project.css` and
`assets/js/project.js`. Edit the Markdown beside each HTML page:

| Project            | Markdown                                        |
| ------------------ | ----------------------------------------------- |
| Volumetric Display | `port/volumetric-display/volumetric-display.md` |
| Wire Generator     | `port/wire-gen/f360wiregen.md`                  |
| VertiPaw           | `port/climber/climber.md`                       |
| FIRST Robotics     | `port/ftc/ftc.md`                               |
| Optical Flow       | `port/optical-flow/optical-flow.md`             |
| Coil Launcher      | `port/k-capstone/kcapstone.md`                  |

The HTML file holds the page title and category/date. Its `data-markdown`
attribute names the Markdown file. The old individual project JS loaders
are no longer used by these six pages.

Use `## Section title`, paragraphs, bullet lists, and normal Markdown links.
The page title is already an H1, so start content headings at H2.

Images use paths relative to the project folder:

```md
## Circuit design

Description of the design.

![Control PCB](files/control-pcb.png)
```

For videos or side-by-side media, HTML is supported:

```html
<div class="image-column-container">
  <div class="image-column">
    <img src="files/board.png" alt="Control PCB" />
  </div>
  <div class="image-column">
    <video controls playsinline preload="metadata">
      <source src="files/demo.mp4" type="video/mp4" />
    </video>
  </div>
</div>
```

Keep HTML blocks separated from Markdown paragraphs by blank lines.
Avoid inline colors, fixed widths, or layout styles; the shared stylesheet
handles spacing, media sizing, and mobile stacking. Use MP4/H.264 for the
widest browser video support. Existing MOV sources are preserved.

The locally bundled Marked 13 parser renders trusted repository content only.
Do not use this renderer for untrusted user input. Its license is in
`assets/js/marked.LICENSE.md`.

## Homepage and footer

Edit `index.html` for the introduction, skills, and project cards.
The same six projects are listed in `projects.html`.
The homepage portrait uses `assets/img/profile-pic.jpg`.
Footer text links become accessible SVG icons through `portfolio.js`;
their names also provide tooltips. Without JavaScript, text links remain usable.

## Resume

The resume PDF is stored at `assets/docs/Eric-Hou-Resume.pdf`; the site does not display resume links.

## Contact form

The original Formspree endpoint is preserved:
`https://formspree.io/f/mgeggrzw`.

Visible email addresses and direct email links use `hyweric@gmail.com`.
**Formspree controls the form's delivery inbox on its server.** Changing an
address in this repository does not change the Formspree recipient.
In the Formspree dashboard, open the existing form and verify that its
notification recipient is `hyweric@gmail.com` and verified.

Both contact forms use normal POST submission with required email, subject,
and message fields. No live test submission has been sent. To confirm delivery,
send a test through the deployed site and check the Gmail inbox and spam folder.

## Credits

Original site: MACode ID Virtual Folio. Current layout uses plain HTML/CSS;
project images and documentation remain in their original folders.

## Project carousel

The homepage carousel loops at 24.2 pixels per second. Edit that speed in
`assets/js/portfolio.js`. It scrolls automatically whenever visible and ramps down
to rest over 200 ms when a project card is hovered, then ramps back up on exit.
Mouse dragging and horizontal touch swipes move the cards directly; vertical
touch gestures still scroll the page. Dragging suppresses accidental project
clicks and briefly suspends automatic motion. Keep only the six original cards in `index.html`; JavaScript creates the
repeated sets. Without JavaScript, the original manual carousel remains.

`projects.html` contains the static six-project gallery, with three columns on
desktop, two on tablets, and one on phones. Update its images and captions when
changing the homepage projects. Skills are grouped in `index.html` under
Mechanical, EDA, Embedded, and Software.

The FTC Markdown uses `ftc-gallery` for two-column media and
`ftc-gallery ftc-gallery--three` for three-column media. Wrap each image or
video in a `figure` with a `figcaption`. Both layouts stack on mobile.
