import axios from 'axios';
import queryString from 'query-string';
import { HeadcountRequestInterface, HeadcountRequestGetQueryInterface } from 'interfaces/headcount-request';
import { GetQueryInterface } from '../../interfaces';

export const getHeadcountRequests = async (query?: HeadcountRequestGetQueryInterface) => {
  const response = await axios.get(`/api/headcount-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createHeadcountRequest = async (headcountRequest: HeadcountRequestInterface) => {
  const response = await axios.post('/api/headcount-requests', headcountRequest);
  return response.data;
};

export const updateHeadcountRequestById = async (id: string, headcountRequest: HeadcountRequestInterface) => {
  const response = await axios.put(`/api/headcount-requests/${id}`, headcountRequest);
  return response.data;
};

export const getHeadcountRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/headcount-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHeadcountRequestById = async (id: string) => {
  const response = await axios.delete(`/api/headcount-requests/${id}`);
  return response.data;
};
