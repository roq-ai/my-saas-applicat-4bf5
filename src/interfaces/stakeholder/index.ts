import { HeadcountRequestInterface } from 'interfaces/headcount-request';
import { UserInterface } from 'interfaces/user';
import { RoleInterface } from 'interfaces/role';
import { GetQueryInterface } from 'interfaces';

export interface StakeholderInterface {
  id?: string;
  user_id: string;
  role_id: string;
  created_at?: any;
  updated_at?: any;
  headcount_request?: HeadcountRequestInterface[];
  user?: UserInterface;
  role?: RoleInterface;
  _count?: {
    headcount_request?: number;
  };
}

export interface StakeholderGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  role_id?: string;
}
