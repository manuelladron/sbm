# SBM Project Website

Project website for "Tokenizing Buildings: A Transformer for Layout Synthesis" (CVPR 2025).

## Overview

This directory contains the static website for the SBM (Small Building Model) publication. The website is designed to be hosted on GitHub Pages without requiring any server-side code.

## Directory Structure

```
website/
├── index.html              # Main HTML page
├── README.md               # This file
└── static/
    ├── css/
    │   ├── bulma.min.css          # Bulma CSS framework
    │   ├── bulma-carousel.min.css # Carousel styles
    │   ├── bulma-slider.min.css   # Slider styles
    │   └── index.css              # Custom styles
    ├── js/
    │   ├── bulma-carousel.min.js  # Carousel JavaScript
    │   ├── bulma-slider.min.js    # Slider JavaScript
    │   └── index.js               # Custom JavaScript
    ├── images/
    │   ├── favicon.svg            # Site favicon
    │   ├── placeholder-*.svg      # Placeholder images (replace with real figures)
    │   └── ...                    # Add your paper figures here
    └── paper/
        └── sbm_paper.pdf          # Paper PDF (add when ready)
```

## Deploying to GitHub Pages

### Option 1: Dedicated Repository (Recommended)

1. **Create a new public repository** on GitHub (e.g., `sbm`)

2. **Copy the website contents**:
   ```bash
   # From this directory
   cp -r * /path/to/new/sbm-repo/
   ```

3. **Push to GitHub**:
   ```bash
   cd /path/to/new/sbm-repo
   git init
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/YOUR_USERNAME/sbm.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click Save

5. **Access your site** at: `https://YOUR_USERNAME.github.io/sbm/`

### Option 2: Existing Repository with docs/ folder

1. Copy this website folder to `docs/` in your existing repo
2. Enable GitHub Pages with source set to `docs/` folder

## Updating Content

### Replace Placeholder Images

The `static/images/` folder contains SVG placeholder images. Replace these with your actual figures:

| Placeholder | Description | Recommended Size |
|-------------|-------------|------------------|
| `placeholder-hero.svg` | Figure 1 - Hero image showing layout examples | 1200×500px |
| `placeholder-architecture.svg` | Figure 2 - Model architecture overview | 1000×400px |
| `placeholder-umap.svg` | Figure 4 - UMAP clustering visualization | 900×400px |
| `placeholder-gallery-*.svg` | Gallery images for carousel | 400×300px |

### Update Author Information

Edit `index.html` and update:

1. **Authors** (lines ~65-75):
   ```html
   <span class="author-block">
     <a href="https://your-website.com">Your Name</a><sup>1</sup>,
   </span>
   ```

2. **Affiliations** (lines ~78-81):
   ```html
   <span class="author-block"><sup>1</sup>Your Institution,</span>
   ```

3. **Links** (lines ~90-115):
   - Update PDF link when paper is ready
   - Add arXiv link when available
   - Update GitHub/Code links if releasing code

4. **BibTeX** (lines ~280-290):
   ```bibtex
   @inproceedings{sbm2025cvpr,
     title={Tokenizing Buildings: A Transformer for Layout Synthesis},
     author={Your Name and Co-Author Name},
     booktitle={CVPR},
     year={2025}
   }
   ```

### Add Paper PDF

Place your paper PDF at `static/paper/sbm_paper.pdf`.

### Google Analytics (Optional)

Replace `G-PLACEHOLDER` in `index.html` (line ~12) with your Google Analytics ID:
```html
gtag('config', 'YOUR-GA-ID');
```

## Local Development

To preview the website locally:

```bash
# Using Python 3
cd website
python -m http.server 8000

# Or using Node.js
npx serve .
```

Then open `http://localhost:8000` in your browser.

## Credits

- Website template based on [Nerfies](https://nerfies.github.io/)
- CSS framework: [Bulma](https://bulma.io/)
- Icons: [Font Awesome](https://fontawesome.com/)

## License

This website template is licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).

