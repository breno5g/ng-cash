import { vitest } from "vitest";

const  mockRequest = () => {
  const req = {} as any;
  req.body = vitest.fn().mockReturnValue(req);
  req.params = vitest.fn().mockReturnValue(req);
  req.headers = vitest.fn().mockReturnValue(req);
  return req;
};

const  mockResponse = () => {
  const res = {} as any;
  res.send = vitest.fn().mockReturnValue(res);
  res.status = vitest.fn().mockReturnValue(res);
  res.json = vitest.fn().mockReturnValue(res);
  return res;
};
const  mockNext = () => vitest.fn() as any;
const  mockError = () => vitest.fn() as any;

export { mockError,mockNext,mockRequest,mockResponse }