## TASK LIST:

- [x] LEARN HOW TO USE GITHUB ACTIONS AS SOME FORM OF CRON JOB.
- [x] MOVE GETLEAGUEDATASETS FETCHES INTO AUTOMATED ACTIONS EVERY N HOURS (12 or 24)
      I really shouldn't be fetching these kind of per-patch, semi-static json files on user visits anymore, now that I have a better idea of what I'm doing in webdev. This would also allow me to forego typescript headaches, consistently having to log stuff I'm looking at etc.
- [x] SO AGAIN, LEARN HOW TO AUTOMATICALLY DOWNLOAD THESE JSON FILES EVERY N HOURS AND FORCEDEPLOY

<br/>
<div align="center">
  <h3 align="center">LoLMH.Next</h3>
  <p align="center">
    Nextjs Project
    <br/>
    <br/>
    <a href="https://leaguemh-next.vercel.app/" target="_blank">View Live Project</a>  
  </p>
</div>

## About The Project

This is a Nextjs migration of LoLMH.React. Easier than setting up node or paying for serverless funtions to hide API key + not having to deal with Riot's API CORS shenanigans. Below is the original react project intro.

`A recreation of my vanilla LoLCBL project, minus the CBL part, in React. Its only purpose is to fetch match histories of players across all League of Legends regions with public APIs. This project acts as practice with React, queries, and dynamic cdn asset fetching.`

Now migrated to Nextjs & TypeScript. Functionalities unchanged - prefer keeping it the way it was for posterity, and show growth process.

### Built With

<details>
<summary><h3>Nextjs Version (Current)</h3></summary>
<p>Post-migration.</p>

- [Nextjs 15](https://nextjs.org/)
- [TypeScript 5.6.3](https://www.typescriptlang.org/)
- [AccountV1, SummonerV4, LeagueV4, MatchV5 & SummonerV4 Riot APIs](https://developer.riotgames.com/apis)
- [DataDragon](https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html)
- [CommunityDragon](https://www.communitydragon.org/)
- [Vercel Hosting](https://vercel.com/)

</details>
<details>
<summary><h3>React Version (Old)</h3></summary>
<p>Prior to Nextjs migration.</p>

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [AccountV1, SummonerV4, LeagueV4, MatchV5 & SummonerV4 Riot APIs](https://developer.riotgames.com/apis)
- [DataDragon](https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html)
- [CommunityDragon](https://www.communitydragon.org/)
- [Firebase Hosting](https://firebase.google.com/)

</details>

## Usage

As per the example on the app's landing page; select a region, enter a summoner name & tag then click fetch.
-> [https://leaguemh-next.vercel.app/](https://leaguemh-next.vercel.app/)

## Contact

MGSimard - g.marcgs@gmail.com  
[@MGSimard on X](https://x.com/MGSimard)

For more info, view my portfolio at [mgsimard.github.io](https://mgsimard.github.io). Resume attached.
