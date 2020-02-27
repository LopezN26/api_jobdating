FROM mongo:latest

RUN mkdir -p /home/app/data
WORKDIR /home/app/data

# Pour syncro les fichiers dans les dossiers de syncro des le début  
COPY . . 
