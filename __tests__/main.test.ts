import { getChannelId } from '../src/getChannelId';

describe('getChannelId', () => {
  it('should return the correct channelId for a pull request', () => {
    const ghContext = {
      payload: {
        pull_request: {
          head: {
            ref: 'feature/add-stuff',
          },
          number: 123,
        },
      },
    };

    const channelId = getChannelId(ghContext as any);

    expect(channelId).toBe('pr123-feature_add-stuff');
  });

  it('should return an empty string if no pull request exists', () => {
    const ghContext = {
      payload: {},
    };

    const channelId = getChannelId(ghContext as any);

    expect(channelId).toBe('');
  });

  it('should replace invalid characters in the channelId', () => {
    const ghContext = {
      payload: {
        pull_request: {
          head: {
            ref: 'feature/some@invalid',
          },
          number: 123,
        },
      },
    };

    const channelId = getChannelId(ghContext as any);

    expect(channelId).toBe('pr123-feature_some_invalid');
  });
});
