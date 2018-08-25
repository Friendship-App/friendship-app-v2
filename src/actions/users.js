import apiRoot from '../utils/api.config';
import { getPreSignedUrl } from '../utils/aws';
import { NavigationActions } from 'react-navigation';
import { refreshMyInformation } from './refresh';

export const ActionTypes = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVED: 'USERS_RECEIVED',

  USER_INFORMATION_REQUEST: 'USER_INFORMATION_REQUEST',
  USER_INFORMATION_RECEIVED: 'USER_INFORMATION_RECEIVED',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',

  UPDATE_ACCOUNT_REQUEST: 'UPDATE_ACCOUNT_REQUEST',
  UPDATE_ACCOUNT_SUCCESS: 'UPDATE_ACCOUNT_SUCCESS',

  REPORT_USER_REQUEST: 'REPORT_USER_REQUEST',
  REPORT_USER_DONE: 'REPORT_USER_DONE',

  USERS_FAILED: 'USERS_FAILED',
};

export function requestUsers(type) {
  return {
    type,
  };
}

export function receiveUsers(usersList) {
  return {
    type: ActionTypes.USERS_RECEIVED,
    usersList,
  };
}

export function receiveUserInformation(userDetails, myProfile) {
  return {
    type: ActionTypes.USER_INFORMATION_RECEIVED,
    userDetails,
    myProfile,
  };
}

export function failRequestUsers() {
  return async dispatch => {
    dispatch({
      type: ActionTypes.USERS_FAILED,
    });
  };
}

export function fetchBatchUsers(batchNumber, usersAlreadyFetched = []) {
  return async (dispatch, getState) => {
    const { auth, users } = getState();

    if (!users.isLoading) {
      dispatch(requestUsers(ActionTypes.USERS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/users/${batchNumber}`, {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            Authorization: `Bearer ${auth.data.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usersAlreadyFetched }),
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUsers(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}

export function fetchUserInformation(userId) {
  return async (dispatch, getState) => {
    const { auth, users } = getState();

    if (!users.isLoadingUserInformation) {
      dispatch(requestUsers(ActionTypes.USER_INFORMATION_REQUEST));
      try {
        const resp = await fetch(
          `${apiRoot}/users?userId=${userId ? userId : auth.data.decoded.id}`,
          {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          },
        );

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUserInformation(data, !userId));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}

export function updateUserProfile() {
  return async (dispatch, getState) => {
    const { auth, users, form } = getState();
    const formData = form.updateProfile.values;

    if (!users.isUpdatingProfile) {
      dispatch(requestUsers(ActionTypes.UPDATE_PROFILE_REQUEST));
      if (formData.image && formData.image !== formData.oldValues.image) {
        const imageData = {
          itemName: formData.username.replace(/\s/g, ''),
          imgType: formData.image.type,
          url: formData.image.uri,
        };

        await getPreSignedUrl('PROFILE', imageData)
          .then(url => {
            formData.image = url;
          })
          .catch(e => {
            console.error(e);
          });
      }

      try {
        const resp = await fetch(`${apiRoot}/users/updateProfile`, {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
          body: JSON.stringify({ ...formData }),
        });

        if (resp.ok) {
          dispatch(requestUsers(ActionTypes.UPDATE_PROFILE_SUCCESS));
          dispatch(refreshMyInformation());
          dispatch(NavigationActions.back());
        }
      } catch (e) {}
    }
  };
}

export function updateUserAccount() {
  return async (dispatch, getState) => {
    const { auth, users, form } = getState();
    const formData = form.updateAccount.values;

    if (!users.isUpdatingAccount) {
      dispatch(requestUsers(ActionTypes.UPDATE_ACCOUNT_REQUEST));

      try {
        const resp = await fetch(`${apiRoot}/users/updateAccount`, {
          method: 'POST',
          Accept: 'application/json',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
          body: JSON.stringify({ ...formData }),
        });

        if (resp.ok) {
          dispatch(requestUsers(ActionTypes.UPDATE_ACCOUNT_SUCCESS));
          dispatch(refreshMyInformation());
          dispatch(NavigationActions.back());
        }
      } catch (e) {}
    }
  };
}

export function reportUser(reason) {
  return async (dispatch, getState) => {
    const { auth, users } = getState();
    if (!users.isReporting) {
      dispatch(requestUsers(ActionTypes.REPORT_USER_REQUEST));

      try {
        const resp = await fetch(`${apiRoot}/users/report`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
          body: JSON.stringify({ userId: users.userDetails.data.id, reason }),
        });

        if (resp.ok) {
          dispatch(requestUsers(ActionTypes.REPORT_USER_DONE));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}
