const getData = function (URL,onSucces,onError) {
  fetch(`${URL  }/data`)
    .then((response) => response.json())
    .then((data) => {
      onSucces(data);
    }).catch(() => {
      onError();
    });
};

const setData = function (URL,onSuccess,onError,data) {
  fetch(URL,
    {
      method: 'POST',
      body: data,
      type:'multipart/form-data',
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess('Success');
    }
    else {
      onError('Error');
    }
  })
    .catch(() => {
      onError('Error');
    });
};

export {getData,setData};
