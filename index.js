import ical from "ical-generator";
import moment from "moment";
import fetch from "node-fetch";
import http from "node:http";

const schedulesURL = "https://splatoon3.ink/data/schedules.json";
const festivalsURL = "https://splatoon3.ink/data/festivals.json";

const newCalendar = async () => {
    const calendar = ical({ name: "Splatoon iCal" });
    await Promise.all([
        fetch(schedulesURL, {
            headers: {
                "User-Agent": "https://github.com/TetraTsunami/SplatCal",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // types of events: challenge, big run, eggstra work
                for (const event of data.data.eventSchedules.nodes) {
                    processChallenge(event, calendar);
                }
                for (const event of data.data.coopGroupingSchedule
                    .bigRunSchedules.nodes) {
                    processBigRun(event, calendar);
                }
                for (const event of data.data.coopGroupingSchedule
                    .teamContestSchedules.nodes) {
                    processEggstraWork(event, calendar);
                }
            })
            .catch((error) => {
                console.error("Error retrieving JSON:", error);
            }),
        fetch(festivalsURL, {
            headers: {
                "User-Agent": "https://github.com/TetraTsunami/SplatCal",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // types of events: splatfest
                for (const event of data.US.data.festRecords.nodes) {
                    processSplatfest(event, calendar);
                }
            })
            .catch((error) => {
                console.error("Error retrieving JSON:", error);
            }),
    ]);
    return calendar;
};

const processChallenge = (event, calendar) => {
    const summary = event.leagueMatchSetting.leagueMatchEvent.name;
    const description = event.leagueMatchSetting.leagueMatchEvent.desc;
    const location = event.leagueMatchSetting.vsStages[0].name;
    const url = "https://splatoon3.ink/challenges";
    for (const period of event.timePeriods) {
        const startTime = moment(period.startTime);
        const endTime = moment(period.endTime);
        calendar.createEvent({
            start: startTime,
            end: endTime,
            summary: summary,
            description: description,
            location: location,
            url: url,
        });
    }
};

const processBigRun = (event, calendar) => {
    const startTime = moment(event.startTime);
    const endTime = moment(event.endTime);
    const summary = "Big Run";
    const location = event.setting.coopStage.name;
    const url = "https://splatoon3.ink/salmonrun";
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: summary,
        location: location,
        url: url,
    });
};

const processEggstraWork = (event, calendar) => {
    const startTime = moment(event.startTime);
    const endTime = moment(event.endTime);
    const summary = "Eggstra Work";
    const location = event.setting.coopStage.name;
    const url = "https://splatoon3.ink/salmonrun";
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: summary,
        location: location,
        url: url,
    });
};

const processSplatfest = (event, calendar) => {
    const startTime = moment(event.startTime);
    const endTime = moment(event.endTime);
    const summary = `Splatfest - ${event.title}`;
    const description = event.teams.map((team) => team.teamName).join(" vs. ");
    const attachments = [event.image.url];
    const url = "https://splatoon3.ink/splatfests";
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: summary,
        description: description,
        attachments: attachments,
        url: url,
    });
};

let calendar = null;
let lastUpdated = null;
const updateInterval = 1000 * 60 * 60 * 2; // 2 hours

const updateCalendar = async () => {
    console.log("Updating calendar...");
    calendar = await newCalendar();
    lastUpdated = moment();
};

const serveCalendar = async (res) => {
    if (
        !calendar ||
        !lastUpdated ||
        moment().diff(lastUpdated) > updateInterval
    ) {
        await updateCalendar();
    }
    calendar.serve(res);
};

http.createServer(async (req, res) => await serveCalendar(res)).listen(
    3000,
    "0.0.0.0",
    () => {
        console.log("Server running at http://127.0.0.1:3000/");
    }
);
