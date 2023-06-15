import { RoleInterface } from 'interfaces/role';
import { StakeholderInterface } from 'interfaces/stakeholder';
import { GetQueryInterface } from 'interfaces';

export interface HeadcountRequestInterface {
  id?: string;
  status: string;
  role_id: string;
  stakeholder_id: string;
  created_at?: any;
  updated_at?: any;

  role?: RoleInterface;
  stakeholder?: StakeholderInterface;
  _count?: {};
}

export interface HeadcountRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  role_id?: string;
  stakeholder_id?: string;
}
