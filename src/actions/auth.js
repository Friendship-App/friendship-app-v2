
export const ActionTypes = {
  STORE_CREDENTIALS: 'STORE_CREDENTIALS',
};

export function storeCredentials(credentials) {
  return {
    type: ActionTypes.STORE_CREDENTIALS,
    credentials
  };
}