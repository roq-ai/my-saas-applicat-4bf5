import { HeadcountRequestInterface } from 'interfaces/headcount-request';
import { StakeholderInterface } from 'interfaces/stakeholder';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface RoleInterface {
  id?: string;
  title: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  headcount_request?: HeadcountRequestInterface[];
  stakeholder?: StakeholderInterface[];
  company?: CompanyInterface;
  _count?: {
    headcount_request?: number;
    stakeholder?: number;
  };
}

export interface RoleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  company_id?: string;
}
