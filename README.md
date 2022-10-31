
<img src="https://storage.googleapis.com/ethglobal-api-production/projects/ekwuo/images/interplanetary-fonts-logo-duotone-bg-72-dpi.png" width="150" alt="Interplanetary Fonts"/>

# Interplanetary Fonts
A decentralized NFT marketplace for creators and collectors of Fonts.

## [ETHOnline 2022](https://online.ethglobal.com/) Hackathon Finalist Project 🏆
Project page: https://ethglobal.com/showcase/interplanetary-fonts-ekwuo

Team: [@eduairet](https://github.com/eduairet) [@hyperalchemy](https://github.com/hyperalchemy) [@jsanchez034](https://github.com/jsanchez034) [@miglconts](https://github.com/orgs/letterengine/people/miglconts)
<br><br>

## Project Description:
**Interplanetary Fonts** is a decentralized NFT platform where creators can share and collaborate on Font projects while receiving real-time payments by project-funders. Users of the platform can view, fund or mint any Font-NFT project deployed and decide whether to mint an entire charset or only a few characters, according to their needs.

## How it's made
The application is interacting with a smart contracts deployed on Polygon Mumbai testnet for NFT minting with IPFS and to fund projects/pay creators (using Superfluid streaming protocol). <br>
Users can connect with their wallet to the application, fund projects or mint NFTs, and can create new projects only by verifying with Worldcoin proof-of-personhood. 
<br><br>

## How to run 

### Prerequisites
- Node version 16.13.0 
    - nodenv ( https://github.com/nodenv/nodenv#homebrew-on-macos )
    - nvm ( https://github.com/nvm-sh/nvm#install--update-script )
-  pnpm installed globally 
```bash
    $ npm install -g pnpm
```

### Steps
1. Clone the repo
```bash
    $ git clone https://github.com/letterengine/interplanetary-fonts-ethonline.git
```
2. Install dependencies 
```bash
    $ pnpm install
```
3. Run the app 
```bash
    $ pnpm run dev:frontend
```
 4. View on browser: http://localhost:3000


