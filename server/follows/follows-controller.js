import * as followsDao from "./follows-dao.js"

const FollowsController = (app) => {
    const userFollowsUser = async (req, res) => {
        console.log("user follow user");
        const follower = req.params.follower;
        const followed = req.params.followed;
        console.log("user follow user");

        let follow = await followsDao.findFollowsByFollowerAndFollowed(follower, followed);
        console.log(follow);
        if(follow){
            res.sendStatus(400);
            return;
        }

        const follows = await followsDao.userFollowsUser(follower, followed);
        res.json(follows);
    }

    const unFollowsUser = async (req, res) => {
            const follower = req.params.follower;
            const followed = req.params.followed;
            const status = await followsDao.unFollowsUser(follower, followed);
            res.json(status);
        }

    const findFollowsByFollowedId = async (req, res) => {
        const followed = res.params.followed;
        const follows = await followsDao.findFollowsByFollowedId(followed);
        res.json(follows);
    }

    const findFollowsByFollowerId = async (req, res) => {
            const follower = res.params.follower;
            const follows = await followsDao.findFollowsByFollowerId(follower);
            res.json(follows);
        }

    app.post("api/follows/:follower/follows/:followed", userFollowsUser);
    app.delete("api/follows/:follower/follows/:followed", unFollowsUser);
    app.get("api/follows/:followed/followers", findFollowsByFollowedId);
    app.get("api/follows/:follower/followees", findFollowsByFollowerId);


};

export default FollowsController;
