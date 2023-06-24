import express, { Request, Response } from "express";
import services from "./services.js";

const mpgRouter = express.Router();

mpgRouter.get("/fetchLeagueMembers/:leagueId", async (req: Request, res: Response) => {
    const leagueId = req.params.leagueId;
    try {
        const leagueUsers = await services.getUsersFromLeague(leagueId);
        res.status(200).json({ "users": leagueUsers });
    } catch (error) {
        //Here we  could use a message like below to indicate the response is due to an error:
        //res.status(500).json({ "error": "Could not retrieve league members"});
        // But to follow the spec, i will return an empty user array
        res.status(400).json({ "users": [] })
    }
});

mpgRouter.post("/createLeague", async (req: Request, res: Response) => {
    const newLeague = req.body;
    try {
        await services.createNewLeague(newLeague);
        res.status(201).send()
    } catch (error) {
        res.status(500).json({ "error": "Error when creating new league"})
    }
});

mpgRouter.patch("/updateTeamName", async (req: Request, res: Response) => {
    try {
        const teamId = req.body.teamId;
        const newName = req.body.newName;
        await services.updateTeamName(teamId, newName);
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ "error": "Something went wrong when updating the team name"});
    }
});

export default mpgRouter;