import couchbase_dal from "./couchbase_dal.js";
import { League } from "./interfaces.js";

async function getUsersFromLeague(leagueID: string): Promise<{ name: string }[]> {
    // Retrieves the names of all users in a given league, returns array of names for each
    // First, retrieve list of userIDs given the leagueID
    const league = await couchbase_dal.getLeagueFromId(leagueID);
    if (!league || league.type !== "mpg_league") {
        // Handle no league found error & incorrect object type
        throw new Error("No league with this ID was found");
    }
    const leagueUsers = league?.usersTeams;
    
    // Next, for each userID, retrieve the user's information, which contains the name
    const usernames = [];
    for (let user in leagueUsers) {
        const userInfo = await couchbase_dal.getUserFromId(user);
        if (!userInfo) {
            throw new Error("Error in retrieving user details");
        }
        const username = userInfo.name;
        usernames.push({ "name": username});
    }

    // Finally, return list of name strings
    return usernames;
}

async function createNewLeague(newLeague: any) {
    // Create a new league and store in the couchbase server
    if (!newLeague.adminId || !newLeague.id || !newLeague.description || !newLeague.name) {
        throw new Error("Missing league information for creation")
    }

    const newLeagueFromDetails: League = {
        id: newLeague.id,
        name: newLeague.name,
        description: newLeague.description,
        adminId: newLeague.adminId,
        type: "mpg_league"
    }

    await couchbase_dal.createNewLeagueObject(newLeagueFromDetails);
    return;
}

async function updateTeamName(teamId: string, newName: string) {
    // Update team name to 'newName', given teamId
    if (!teamId) {
        throw new Error("No teamId was provided");
    }

    // Do we want to allow empty team name? I'm going to assume no, but it would be possible without the below
    if (!newName) {
        throw new Error("Cannot have empty team name");
    }

    // First, we retrieve the team's details
    const team = await couchbase_dal.retrieveTeamDetails(teamId);
    if (!team || team.type !== "mpg_team") {
        throw new Error("Cannot find the team with the provided teamId");
    };

    // Next, update the team name field to the new value
    team.name = newName;

    // Last, update the team object in the db
    await couchbase_dal.updateTeam(team);
    return;
}


export default {
    getUsersFromLeague,
    createNewLeague,
    updateTeamName
};