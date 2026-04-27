# Portfolio Website

A clean, professional, and responsive developer portfolio website.

## Setup Instructions

1. **Clone or Download** the repository.
2. **Open `index.html`** in your browser to view the site.
3. **No build process required** - this is a static site using HTML, CSS, and Vanilla JS.

## Customization

- **Images**: Place your profile image in `assets/images/` and update the `src` in `index.html`.
- **Resume**: Place your PDF resume in `assets/` and rename it to `resume.pdf`.
- **Colors**: Modify `css/variables.css` to change the color scheme.
- **Content**: Update the text in `index.html` to reflect your bio, skills, and projects.

## Project Structure

- `css/`: Stylesheets (reset, variables, layout, components)
- `js/`: JavaScript files for navigation and animations
- `assets/`: Images and static files
- `index.html`: Main entry point

## Credits

Designed and built for Sheik Abdullah S.

## 🐳 Docker Support

You can run this portfolio easily using Docker. The image is hosted on Docker Hub.

### Run from Docker Hub
To pull and run the latest version directly:
```bash
docker run -d -p 8080:80 sheik0203/portfolio
```

### Build and Run Locally
If you want to build the image yourself:
```bash
# Build the image
docker build -t sheik-portfolio .

# Run the container
docker run -d -p 8080:80 sheik-portfolio
```

Once running, you can view the portfolio at **[http://localhost:8080](http://localhost:8080)**.
