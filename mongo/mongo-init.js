db.createUser(
    {
        user: "gym_user",
        pwd: "gym",
        roles: [
            {
                role: "readWrite",
                db: "gym"
            }
        ]
    }
);