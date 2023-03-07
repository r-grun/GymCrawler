# GymCrawler
This project collects check-in data over gyms, stores it and provides overview over it.

## Target architecture

The project is made to be used as a server application.
Thus, it depends on the [rgrun/gymcrawler-python](https://hub.docker.com/repository/docker/rgrun/gymcrawler-python/general) docker image which is prebuild for `linux/amd64` (e.g. Windows) and `linux/arm64/v8` (e.g. RaspberryPi).
The `linux/arm64/v8` version is preselected but can be changed through changing the image tag in line `5` in the `docker-compose.yml` file.

```
    image: rgrun/gymcrawler-python:amd64    # for amd64 architecture (Windows)
```
```
    image: rgrun/gymcrawler-python:arm64    # for amd64 architecture (RaspberryPi)
```


## Prequisites
*git* and *Docker* have to be installed


## .env File
The root folder needs an .env file containing the following variables:

| Variable                  | Description                                                                                  | Example value   |
|---------------------------|----------------------------------------------------------------------------------------------|-----------------|
| MONGO_GYM_USERNAME        | Username of the local database (gymDB)                                                       | `gymuser`       |
| MONGO_GYM_PASSWORD        | Password for the gymDB user                                                                  | `gympass`       |
| WAIT_HOSTS                | Container name and port of the mongo container                                               | `mongodb:27017` |
| WAIT_TIMEOUT              | Timeout to wait for the mongo container to start                                             | `300`           |
| WAIT_SLEEP_INTERVAL       | Sleep duration of the wait command                                                           | `10`            |
| WAIT_HOST_CONNECT_TIMEOUT | Timeout for the python container to connect to the mongo container (only for `wait` command) | `30`            |
| GYM_CAPACITY_URL          | REST URL for requesting the gym capacity                                                     | n.a.            |
| GYM_ID                    | The ID of the gym                                                                            | n.a.            |



## Starting the application

Simply run `docker compose up -d` in the root folder.


## Open in browser

_coming soon..._