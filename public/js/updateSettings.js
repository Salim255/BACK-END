//updateDate
import axios from 'axios';
import { showAlert } from './alert';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      //axios return a promis, and when ever there are an error axios will throght the error
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'Success') {
      showAlert('success', 'Data updated successfully!');
      window.setTimeout(() => {
        location.assign('/'); //We use this in order to load another page
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
