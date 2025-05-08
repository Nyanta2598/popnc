import { defaultTheme, defineUserConfig } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { searchPlugin } from "@vuepress/plugin-search";
import { getDirname, path } from "@vuepress/utils";
import { glob } from "glob";

const sortOrder = [
  "disclaimer",
  "noun",
  "pronouns",
  "verb",
  "adjectives",
  "adverbs",
  "preposition",
  "tenses",
  "passive and active voices",
  "period",
  "comma",
  "question mark",
  "exclamation mark",
  "hyphen and dashes",
  "semicolon",
  "ellipsis",
  "parenthesis",
  "apostrophe",
  "subject verb agreement",
  "modals",
  "articles",
  "sentence diagramming",
  "vocabulary"
];

let grammarList = glob
  .sync("docs/grammar/**/index.md", { ignore: ["docs/grammar/index.md"] })
  .map((f) => path.basename(path.dirname(f)))
  .sort((a, b) => {
    const aIndex = sortOrder.indexOf(a);
    const bIndex = sortOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b); // Both not in sortOrder
    if (aIndex === -1) return 1; // a goes after b
    if (bIndex === -1) return -1; // a goes before b
    return aIndex - bIndex; // Both in sortOrder
  })
  .map((folder) => `/grammar/${folder}/`);


import { description } from "../../package.json";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: "en-US",
  // Global title in HTML <head>.
  // If page has title (in frontmatter) or h1 then: <page title/h1> | <global title>
  // e.g <title>Vuepress-DecapCMS-Netlify | VueDN</title>
  title: "PoPNC",
  // Global description in in HTML <head>.
  // If page has description (in frontmatter) then: <global description is replaced by <page description>
  // <meta name="description" content="...">
  description: description,
  head: [
    [
      "script",
      {
        src: "https://identity.netlify.com/v1/netlify-identity-widget.js",
      },
    ],
  ],

  // theme and its config
  theme: defaultTheme({
    // logo: "vue.png",
    // notFound: ["There's nothing here. If you're looking for DecapCMS, manually enter `/admin` to the root site path to navigate directly to it."],
    notFound: ["There's nothing here. "],
    navbar: [
      {
        text: "Grammar",
        children: grammarList.map((link) => {
          const name = link.split("/").filter(Boolean).pop();
          return {
            text: name.charAt(0).toUpperCase() + name.slice(1), 
            link,
          };
        }),
      },
      {
        text: "About Us",
        link: "/about/",
      },

      // {
      //   text: "Using this template",
      //   link: "/template/",
      // },
      // {
      //   text: "GitHub",
      //   link: "https://github.com/NdagiStanley/VueDN",
      // },
    ],
    // notice there's a difference between /songs and /songs/
    // We have the /songs to enable this sidebar for /songs and /songs/ paths
    sidebar: {
      "/grammar": [
        {
          text: "Grammar",
          children: grammarList,
        },
      ],
    },
  }),

  // Replace footer
  alias: {
    "@theme/HomeFooter.vue": path.resolve(
      __dirname,
      "./components/MyHomeFooter.vue"
    ),
  },

  // plugin
  plugins: [
    registerComponentsPlugin({
      // options
      // Absolute path to the components directory
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    searchPlugin({
      // options
      // Default shortcut is key '/'
    }),
  ],
});
