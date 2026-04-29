export type ProcessItem = {
  imageUrl: string;
  visualDescription: string;
  audioUrl?: string;
};

export type Artist = {
  slug: string;
  name: string;
  affiliation: "Student" | "Staff";
  title: string;
  medium: string;
  mainArtworkUrl?: string;
  statement: string;
  pieceVisualDescription: string;
  processItems: ProcessItem[];
  processLabel?: string;
  artworkAudioUrl?: string;
  additionalTextAudioUrl?: string;
  poemEmbedUrl?: string;
  poemSourceUrl?: string;
  poemText?: string;
  poemAudioUrl?: string;
  webglEmbedUrl?: string;
  webglOpenUrl?: string;
  creationNotes?: string;
  creationNotesLabel?: string;
  interactionStatement?: string;
  interactionAudioUrl?: string;
  externalLinks?: Array<{ label: string; href: string }>;
};

function asset(path: string) {
  const key = `../../project_details/${path}`;
  const resolved = mediaAssets[key];

  return typeof resolved === "string" ? resolved : "";
}

const mediaAssets = import.meta.glob(
  "../../project_details/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,wav,mp3,m4a}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

export const exhibitionTitle = "Cripping Time Across Realities";

export const artists: Artist[] = [
  {
    slug: "chase-and-connor",
    name: "Chase and Connor",
    affiliation: "Student",
    title: "An Ode to Wikipedia",
    medium: "Digital poem",
    mainArtworkUrl: asset("Chase and Connor/Screenshot 2026-04-22 at 10.38.31 AM.png"),
    statement:
      "For as long as we can remember, we have been obsessed with Wikipedia, reading at least one article a day for most of our lives. This unique obsession is partially driven by our experiences as brothers with cerebral palsy because Wikipedia offers us an accessible outlet to learn quickly and on our own time in a standard format. These and many other aspects have made Wikipedia an ideal learning environment as we have learned to thrive with our disabilities. Furthermore, Wikipedia has enriched our view of disability one page at a time by showing us the commonness of rarity. Just as crip time centers on bending time to one's life, Wikipedia has allowed us to bend our learning environment around us.",
    pieceVisualDescription:
      "A poem that resembles a Wikipedia page, with black font on a white background and names are hyperlinked to referenced individuals' Wikipedia pages.",
    processItems: [
      {
        imageUrl: asset("Chase and Connor/Photo 1 + Visual Description/Zoom_Photo.png"),
        visualDescription:
          "Screenshot of a Zoom call between Chase and Connor. Both have short blond hair and wear glasses, and both rest their chins on a fist.",
        audioUrl: asset(
          "Chase and Connor/Photo 1 + Visual Description/Process Photo - Chase and Connor.m4a"
        ),
      },
    ],
    processLabel: "Below are photos the artist selected to represent their art piece's creation process.",
    artworkAudioUrl: asset("Chase and Connor/Art Piece Info - Chase and Connor.m4a"),
    interactionStatement:
      "This piece is interactive. Please click the hyperlinks embedded in the poem and explore the Wikipedia pages.",
    interactionAudioUrl: asset("Chase and Connor/Interaction/Interaction - Chase and Connor.m4a"),
    poemAudioUrl: asset("Chase and Connor/NOT process - art piece/Poem - Chase and Connor.m4a"),
    poemEmbedUrl:
      "https://docs.google.com/presentation/d/1Ybhnyq8pYj0UKgSAY_IuvJHCHCMNslvR/embed?start=false&loop=false&delayms=5000",
    poemSourceUrl:
      "https://docs.google.com/presentation/d/1Ybhnyq8pYj0UKgSAY_IuvJHCHCMNslvR/edit?usp=sharing&ouid=100911116206901461371&rtpof=true&sd=true",
    externalLinks: [
      {
        label: "Poem text slide",
        href: "https://docs.google.com/presentation/d/1Ybhnyq8pYj0UKgSAY_IuvJHCHCMNslvR/edit?usp=sharing&ouid=100911116206901461371&rtpof=true&sd=true",
      },
    ],
  },
  {
    slug: "andria-crowjoy",
    name: "Andria Crowjoy",
    affiliation: "Staff",
    title: "Time Outside Reality",
    medium: "Acrylic on canvas",
    mainArtworkUrl: asset("Andria Crowjoy/IMG_2580.JPG"),
    statement:
      "In crip time, we reimagine what can happen when we honor our bodies' and minds' true relationship with time, stepping outside society's rigid expectations into something more honest and intrinsic. With ADHD and stroke-related time blindness, I navigate daily life by forcing awareness of time's passage and anchoring myself to routines that mark moments. This piece is one created over four days snowed in at the Constance Saltonstall Foundation for the Arts retreat space. Isolated in the studio, with only grey light and the rhythm of painting, sleeping, and eating, I discovered what time feels like when it belongs to me and truly recognized the tyranny of normative time. Taking four days away to paint feels like an act of defiance and a declaration that time, sometimes, can be suspended. This still life captures a moment of freedom from the expectations to keep time. Painted over a 15-year-old canvas, the visible layers beneath remind me that my past self is always with me and that creating something tangible holds time in a way I could not keep otherwise.",
    pieceVisualDescription:
      "Acrylic painting showing a studio corner with a bright blue rolling cart or table holding various containers and jars in greens and teals. A broom with a dark handle rests against the cart. The background is painted in light warm tones with an underlying painting peeking through.",
    processItems: [
      {
        imageUrl: asset("Andria Crowjoy/Photo 1 + Audio Tour/20260126_102533.jpg"),
        visualDescription:
          "A long studio with a white tile floor and a ceiling made of light brown planks. The room is filled with tables, paint supplies, and easels. A tarp is laid out on part of the floor. Outside the window, snow coats the ground and tree branches.",
        audioUrl: asset("Andria Crowjoy/Photo 1 + Audio Tour/Process Photo 1 - Andria.m4a"),
      },
      {
        imageUrl: asset("Andria Crowjoy/Photo 2 + Audio Tour/20260126_145822.jpg"),
        visualDescription:
          "A room filled with colorful paintings lining the floors and propped against a wooden easel, which sits atop a paint-splattered tarp.",
        audioUrl: asset("Andria Crowjoy/Photo 2 + Audio Tour/Process Photo 2 - Andria.m4a"),
      },
      {
        imageUrl: asset("Andria Crowjoy/Photo 3 + Audio Tour/20260126_160115-EDIT.jpg"),
        visualDescription:
          "A table full of snacks, medicine, and nutritional supplements beside a snowy window.",
        audioUrl: asset("Andria Crowjoy/Photo 3 + Audio Tour/Process Photo 3 - Andria.m4a"),
      },
      {
        imageUrl: asset("Andria Crowjoy/Photo 4 + Audio Tour/20260126_160118-EDIT.jpg"),
        visualDescription:
          "A wider perspective of the snack, medicine, and supplement table that includes more snowy window, cleaning supplies, and an easel with a yellow painting of a bird on it.",
        audioUrl: asset("Andria Crowjoy/Photo 4 + Audio Tour/Process Photo 4 - Andria.m4a"),
      },
      {
        imageUrl: asset("Andria Crowjoy/Photo 5 + Audio Tour/20260127_121011.jpg"),
        visualDescription:
          "A room filled with paintings propped against an easel and various surfaces. Outside the windows, barren branches and snowy ground intermingle.",
        audioUrl: asset("Andria Crowjoy/Photo 5 + Audio Tour/Process Photo 5 - Andria.m4a"),
      },
    ],
    processLabel: "Below are photos the artist selected to represent their art piece's creation process.",
    artworkAudioUrl: asset("Andria Crowjoy/Art Piece Info - Andria.m4a"),
    additionalTextAudioUrl: asset("Andria Crowjoy/Additional Text (link)/Additional Text - Andria.m4a"),
    creationNotesLabel: "Additional Notes from the Creation Process",
    creationNotes:
      "Retreat space where this piece was created: https://www.saltonstall.org/retreat/retreat-space/",
    interactionStatement: "Physical interaction with this piece is optional.",
    interactionAudioUrl: asset("Andria Crowjoy/Interaction/Andria - Interaction.m4a"),
  },
  {
    slug: "daniel-enriquez",
    name: "Daniel Enriquez",
    affiliation: "Student",
    title: "Brain Drain",
    medium: "Virtual reality",
    mainArtworkUrl: asset("Daniel Enriquez/Art Piece - Daniel.png"),
    statement:
      "This project showcases my capacity for attention as it is strictly anointed by an arbitrary decision making process of what is important. I will easily spend significant periods of time in things I am obsessed with but struggle to do anything if I do not have that level of interest or gauge of importance. I wanted to showcase this envelopment of time of me living with ADHD through VR so the user can also feel this envelopment in relation to interest.",
    pieceVisualDescription:
      "You are located in a room resembling the inside of a human brain. The room is about 15 feet wide and circular, with pink wrinkled walls. In front of you are 4 spheres arranged in a two by two grid: blue, red, green, and yellow. As you face a sphere, the room spreads rapidly into that color, with the rate influenced by current color dominance.",
    processItems: [
      {
        imageUrl: asset("Daniel Enriquez/Photo 1 + Audio Tour/39beec9a-be2d-480b-9c1f-8d0460b79b3d.png"),
        visualDescription:
          "A screenshot of a beta version of Brain Drain in the Unity game engine editor. The central scene view displays four colored half-spheres, red, blue, green, and yellow, in a dark environment with textured pinkish shapes. The hierarchy lists scene objects including XR Origin, Spheres, and brain_creature. The project panel shows a Materials folder with brightly colored assets.",
        audioUrl: asset("Daniel Enriquez/Photo 1 + Audio Tour/BDAltText.wav"),
      },
    ],
    processLabel: "Below are photos the artist selected to represent their art piece's creation process.",
    artworkAudioUrl: asset("Daniel Enriquez/Art Piece Audio Tour/bdaud2.wav"),
    webglEmbedUrl: "/brain-drain-webgl/index.html",
    webglOpenUrl: "/brain-drain-webgl/index.html",
    interactionStatement:
      "This piece is interactive and takes place inside a VR headset. An RA will assist you in and out of the headset.",
    interactionAudioUrl: asset("Daniel Enriquez/Interaction/Interaction - Daniel.m4a"),
  },
  {
    slug: "alison-fromme",
    name: "Alison Fromme",
    affiliation: "Staff",
    title: "This is not a frame",
    medium: "Wood, paper, and rocks",
    mainArtworkUrl: asset("Alison Fromme/IMG_2584.JPG"),
    statement:
      "In this work, I consider possibilities and constraints related to the concept of the frame. Using a familiar object, the picture frame, I question whether it is a container or a window. A frame can capture a single moment in time, as in a still life. It can be an aperture through which we view something happening. It can hold a mirror. I invite viewers to ask, How does a frame help or hinder our understanding of time and experience? And what belongs in a frame, anyway? Certainly not a rock.",
    pieceVisualDescription:
      "A picture frame is nested inside another picture frame. Inside the open frames, rocks are suspended on strings. Surrounding the frame is a pile of rocks, a few covered in tissue paper colored white, purple, and green.",
    processItems: [],
    artworkAudioUrl: asset("Alison Fromme/Art Piece Info - Alison.m4a"),
    poemText: `"This is not a frame"
 
Instead it is a slew 
of symptoms.
 
A pile of rocks
to trip over, pick over, tuck into a pocket,
to kick down the road
to weigh in the hollow of a hand, or hands,
to hurl at a window
or a mirror.
 
Instead it is
sharp edges, 
specks of color, 
glints of light
formed 
over time
under heat and pressure
settling into an unsettled landscape.`,
    poemAudioUrl: asset("Alison Fromme/Additional Text/Additional Text - Alison.m4a"),
    creationNotesLabel: "Poem",
    interactionStatement:
      "This piece is interactive. Feel free to pick up -- or take -- a small rock from the pile. Please do not touch the frames or the bigger rocks attached to them. Thank you!",
    interactionAudioUrl: asset("Alison Fromme/Interaction/Alison - Interaction.m4a"),
  },
  {
    slug: "gillian-gomer",
    name: "Gillian Gomer",
    affiliation: "Student",
    title: "Automatic Behavior",
    medium: "Mixed media",
    mainArtworkUrl: asset("Gillian Gomer/IMG_2566.JPG"),
    statement:
      "My project showcases the oddities of a lesser known symptom of narcolepsy. My disorder is autoimmune: my body attacks the neurological compounds that regulate sleep so I am constantly trying to resist being asleep or awake during the wrong times. When I fail, I experience microsleep, where I simultaneously go through REM while appearing somewhat functional to others. In my work I showcase different forms of my automatic behaviors, with emphasis on how it presents in my education. I chose a mixed media collage approach to collect the unique symptoms and situations I face everyday into one all-encompassing disorder. Time is unclear across focal points, which mimics how I often perceive memories in disjointed segments, adding or subtracting pieces gained or lost during microsleep. I include reflections on how my disorder impacts decisions in daily life which often requires planning ahead to accommodate the unpredictable.",
    pieceVisualDescription:
      "A mixed media collage on a roughly 2 by 4 foot cardboard slab. Samples of class notes over 10 years shift from neat and legible handwriting to scribbled and unintelligible text. Visuals detail mitigation attempts, highlighted experiences, and diagnosis and treatment insights.",
    processItems: [
      {
        imageUrl: asset("Gillian Gomer/1. Photo 1 Group + Audio Tour/IMG_4582.jpeg"),
        visualDescription:
          "Gridded notebook paper with quickly jotted down visual and written ideas, ranging from memory display concepts to interactive pieces for audience engagement.",
        audioUrl: asset(
          "Gillian Gomer/1. Photo 1 Group + Audio Tour/Process Photo 1 - Gillian.m4a"
        ),
      },
      {
        imageUrl: asset("Gillian Gomer/1. Photo 1 Group + Audio Tour/IMG_4583.jpeg"),
        visualDescription:
          "Gridded notebook paper with quickly jotted down visual and written ideas, ranging from memory display concepts to interactive pieces for audience engagement.",
        audioUrl: asset(
          "Gillian Gomer/1. Photo 1 Group + Audio Tour/Process Photo 1 - Gillian.m4a"
        ),
      },
      {
        imageUrl: asset("Gillian Gomer/1. Photo 1 Group + Audio Tour/IMG_4584.jpeg"),
        visualDescription:
          "Gridded notebook paper with quickly jotted down visual and written ideas, ranging from memory display concepts to interactive pieces for audience engagement.",
        audioUrl: asset(
          "Gillian Gomer/1. Photo 1 Group + Audio Tour/Process Photo 1 - Gillian.m4a"
        ),
      },
      {
        imageUrl: asset("Gillian Gomer/2. Photo 2 Group + Audio Tour/IMG_4550.jpeg"),
        visualDescription:
          "Gillian working on her project amid a chaotic arrangement of art supplies across her living room, removing pieces as she changes her color scheme.",
        audioUrl: asset(
          "Gillian Gomer/2. Photo 2 Group + Audio Tour/Process Photo 2 - Gillian.m4a"
        ),
      },
      {
        imageUrl: asset("Gillian Gomer/2. Photo 2 Group + Audio Tour/IMG_4567.jpeg"),
        visualDescription:
          "Gillian working on her project amid a chaotic arrangement of art supplies across her living room, removing pieces as she changes her color scheme.",
        audioUrl: asset(
          "Gillian Gomer/2. Photo 2 Group + Audio Tour/Process Photo 2 - Gillian.m4a"
        ),
      },
    ],
    processLabel: "Below are photos the artist selected to represent their art piece's creation process.",
    artworkAudioUrl: asset("Gillian Gomer/Art Piece Info - Gillian.m4a"),
    interactionStatement: "This piece is interactive. Feel free to flip through the notebooks.",
    interactionAudioUrl: asset("Gillian Gomer/Interaction/Interaction - Gillian.m4a"),
    additionalTextAudioUrl: asset("Gillian Gomer/3. Additional Text/Additional Text - Gillian.m4a"),
    creationNotesLabel: "Additional Notes from the Creation Process",
    creationNotes:
      "I initially left the call for art pieces in my inbox for a few days, unsure whether I could invest the time to make something that felt like me. I eventually chose to do it as a self-motivator. Art used to be central to my life, but perfectionism became my enemy, and I stopped creating to avoid disappointment. Big ideas swarmed for months while I delayed starting because I wanted a perfect plan. After years of dismissal before diagnosis, I still question the legitimacy of my own experience. In the end I spent three days panicking on my couch before deciding to trust the process, make a mess, and let imperfection show.",
  },
  {
    slug: "ria-gualano",
    name: "Ria Gualano",
    affiliation: "Student",
    title: "Beach Hat",
    medium: "Upcycled denim, hospital gown, wire",
    mainArtworkUrl: asset("Ria Gualano/IMG_2593.JPG"),
    statement:
      "Beach Hat is a textile-based diary entry comprised of hospital gown and upcycled denim. The reimagined materials signify the merging of Crohn's Disease into my daily life. They reflect on consequential memories that weave in and out of my present experiences, triggered by certain spaces, sounds, objects, and emotions. The piece began as a recreation of a memory anchored in a specific textile: the floppy hat that shielded my eyes from the sun while I endured waves of pain on a beach. Then, I cut, merged, and sewed, refining certain seams and letting other jagged stitches remain bold. The process of creation reconciled parts of myself that healed invisibly with those immortalized in visible scars. Still other emotional scars I left raw and exposed, such as the inverted seams around the hat's crown. I invite viewers to physically trace the scars sewn into the hat and consider the temporality of their own visible and invisible, healed and ever-negotiating scars.",
    pieceVisualDescription:
      "A patchwork floppy hat comprised of denim squares, inverted seams, and scar-like trails of thread. It moves from denim-only top to mostly hospital gown fabric under the brim.",
    processItems: [
      {
        imageUrl: asset("Ria Gualano/Photo 1 + Audio Tour/Screenshot_20260421_002325_Instagram.jpg"),
        visualDescription:
          "A selfie of Ria, a woman with long dark brown hair, lying on a beach. She wears a pink dress with flowers, a blue straw hat, and a serious expression. A blue towel in sand forms the background beneath her.",
        audioUrl: asset("Ria Gualano/Photo 1 + Audio Tour/Process Photo 1 - Ria.m4a"),
      },
      {
        imageUrl: asset("Ria Gualano/Photo 2 + Audio Tour/20250224_200306.jpg"),
        visualDescription:
          "A self-portrait of Ria wearing her patchwork denim and hospital gown hat. She tips the brim out of her eyes with one hand, staring into the camera with a serious expression.",
        audioUrl: asset("Ria Gualano/Photo 2 + Audio Tour/Process Photo 2 - Ria.m4a"),
      },
      {
        imageUrl: asset("Ria Gualano/Photo 3 + Audio Tour/20250129_015444.jpg"),
        visualDescription:
          "Materials from the creation process of Beach Hat, including inverted seams sewn into rectangular panels, layered half-circle and smaller circle denim and hospital-gown patches, a pink cutting board, and a sewing machine. A pile of denim jeans and hospital gowns sits below.",
        audioUrl: asset("Ria Gualano/Photo 3 + Audio Tour/Process Photo 3 - Ria.m4a"),
      },
      {
        imageUrl: asset("Ria Gualano/Photo 4 + Audio Tour/20250131_012236.jpg"),
        visualDescription:
          "The brim of Beach Hat before fitting to the pattern, sitting on carpet beside circular pattern paper.",
        audioUrl: asset("Ria Gualano/Photo 4 + Audio Tour/Process Photo 4 - Ria.m4a"),
      },
      {
        imageUrl: asset("Ria Gualano/Photo 5 + Audio Tour/20250128_231850.jpg"),
        visualDescription:
          "Patches of denim in different shades layered during hat creation, resting on the pink cutting board beside the sewing machine.",
        audioUrl: asset("Ria Gualano/Photo 5 + Audio Tour/Process Photo 5 - Ria.m4a"),
      },
      {
        imageUrl: asset("Ria Gualano/Photo 6 + Audio Tour/20250120_210208.jpg"),
        visualDescription:
          "The legs of nine pairs of denim jeans fanned from dark to light shades.",
        audioUrl: asset("Ria Gualano/Photo 6 + Audio Tour/Process Photo 6 - Ria.m4a"),
      },
    ],
    processLabel: "Below are photos the artist selected to represent their art piece's creation process.",
    artworkAudioUrl: asset("Ria Gualano/Art Piece Info - Ria.m4a"),
    interactionStatement:
      "This piece is interactive. Feel free to touch. If you'd like, you may take the hat off the mannequin head. When you are done interacting, please return the hat to the mannequin. It is alright if the hat does not sit exactly as it did before.",
    interactionAudioUrl: asset("Ria Gualano/Interaction/Interaction - Ria.m4a"),
  },
  {
    slug: "vico-vecchiotti",
    name: "Vico Vecchiotti",
    affiliation: "Staff",
    title: "Uphill/Downhill",
    medium: "Embroidery and applique on cotton",
    mainArtworkUrl: asset("Vico Vecchiotti/IMG_2636.JPG"),
    statement:
      "The green lines represent routes I take often to and from work, to and from my cardiologist and physical therapist, and to and from the ER, while the white lines represent a partial topographic map of the area. Since I cannot drive, I am beholden to bus schedules, walking, or rideshare apps. Though I only live a five-minute drive from work, my commute is usually between 30 and 45 minutes, or five minutes but at significant cost. Getting anywhere takes longer and uses more energy, or else costs more money, and I still end up exhausted and lose more time recovering.",
    pieceVisualDescription:
      "Dark green patterned fabric with thick lines embroidered in light green and thin topographic lines embroidered in white, with beads and rhinestones attached.",
    processItems: [
      {
        imageUrl: asset("Vico Vecchiotti/Photo 1 + Audio Tour/unnamed.jpg"),
        visualDescription:
          "Dark green patterned fabric with thick lines embroidered in light green and thin topographic lines embroidered in white. A woven couch peeks out from the background.",
        audioUrl: asset("Vico Vecchiotti/Photo 1 + Audio Tour/Photo 1 - Vico.m4a"),
      },
      {
        imageUrl: asset("Vico Vecchiotti/Photo 2 + Audio Tour/Picture3.jpg"),
        visualDescription:
          "A hand holds up dark green patterned fabric with thick lines embroidered in light green and thin topographic lines embroidered in white. A woven couch and pillow lie underneath in the background.",
        audioUrl: asset("Vico Vecchiotti/Photo 2 + Audio Tour/Photo 2 - Vico.m4a"),
      },
      {
        imageUrl: asset("Vico Vecchiotti/Photo 3 + Audio Tour/Picture1.jpg"),
        visualDescription:
          "An unfolded napkin sitting atop the patterned fabric with thick lines embroidered in dark red and thin topographic lines embroidered in white. A long piece of white thread sticks out from a topographic line in-progress.",
        audioUrl: asset("Vico Vecchiotti/Photo 3 + Audio Tour/Photo 3 - Vico.m4a"),
      },
    ],
    processLabel: "Below are photos the artist selected to represent their art piece's creation process.",
    artworkAudioUrl: asset("Vico Vecchiotti/Art Piece Info - Vico.m4a"),
    additionalTextAudioUrl: asset("Vico Vecchiotti/Additional Text/Additional Text - Vico.m4a"),
    creationNotesLabel: "Additional Notes from the Creation Process",
    creationNotes:
      "Embroidery can be incredibly tedious, which is part of why I chose it as my medium: Traveling to and from the same few places every day is also very tedious. For my travel routes I used the backstitch, which is a very wasteful stitch. You use twice as much thread traveling the same distance, much like moving while disabled uses more energy.",
    interactionStatement: "This piece is interactive. Feel free to touch.",
    interactionAudioUrl: asset("Vico Vecchiotti/Interaction/Interaction - Vico.m4a"),
  },
];

export function getArtistBySlug(slug: string) {
  return artists.find((artist) => artist.slug === slug);
}
