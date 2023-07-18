import useAnalyticsStore from '../analytics';

describe('useAnalyticsStore', () => {
  const initialState = useAnalyticsStore.getState();

  beforeEach(() => {
    useAnalyticsStore.setState(initialState);
  });

  it('should create store', () => {
    const state = useAnalyticsStore.getState();
    expect(state).toStrictEqual(initialState);
  });
});
