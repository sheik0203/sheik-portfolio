# Use the official Nginx image as the base image
FROM nginx:alpine

# Set the working directory to the default Nginx html directory
WORKDIR /usr/share/nginx/html

# Copy the static website files to the Nginx html directory
# This includes index.html, css/, js/, and assets/
COPY . .

# Expose port 80 to allow traffic to the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
