
/**
 * http statuses code for api response
 */
export enum HTTP_SATUS_CODE {

    //2xx success
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    //4xx client errors
    BED_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    CONFLICT = 409,

    //5xx server errors
    INTERNAL_SERVER_ERROR = 500,
}