db = new Mongo().getDB("gymDB");

db.createUser({
    user: process.env.MONGO_GYM_USERNAME,
    pwd: process.env.MONGO_GYM_PASSWORD,
    roles: [
        {
            role: "readWrite",
            db: "gymDB",
        },
    ],
});

db.createCollection('checkin', {
    capped: false
});

db.checkin.insert([{'timestamp': '2023-02-28T11:37:43.0861', 'centerId': '320', 'webName': 'Hamburg-Wandsbek', 'status': 1, 'currentlyCheckedInCount': '60', 'maximumAllowedCheckedIn': '438'}]);