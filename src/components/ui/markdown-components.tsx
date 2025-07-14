/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const MarkdownComponents = {
  h1: ({ node, ...props }: any) => <h1 className="text-xl font-bold my-4" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-lg font-semibold my-3" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-lg font-medium my-2" {...props} />,
  p: ({ node, ...props }: any) => <p className="text-sm leading-relaxed my-2" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="list-disc list-inside my-2 pl-4" {...props} />,
  li: ({ node, ...props }: any) => <li className="mb-1" {...props} />,
  a: ({ node, ...props }: any) => (
    <a className="text-blue-600 underline hover:text-blue-800" target="_blank" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    return (
      <code className="bg-gray-100 text-sm px-1 py-0.5 rounded font-mono" {...props}>
        {children}
      </code>
    );
  },
};
