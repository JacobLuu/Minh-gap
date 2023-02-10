import type { StatusResponse } from '../Responses';

export function isStatusResponse(
  response: StatusResponse,
): response is StatusResponse {
  return (response as StatusResponse).message !== undefined;
}
