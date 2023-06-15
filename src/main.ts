import * as core from '@actions/core';
import { context } from "@actions/github";
import { getChannelId } from './getChannelId';

async function run(): Promise<void> {
  try {
    // debug is only output if you set the
    // secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Calculating channelID`);
    const channelId = getChannelId(context);
    core.debug(`channelID: ${channelId}`);
    core.setOutput('channelID', channelId)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
  }
}

run()
