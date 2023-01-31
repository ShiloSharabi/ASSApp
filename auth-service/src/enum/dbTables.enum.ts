
/**
 * db tables name
 */
export enum TABLE {
    USERS = 'users',
    ORGANIZATIONS = 'organizations'
}

/**
 * db table primary key
 */
export enum TABLE_PK {
    USERS = 'id',
    ORGANIZATIONS = 'id',
}

/**
 * organization columns
 */
export enum ORGANIZATIONS {
    ID = 'id',
    ORG_NAME = 'org_name',
    ORG_PRODUCT = 'org_product',
    ORG_EMAIL = 'org_email',
    APPROVED = 'approved'
}

/**
 * users columns
 */
export enum USERS {
    ID = 'id',
    USER_EMAIL = 'user_email',
    USER_PASSWORD = 'user_password',
    USER_FIRST_NAME = 'user_first_name',
    USER_LAST_NAME = 'user_last_name',
    USER_ROLE = 'user_role',
    USER_ORG = 'user_org',
    APPROVED = 'approved'
}

/**
 * db tables columns names
 */
export enum TABLE_COLUMNS {
    USERS = 'user_email,user_password,user_first_name,user_last_name,user_role,user_org',
    ORGANIZATIONS = 'org_name,org_product,org_email,approved'
}