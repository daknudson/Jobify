import { StatusCodes } from "http-status-codes";


class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export { CustomAPIError };
