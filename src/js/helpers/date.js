import { format} from 'date-fns';
/**
 *
 * @param {String} str date
 * @param {String} type 'yyyy.mm.dd'
 */
export function formatDate(str,type){
  const date = new Date(str);
  return format(date,type)
}