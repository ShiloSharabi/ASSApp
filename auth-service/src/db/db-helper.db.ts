
/**
 * tamplate for insert query
 * @param table table name
 * @param columns table columns 
 * @param values values to insert
 * @returns query string
 */
export const INSERT_QUERY = async (
    table: string,
    columns: string[],
    values: any[][],
) => `INSERT INTO ${table} (${await BUILD_COLUMS_STRING(columns)}) VALUES ${await BUILD_VALUES_TO_INSERT_STRING(values)};`;

/**
 * combine all columns name as one string with coma seprator
 * @param columns list of columns names
 * @returns 
 */
async function BUILD_COLUMS_STRING(
    columns: string[]
) {
    return columns.join();
}

/**
 * build from all vlues list a string for query to insert
 * @param values values to insert
 * @returns 
 */
async function BUILD_VALUES_TO_INSERT_STRING(
    values: any[][]
) {
    let valuesToSet = ''
    for(let row = 0; row < values.length; row++) {
        let vlauesToSet = ' (),';
        for(let col = 0; col < values[row].length; col++) {
            vlauesToSet = vlauesToSet.replace(
                ')', 
                vlauesToSet.includes('()') ? `'${values[row][col].toString()}')` : ` ,'${values[row][col].toString()}')`);
        }
        valuesToSet += vlauesToSet;
    }
    return valuesToSet.slice(0,-1);
}

/**
 * tamplate for select query
 * @param table table name
 * @param valueToSelect column to show
 * @param whereCondition conditions
 * @param groupBy 
 * @param orderBy 
 * @returns 
 */
export const SELECT_QUERY = async (
    table: string,
    valueToSelect: string[] = null,
    whereCondition: { col: string; operand: string; value: string }[] = null,
    groupBy: string[] = null,
    orderBy: string[] = null,
): Promise<string> => {
    let query = `SELECT ${await BUILD_COLUMS_STRING(valueToSelect)} 
                 FROM ${table} ${await BUILD_WHERE_CONDITION(whereCondition)}`;
    query += groupBy != null ? query + ` GROUP BY ${await BUILD_COLUMS_STRING(groupBy)} ` : '';
    query += orderBy != null ? query + ` ORDER BY ${await BUILD_COLUMS_STRING(orderBy)} ` : '';

    return query;
}

/**
 * build from a list of condition a where statement
 * @param whereCondition list of cinditions
 * @returns 
 */
async function BUILD_WHERE_CONDITION(
    whereCondition: { col: string; operand: string; value: string }[] = null,
): Promise<string> {
    if(whereCondition == null) return '';
    let whereStatement = 'WHERE'
    for(const condition of whereCondition) {
        whereStatement += ` ${condition.col} ${condition.operand} '${condition.value}' AND`;
    }
    return whereStatement.slice(0,-3);
}

/**
 * tamplate for update query
 * @param table table name
 * @param columnsToUpdate columns to update 
 * @param valueToUpdate new values to set
 * @param whereCondition 
 * @returns 
 */
export const UPDATE_QUERY = async (
    table: string,
    columnsToUpdate: string[],
    valueToUpdate: string[],
    whereCondition: { col: string; operand: string; value: string }[] = null,
) => `UPDATE ${table} SET ${await BUILD_SET_COL_VAL_STRING(columnsToUpdate, valueToUpdate)} ${await BUILD_WHERE_CONDITION(whereCondition)}`;

/**
 * building a set statement for columns and new values to set 
 * @param columnsToUpdate columns to update
 * @param valueToUpdate new values to set
 * @returns 
 */
async function BUILD_SET_COL_VAL_STRING(
    columnsToUpdate: string[],
    valueToUpdate: string[],
) {
    let setStatement = ''
    for(let i = 0; i < columnsToUpdate.length; i++) {
        if(i != 0) {setStatement += ', '}
        setStatement += `${columnsToUpdate[i]} = ${valueToUpdate[i]}`
    }
    return setStatement;
}

/**
 * tamplate for delete query
 * @param table table name
 * @param columnsToUpdate columns to update 
 * @param valueToUpdate new values to set
 * @param whereCondition 
 * @returns 
 */
export const DELETE_QUERY = async (
    table: string,
    whereCondition: { col: string; operand: string; value: string }[] = null,
) => `DELETE FROM ${table} ${await BUILD_WHERE_CONDITION(whereCondition)}`;