FROM mongo:latest
WORKDIR /app
COPY ./src ./src
RUN apt-get update && apt-get install -y python3 python3-pip
WORKDIR /src
RUN ["pip3", "install", "-r", "requirements.txt"]
EXPOSE 27017