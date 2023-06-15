import axios from 'axios';
import queryString from 'query-string';
import { RoleInterface, RoleGetQueryInterface } from 'interfaces/role';
import { GetQueryInterface } from '../../interfaces';

export const getRoles = async (query?: RoleGetQueryInterface) => {
  const response = await axios.get(`/api/roles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRole = async (role: RoleInterface) => {
  const response = await axios.post('/api/roles', role);
  return response.data;
};

export const updateRoleById = async (id: string, role: RoleInterface) => {
  const response = await axios.put(`/api/roles/${id}`, role);
  return response.data;
};

export const getRoleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/roles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRoleById = async (id: string) => {
  const response = await axios.delete(`/api/roles/${id}`);
  return response.data;
};
