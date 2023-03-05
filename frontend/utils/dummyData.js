export const fakeUser = {
  username: "gutentype",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  avatar: "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
  following: 0,
  followers: 1439,
  website: "https://type-papa.xyz",
  about:
    "Johannes Gensfleisch zur Laden zum Gutenberg was a German inventor, printer, publisher, and goldsmith who introduced printing to Europe with his mechanical movable-type printing press.",
  social: [
    { icon: "RD", url: "https://app.radicle.xyz/gutentype" },
    { icon: "GH", url: "https://github.com/gutentype" },
    { icon: "TW", url: "https://twitter.com/gutentype" },
    { icon: "TG", url: "https://t.me/gutentype" },
    { icon: "DC", url: "https://discordapp.com/users/gutentype#5922" },
    { icon: "IG", url: "https://www.instagram.com/gutentype" },
  ],
  created: [
    { txt: "Sans Serif", url: "/font/test-font" },
    { txt: "Serif", url: "/font/test-font" },
    { txt: "Display", url: "/font/test-font" },
  ],
  collabs: [
    {
      txt: "Bitdoni FontStream",
      url: "/stream/000001",
      cstatus: true,
    },
    {
      txt: "Blackletther FontStream",
      url: "/stream/000001",
      cstatus: false,
    },
  ],
  treasury: {
    balance: 3260.108848,
    fontStreams: [
      {
        txt: "Small Caps",
        ammount: 32.123,
        url: "/stream/000001",
      },
      {
        txt: "Old Style Figures",
        ammount: 78.123,
        url: "/stream/000001",
      },
    ],
  },
  collected: [{ txt: "Some Font Collected", url: "/nft/000001" }],
  funded: [{ txt: "Some Font Stream", url: "/stream/000001" }],
};

export const fakeFont = {
  nme: "Paradisio",
  cssname: "Paradisio",
  style: "normal",
  weight: 400,
  creators: [
    {
      username: "gutentype",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
  ],
  description: "Badass Sans Serif Latin Font with English support",
  ipfs: "https://ipfs.io/ipfs/QmWC2TeLHdDpKCu8Rip4fjZv1yXvgLBvp8AV7oa54Ajsf6?filename=Paradisio-IF.otf",
  format: "format",
  streams: [
    { nme: "Add ligatures", url: "/stream/000001" },
    { nme: "Add French Support", url: "/stream/000001" },
  ],
  collected: [
    {
      username: "gutentype",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
  ],
  specimen: [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789#?!&·()-.,",
  ],
  preselect: ["Custom", "Uppercase", "Lowercase", "Complete"],
  charset:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?!&·()-.,",
  price: 0.5,
};
