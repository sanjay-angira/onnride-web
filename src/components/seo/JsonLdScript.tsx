interface JsonLdScriptProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
