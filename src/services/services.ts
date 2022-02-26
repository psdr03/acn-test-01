import axios, { AxiosResponse } from 'axios';
import * as CONSTANTS from '../constants/constants';
import { IForm, IItem } from '../interfaces/interfaces';

export const getItemDescriptions = async () => {
    const res = await axios({
        url: CONSTANTS.get_url,
        method: CONSTANTS.get_method
    })
    const sliced: IItem[] = res.data.slice(0, 5)
    return sliced;
}

export const submitFormData = async (data: IForm) => {
    const res = await axios({
        url:CONSTANTS.post_url,
        method: CONSTANTS.post_method,
        data: data
    })
    return res.data;
}