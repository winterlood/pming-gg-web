const scope = [
  "user",
  "public_repo",
  "repo",
  "repo_deployment",
  "repo:status",
  "read:repo_hook",
  "read:org",
  "read:public_key",
  "read:gpg_key",
  "read:packages",
  "write:org",
].join(" ");

const host = "https://pminggg.web.app";

const githubHref = `
          https://github.com/login/oauth/authorize?client_id=40f478959240a18c7c53&redirect_uri=${host}/githubconnect&scope=${scope}
          `;

export const githubOAuthLink = githubHref;
