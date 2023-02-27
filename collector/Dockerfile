FROM python:3.10
WORKDIR /app
COPY ./src .
RUN pip3 install -r requirements.txt
CMD ["python3", "collector.py"]
EXPOSE 3000