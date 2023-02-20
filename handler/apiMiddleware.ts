export { jwtMiddleware };
import jwt from "jsonwebtoken";
function jwtMiddleware(req: any, res: any) {
  //   const token = req.headers.authorization.split("Bearer ")[1];
  const token = req.headers.authentication;
  const validated = jwt.verify(token, "loginapi");
  return validated;
}
