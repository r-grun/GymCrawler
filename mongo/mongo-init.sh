#!/bin/bash
set -e

mongo <<EOF
use admin 
db.createUser({
    user: "${MONGO_GYM_USERNAME}",
    pwd: "${MONGO_GYM_PASSWORD}",
    roles: [
        {
            role: "readWrite",
            db: "gymDB",
        },
    ],
});

use gymDB

db.createCollection('checkin', {
    capped: false
});

db.checkin.insert([{'timestamp': '2023-02-28T11:37:43.0861', "centerId": 320, "currentlyCheckedInCount": 86, "maximumAllowedCheckedIn": 438, "numberOfAvailableSpots": 352, "numberOfReservedSpots": 0, "webName": "Hamburg-Wandsbek", "status": 1}]);
EOF
