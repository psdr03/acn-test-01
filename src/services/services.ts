import axios from 'axios';
import * as CONSTANTS from '../constants/constants';

export const getItemDescription = async () => {
    const res = await axios({
        url: CONSTANTS.url,
        method: CONSTANTS.get
    })
    const sliced = res.data.slice(0, 5)
    return sliced;
}