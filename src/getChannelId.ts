import { Context } from "@actions/github/lib/context";

export function getChannelId(ghContext: Context) {
  let channelId: string = "";

  if (ghContext.payload.pull_request) {
    const branchName = ghContext.payload.pull_request.head.ref.substr(0, 20);
    channelId = `pr${ghContext.payload.pull_request.number}-${branchName}`;
  }

  // Channel IDs can only include letters, numbers, underscores, hyphens, and
  // periods.
  const invalidCharactersRegex = /[^a-zA-Z0-9_\-\.]/g;
  const correctedChannelId = channelId.replace(invalidCharactersRegex, "_");
  if (correctedChannelId !== channelId) {
    console.log(
      `ChannelId "${channelId}" contains unsupported characters. ` +
      `Using "${correctedChannelId}" instead.`
    );
  }

  return correctedChannelId;
}
