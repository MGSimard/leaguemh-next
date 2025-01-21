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

![Screenshot](https://i.imgur.com/yfq46G1.png)

This is a Nextjs migration of LoLMH.React. Easier than setting up node or paying for serverless funtions to hide API key + not having to deal with Riot's API CORS shenanigans. Below is the original react project intro.

`A recreation of my vanilla LoLCBL project, minus the CBL part, in React. Its only purpose is to fetch match histories of players across all League of Legends regions with public APIs. This project acts as practice with React, queries, and dynamic cdn asset fetching.`

Now migrated to Nextjs & TypeScript. ~~Functionalities unchanged - prefer keeping it the way it was for posterity, and show growth process.~~

Lol I lied, I ended up learning about Github actions to set up bi-daily cron jobs to fetch semi-static datasets which represent game data usually updated per patch every 2ish weeks. I ended up reworking the majority of the app, but not so much as to bash my head against a wall trying to polish it as much as my other ones.

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

MGSimard - mgsimard.dev@gmail.com
[@MGSimard on X](https://x.com/MGSimard)

For more info, view my portfolio at [mgsimard.dev](https://mgsimard.dev). Resume attached.
