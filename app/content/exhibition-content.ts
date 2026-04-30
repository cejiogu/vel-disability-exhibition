export type AudioStop = {
  slug: string;
  title: string;
  stopLabel: string;
  summary: string;
  duration: string;
  description?: string;
  audioUrl?: string;
  transcript?: string[];
};

export const exhibitionStatement = {
  title: "Exhibition Statement",
  intro:
    "This exhibition invites visitors into disability-centered ways of sensing, making, and remembering. The works gathered here emphasize access as an artistic practice and reflection as a shared public act.",
  body: [
    "Across the gallery, artists and contributors share stories that emerge from disability experience rather than being explained from the outside. The exhibition asks visitors to slow down, read carefully, listen deeply, and consider how environments shape embodiment.",
    "These pieces are not arranged as a single argument. Instead, they form a set of encounters: with access needs, with joy, with fatigue, with interpretation, and with the many ways that care appears in public space.",
    "The digital materials connected to each piece extend this encounter. Additional context, audio, transcripts, and future AR experiences are designed to support multiple ways of learning from the work.",
  ],
};

export const visitorActivity = {
  title: "Visitor Activity",
  subtitle: "Anita's Drawing Experience",
  description:
    "This page will host Anita's augmented reality drawing experience for visitors. For now, it serves as a calm starting point with instructions and space reserved for the interactive layer.",
  instructions: [
    "Take a moment to look around the exhibition before beginning.",
    "When the drawing activity is ready, visitors will be able to launch it from this page.",
    "The final activity area can later hold an embed, launch button, or guided experience panel.",
  ],
};

export const audioStops: AudioStop[] = [
  {
    slug: "welcome-threshold",
    title: "At the Threshold",
    stopLabel: "Stop 1",
    summary: "An introduction to the exhibition's pace, access choices, and tone.",
    duration: "2 min",
    description:
      "This opening stop prepares visitors for the exhibition by framing attention, access, and emotional pacing as part of the artistic experience.",
    transcript: [
      "Welcome to the exhibition. Before moving deeper into the space, take a moment to notice your own pace.",
      "This exhibition invites multiple ways of attending: listening, reading, pausing, and returning.",
      "Access is not separate from the artwork here. It is part of the way each piece is encountered.",
    ],
  },
  {
    slug: "making-visible",
    title: "Making Visible",
    stopLabel: "Stop 2",
    summary: "A reflection on visibility, interpretation, and disability experience.",
    duration: "3 min",
    description:
      "This stop considers how people are asked to explain themselves and how art can hold what is often left unseen.",
    audioUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    transcript: [
      "Visibility is not always the same as understanding. Many disabled people are seen without being understood.",
      "The works in this section ask what becomes possible when explanation is replaced by encounter.",
      "As you move through the gallery, notice what each piece reveals on its own terms.",
    ],
  },
  {
    slug: "rest-and-return",
    title: "Rest and Return",
    stopLabel: "Stop 3",
    summary: "An audio stop about fatigue, care, and the legitimacy of pause.",
    duration: "2 min",
    description:
      "This stop frames rest not as absence from the exhibition, but as a way of being present within it.",
    transcript: [
      "You are welcome to pause here.",
      "Rest can be part of how we encounter art, memory, and each other.",
      "Returning after a pause does not interrupt the exhibition. It is one of the exhibition's intended rhythms.",
    ],
  },
];
