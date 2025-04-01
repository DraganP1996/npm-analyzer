export const extractGitHubRepo = (url: string): { owner: string; repo: string } | undefined => {
  const match = url.match(/github\.com[:/](.+?)\/(.+?)(\.git)?$/);
  if (!match) return undefined;

  const [, owner, repo] = match;
  return { owner, repo };
};
