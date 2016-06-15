var Util:any = {};

Util.handleError = function handleError(res:any, statusCode:number = 500) {
  return (err) => {
    res.status(statusCode).send(err);
  };
};

Util.validationError = function validationError(res:any, statusCode:number = 422) {
  return (err:Error) => {
    console.log('validationError', err, err.stack);
    res.status(statusCode).json(err);
  }
};

export default Util;


