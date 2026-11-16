import "server-only";
import sanitizeHtml from "sanitize-html";

const ALIGN = { "text-align": [/^(left|right|center|justify)$/] };
const COLOR = /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|inherit)$/i;

export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "mark", "span",
      "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "a", "img", "hr",
      "div", "iframe", "video",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      p: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      span: ["style"],
      mark: ["style", "data-color"],
      div: ["data-youtube-video"],
      iframe: ["src", "width", "height", "allowfullscreen", "allow", "frameborder"],
      video: ["src", "controls", "preload"],
    },
    allowedStyles: {
      p: ALIGN,
      h2: ALIGN,
      h3: ALIGN,
      h4: ALIGN,
      span: { color: [COLOR], "background-color": [COLOR] },
      mark: { color: [COLOR], "background-color": [COLOR] },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
    allowIframeRelativeUrls: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
    },
  });
}
