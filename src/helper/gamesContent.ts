export interface GameInfoItem {
  title: string;
  description: string;
}

export const gameGenres: GameInfoItem[] = [
  {
    title: "Action",
    description:
      "Fast-paced games where quick reflexes and smart upgrades help you survive and win.",
  },
  {
    title: "Puzzle",
    description:
      "Relaxing brain teasers that challenge your logic, planning and colour matching skills.",
  },
  {
    title: "Racing",
    description:
      "Bikes, formula cars and highway runs with realistic tracks and high-speed thrills.",
  },
  {
    title: "Adventure",
    description:
      "Light-hearted stories and missions packed with fun characters and surprises.",
  },
];

export const gameHighlights: GameInfoItem[] = [
  {
    title: "Free to play",
    description:
      "All our games are free to download. Some include optional in-app purchases and ads.",
  },
  {
    title: "Android and iOS",
    description:
      "Play on your phone or tablet, with games available on Google Play and the App Store.",
  },
  {
    title: "Your privacy matters",
    description:
      "Our games follow the eShaafi Games privacy policy, which explains what data we collect and why.",
  },
];
