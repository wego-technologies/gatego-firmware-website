// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Octokit } from "@octokit/rest";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pid = req.query["id"].toString();
  var repo = req.query["repo"].toString();

  if (repo == null) {
    repo = "gatego-Unified";
  }

  if (repo != "gatego-Unified" && repo != "gatego-unified-screen") {
    res.status(403).send("Forbidden");
    return;
  }

  const octokit = new Octokit({
    auth: process.env.GH_TOKEN
  });

  const data = await octokit.rest.repos.getReleaseAsset({
    owner: "wego-technologies",
    repo: repo,
    asset_id: parseInt(pid),
    headers: { "Accept": "application/octet-stream" },
  })

  if (data.status == 200) {
    res.setHeader("Content-Type", "application/octet-stream");
    res.status(301).redirect(data.url);
  } else {
    res.status(500).send("Internal Server Error")
  }

}
