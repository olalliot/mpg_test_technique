import { connect, Bucket } from "couchbase";
import { League, Team, User } from "./interfaces.js"

/* Couchbase config information - user credentials + cluster info */
const couchbaseEndpoint = "couchbase://localhost";
const bucketName = "mpg";

const username = "admin";
const password = "monpetitgazon";

/* Connect to cluster */
const cluster = await connect(couchbaseEndpoint, {
    username: username,
    password: password
});

const bucket: Bucket = cluster.bucket(bucketName);
const defaultCollection = bucket.defaultCollection();




async function getLeagueFromId(leagueID: string): Promise<League | null>{
    // Retrieves all league fields from Id
    const result = await defaultCollection.get(leagueID);
    const league = result.value;
    return league;
}

async function getUserFromId(userID: string): Promise<User | null> {
    // Retrieves all user fields from Id
    const result = await defaultCollection.get(userID);
    const user = result.value;
    return user;
}

async function createNewLeagueObject(newLeague: League) {
    // Create new league from user-submitted information
    await defaultCollection.upsert(newLeague.id, newLeague);
    return;
}

async function retrieveTeamDetails(teamId: string): Promise<Team | null> {
    // Retrieves team's fields given team Id
    const result = await defaultCollection.get(teamId)
    const team = result.value;
    return team;
}

async function updateTeam(team: Team) {
    // Updates all fields of existing team
    await defaultCollection.replace(team.id, team);
    return;
}

export default {
    getLeagueFromId,
    getUserFromId,
    createNewLeagueObject,
    retrieveTeamDetails,
    updateTeam
}