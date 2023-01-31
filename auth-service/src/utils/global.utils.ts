
/**
 * create values list to set
 * @param object obect values
 * @param addValues additional values to set
 * @returns 
 */
export async function GET_VALUE_LIST_TO_SET(
    object: any,
    addValues: any[]
): Promise<any[][]> {      
    let valuesToSet: any[][] = [];
    valuesToSet.push(Object.values(object));
    valuesToSet[0] = valuesToSet[0].concat(addValues);
    return valuesToSet;
}