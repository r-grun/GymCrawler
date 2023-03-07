# GymCrawler
This project collects check-in data over gyms, stores it and provides overview over it.


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