FROM python:3.10
WORKDIR /app
COPY ./src .
RUN pip3 install -r requirements.txt
CMD ["waitress-serve", "--listen=*:5000", "--call", "run:create_app"]
EXPOSE 5000