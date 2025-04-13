import { useEffect, useState } from "react";

const words = ["react", "lodash", "next", "angular"];

export const useSearchPlaceholder = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, letterIndex + 1));
        setLetterIndex((prev) => prev + 1);
        if (letterIndex + 1 === currentWord.length) {
          setIsDeleting(true);
        }
      }, 500);
    } else {
      timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, letterIndex));
        setLetterIndex((prev) => prev - 1);
        if (letterIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 150);
    }

    return () => clearTimeout(timeout);
  }, [letterIndex, isDeleting, wordIndex]);

  return placeholder;
};
