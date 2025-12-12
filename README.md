<div align="center">
  <img id="top" src="https://raw.githubusercontent.com/Zoha/files/master/movier/images/movier%20image%20v1.jpg" width="100%" alt="movier package image">

# 🎥 Movier: Lightweight IMDb scraping helpers for movies, series, and celeb data inside your Node.js app 🚀

  <p>
    <a href="https://discord.gg/Q3ZhdRJ"><img src="https://img.shields.io/discord/495602800802398212.svg?colorB=5865F2&logo=discord&logoColor=white&style=for-the-badge" alt="Discord"></a>
    <a href="https://github.com/Valhalla-Development/movier/stargazers"><img src="https://img.shields.io/github/stars/Valhalla-Development/movier.svg?style=for-the-badge&color=yellow" alt="Stars"></a>
    <a href="https://github.com/Valhalla-Development/movier/network/members"><img src="https://img.shields.io/github/forks/Valhalla-Development/movier.svg?style=for-the-badge&color=orange" alt="Forks"></a>
    <a href="https://github.com/Valhalla-Development/movier/issues"><img src="https://img.shields.io/github/issues/Valhalla-Development/movier.svg?style=for-the-badge&color=red" alt="Issues"></a>
    <a href="https://github.com/Valhalla-Development/movier/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Valhalla-Development/movier.svg?style=for-the-badge&color=blue" alt="License"></a>
    <br>
    <a href="https://app.codacy.com/gh/Valhalla-Development/movier/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade"><img src="https://img.shields.io/codacy/grade/27577e1b6cdd4706b3135a2574859d3d?style=for-the-badge&color=brightgreen" alt="Codacy"></a>
    <a href="https://www.imdb.com/"><img src="https://img.shields.io/badge/Data%20from-IMDb-F5C518?style=for-the-badge&logoColor=000000" alt="Data from IMDb"></a>
    <a href="#"><img src="https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="Made with TypeScript"></a>
  </p>
</div>

---
## 🌟 Welcome to movier, an IMDb Data Scraping Library!

> **Note:** We recommend not using this package directly in production, as it scrapes IMDB page content. Requests can take a couple of seconds to complete. Instead, use this package to fetch and cache the information in your local database for faster retrieval.

## 🛠️ Installation

Install movier using your preferred package manager:

**Bun:**
```bash
bun add @valhalladev/movier
```

**Yarn:**
```bash
yarn add @valhalladev/movier
```

**npm:**
```bash
npm install @valhalladev/movier --save
```

## 🚀 Usage

```javascript
const movier = require("@valhalladev/movier");
```

### Title details (movie/series)

Pull every detail from an IMDB title page—plot, ratings, cast, crew, release info, keywords, images, awards, and more.

```javascript
movier.getTitleDetailsByName("interstellar 2014");
movier.getTitleDetailsByUrl("https://www.imdb.com/title/tt0816692/");
movier.getTitleDetailsByIMDBId("tt0816692");
movier.getTitleDetailsByFoundedTitleDetails(foundedDetails);
```

Each call resolves to a structured title object. See the example in [examples/results/interstellarTitleResults.json](https://raw.githubusercontent.com/Valhalla-Development/movier/main/examples/results/interstellarTitleResults.json) for the full schema.

### Search for titles

Search by name and receive match metadata (IMDB url, score, thumbnail) so you can select the correct entry before fetching the full payload.

```javascript
movier.searchTitleByName("interstellar 2014");
```

Results match the shape shown in [examples/results/interstellarTitleSearchResults.json](https://raw.githubusercontent.com/Valhalla-Development/movier/main/examples/results/interstellarTitleSearchResults.json).

### Person (celebrity) details

Grab bios, birth info, filmography, personal details, and imagery for any celebrity page.

```javascript
movier.getPersonDetailsByName("jennifer lawrence");
movier.getPersonDetailsByUrl("https://www.imdb.com/name/nm2225369/");
movier.getPersonDetailsByIMDBId("nm2225369");
movier.getPersonDetailsByFoundedPersonDetails(foundedDetails);
```

Each method resolves to a consistent person object. Reference [examples/results/jenniferLawrencePersonResults.json](https://raw.githubusercontent.com/Valhalla-Development/movier/main/examples/results/jenniferLawrencePersonResults.json) for the payload structure.

### Search for people

```javascript
movier.searchPersonByName("jennifer lawrence");
```

Returns a shortlist of profiles with match scores and URLs (see [examples/results/jenniferLawrencePersonSerachResults.json](https://raw.githubusercontent.com/Valhalla-Development/movier/main/examples/results/jenniferLawrencePersonSerachResults.json)).

## 🧪 Test

Execute the test suite after installing dependencies:

```bash
bun test
```

## 🤝 Contributing

We welcome contributions that help movier stay useful and reliable. Before you start work, please review our [CONTRIBUTING guide](https://github.com/Valhalla-Development/movier/blob/main/CONTRIBUTING.md) so you understand the workflow, Code of Conduct, and release expectations. Follow the listed steps (fork, branch, commit, push, open a PR) and keep your PR description detailed so reviewers can follow the changes you made.

## 📜 License

This project is licensed under the [MIT License](https://github.com/Valhalla-Development/movier/blob/main/LICENSE) – feel free to fork, adapt, and redistribute with attribution.

## 🙏 Acknowledgements

- [IMDb](https://www.imdb.com/) for the data that powers movier’s lookups
- [Zoha](https://github.com/Zoha) for the original movier project and parser work
- Everyone who tests, files issues, or contributes to movier’s continued usefulness

## 📬 Support & Community

Got questions or need help? Join our [Discord server](https://discord.gg/Q3ZhdRJ) for support and to connect with other bot developers!

---

<div align="center">

💻 Crafted with ❤️ by [Valhalla-Development](https://github.com/Valhalla-Development) & [Zoha](https://github.com/Zoha/movier)

[🐛 Spotted an issue?](https://github.com/Valhalla-Development/movier/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%5BBUG%5D+Short+Description) | [💡 Got an idea?](https://github.com/Valhalla-Development/movier/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml&title=%5BFeature%5D+Short+Description) | [🤔 Need help?](https://discord.gg/Q3ZhdRJ)

<a href="#top">🔝 Back to Top</a>
</div>