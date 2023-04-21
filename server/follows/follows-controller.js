import * as followsDao from "./follows-dao.js"
import * as usersDao from "../users/users-dao.js"

function FollowsController(app)  {
    const unFollowsUser = async (req, res) => {
            const follower = req.params.follower;
            const followed = req.params.followed;
            const status = await followsDao.unfollowUser(follower, followed);
            res.json(status);
        };

    const findFollowsByFollowedId = async (req, res) => {

          const followed = req.params.followed;
          const follows = await followsDao.findFollowsByFollowedId(followed);


          const followsProfiles = [];
          for (let i = 0; i < follows.length; i++){
               const findUser = await usersDao.findUserById(follows[i].follower);
               if(findUser){
                  followsProfiles.push(findUser);
               }
          }

          res.json(followsProfiles);




    };

    const findFollowsByFollowerId = async (req, res) => {

      const follower = req.params.follower;
      const follows = await followsDao.findFollowsByFollowerId(follower);
      const followsProfiles = [];
      for (let i = 0; i < follows.length; i++){

           const findUser = await usersDao.findUserById(follows[i].followed);
           if (findUser){
                followsProfiles.push(findUser);
           }

      }
      res.json(followsProfiles);
      };

      const findFollowsByFollowerAndFollowed = async (req, res) => {
            const follower = req.params.follower;
            const followed = req.params.followed;
            const findFollows = await followsDao.findFollowsByFollowerAndFollowed(follower, followed);

            if (findFollows){
                res.send({'result':"yes"});
            }
            else{
                res.send({"result":"no"});
            }
      }

     const userFollowsUser = async (req, res) => {
            const follower = req.params.follower;
            const followed = req.params.followed;

            let follow = await followsDao.findFollowsByFollowerAndFollowed(follower, followed);
            if(follow){
                res.sendStatus(400);
                return;
            }

            follow = await followsDao.userFollowsUser(follower, followed);
            res.json(follow);
        };

    app.post("/api/users/:follower/follows/:followed", userFollowsUser);
    app.delete("/api/users/:follower/follows/:followed", unFollowsUser);
    app.get("/api/users/:followed/followers", findFollowsByFollowedId);
    app.get("/api/users/:follower/followees", findFollowsByFollowerId);
    app.get("/api/users/:follower/follows/:followed",findFollowsByFollowerAndFollowed);


};

export default FollowsController;
