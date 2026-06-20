import { useRef, useEffect } from "react";
import katex from "katex";

export default function Tex({ tex, block = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, { throwOnError: false, displayMode: block });
    }
  }, [tex, block]);
  return <span ref={ref} />;
}

export function MixedTex({ text }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const parts = text.split(/(\$[^$]+\$)/g);
    parts.forEach((part) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        const span = document.createElement("span");
        katex.render(part.slice(1, -1), span, { throwOnError: false, displayMode: false });
        ref.current.appendChild(span);
      } else if (part) {
        ref.current.appendChild(document.createTextNode(part));
      }
    });
  }, [text]);
  return <span ref={ref} />;
}
