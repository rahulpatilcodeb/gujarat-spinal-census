import { errorHandler } from "./errorHandler";
import { jwtMiddleware } from "./apiMiddleware";
export { apiHandler };
function apiHandler(handler: any) {
  return async (req: any, res: any) => {
    try {
      if (!req.headers.authorization) {
        throw Error("jwt expired");
      }
      // global middleware
      const validatedData = jwtMiddleware(req, res);
      // route handler
      await handler(req, res, validatedData);
    } catch (err) {
      console.log("err :>> ", err);
      // global error handler
      errorHandler(err, res);
    }
  };
}
