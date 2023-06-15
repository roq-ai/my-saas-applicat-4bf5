import axios from 'axios';
import queryString from 'query-string';
import { StakeholderInterface, StakeholderGetQueryInterface } from 'interfaces/stakeholder';
import { GetQueryInterface } from '../../interfaces';

export const getStakeholders = async (query?: StakeholderGetQueryInterface) => {
  const response = await axios.get(`/api/stakeholders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStakeholder = async (stakeholder: StakeholderInterface) => {
  const response = await axios.post('/api/stakeholders', stakeholder);
  return response.data;
};

export const updateStakeholderById = async (id: string, stakeholder: StakeholderInterface) => {
  const response = await axios.put(`/api/stakeholders/${id}`, stakeholder);
  return response.data;
};

export const getStakeholderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stakeholders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStakeholderById = async (id: string) => {
  const response = await axios.delete(`/api/stakeholders/${id}`);
  return response.data;
};
