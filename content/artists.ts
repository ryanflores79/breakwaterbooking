import type { Artist } from "@/lib/types";

export const artists: Artist[] = [
  {
    slug: "riptide-radios",
    name: "Riptide Radios",
    descriptor: "Alternative rock · Southern California",
    shortBio:
      "A Southern California alternative-rock three-piece built on melodic hooks, heavy guitars, and an energetic live set.",
    location: "Southern California",
    genres: ["Alternative Rock", "Post-Grunge", "Rock"],
    wordmark: "RIPTIDE RADIOS",
    liveReelUrl: "https://www.youtube.com/channel/UCZ5zrh8xOTvwxSQnpRdvmfg",
    musicLinks: [
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/3WZ9TzM3awFZSvbkW9UHgn",
      },
      {
        label: "Apple Music",
        href: "https://music.apple.com/us/artist/riptide-radios/1714876461",
      },
      { label: "Official site", href: "https://riptideradios.com" },
    ],
    epkUrl: null,
    acceptingBookings: true,
  },
  {
    slug: "hazmatt",
    name: "Hazmatt",
    descriptor: "Rock · reggae · punk · Encinitas",
    shortBio:
      "Formed in Lahaina in 2006 and now based in Encinitas, Hazmatt folds rock, reggae, punk, hip-hop, and dub into a high-energy coastal live set.",
    location: "Encinitas, California",
    genres: ["Rock Reggae", "Punk", "Dub"],
    wordmark: "HAZMATT",
    liveReelUrl: null,
    musicLinks: [
      { label: "Official site", href: "https://www.hazmattmusic.com/" },
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/4g8mbiTmcdNrH3IdwP4fdc",
      },
    ],
    epkUrl: null,
    acceptingBookings: true,
  },
  {
    slug: "sprung-monkey",
    name: "Sprung Monkey",
    descriptor: "Alternative rock · San Diego",
    shortBio:
      "San Diego alternative-rock mainstays whose catalog moves through punk, hard rock, and funk with a live legacy built across five studio albums.",
    location: "San Diego, California",
    genres: ["Alternative Rock", "Punk Rock", "Hard Rock"],
    wordmark: "SPRUNG MONKEY",
    liveReelUrl: null,
    musicLinks: [
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/3wJSMJy1CMbp0Nr1QX76AF",
      },
      {
        label: "Apple Music",
        href: "https://music.apple.com/us/artist/sprung-monkey/7402782",
      },
      {
        label: "Band history",
        href: "https://en.wikipedia.org/wiki/Sprung_Monkey",
      },
    ],
    epkUrl: null,
    acceptingBookings: true,
  },
  {
    slug: "occupier",
    name: "Occupier",
    descriptor: "Alternative rock · San Diego",
    shortBio:
      "A layered San Diego alternative-rock project led by songwriter and vocalist Ernie Longoria, with Ryan Flores, Dan Vega, and Aaron T Smith.",
    location: "San Diego, California",
    genres: ["Alternative Rock", "Rock"],
    wordmark: "OCCUPIER",
    liveReelUrl: null,
    musicLinks: [
      { label: "Official site", href: "https://occupierband.com/" },
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/03fdKCs2fDclHIKucqTsgj",
      },
      {
        label: "Apple Music",
        href: "https://music.apple.com/us/artist/occupier/1696860119",
      },
    ],
    epkUrl: null,
    acceptingBookings: true,
  },
  {
    slug: "beautiful-reasons",
    name: "Beautiful Reasons",
    descriptor: "The Cry tribute · San Diego",
    shortBio:
      "A live tribute to cult-classic San Diego post-punk and jangle-pop band The Cry, featuring a member of the original band and centered on the 1990 album Beautiful Reasons.",
    location: "San Diego, California",
    genres: ["Post-Punk", "Jangle Pop", "Tribute"],
    wordmark: "BEAUTIFUL REASONS",
    liveReelUrl: null,
    musicLinks: [
      {
        label: "The Cry on Spotify",
        href: "https://open.spotify.com/album/1oFSk0NO017q0C0cvVLHQY",
      },
      {
        label: "The Cry on Apple Music",
        href: "https://music.apple.com/us/album/beautiful-reasons/200899360",
      },
    ],
    epkUrl: null,
    acceptingBookings: true,
  },
];

export const artistSlugs = artists.map((artist) => artist.slug);
