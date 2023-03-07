FROM python:3.10
WORKDIR /app
COPY ./src .
ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
RUN pip3 install -r requirements.txt
# CMD ["python3", "collector.py"]
EXPOSE 3000