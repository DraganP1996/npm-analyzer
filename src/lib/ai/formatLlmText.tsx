function formatTextWithBackticks(text: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const content = part.slice(1, -1);
      return (
        <span
          key={index}
          style={{
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
            padding: "2px 4px",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        >
          {content}
        </span>
      );
    } else {
      return part;
    }
  });
}

export function formatParagraphs(text: string) {
  const splittedText = text.split(/\n{2,}/g);
  return splittedText.map((paragraph, idx) => (
    <p key={idx} style={{ marginBottom: `${splittedText.length > 1 ? "0.35rem" : "0"}` }}>
      {formatTextWithBackticks(paragraph)}
    </p>
  ));
}
