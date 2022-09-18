export const POST_UNIT = 'POST_UNIT';

export const postUnit = (payload, onSuccess, onError) => {
  return {
    type: POST_UNIT,
    payload,
    onSuccess,
    onError
  };
};
