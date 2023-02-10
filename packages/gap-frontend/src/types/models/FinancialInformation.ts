import type { BaseModel } from '.';

interface FinancialInformation extends BaseModel {
  bank_name: string;
  account_number: string;
  account_name: string;
  bank_sort_code: string;
  is_uk_bank_account: boolean;
  can_skip_validation: boolean;
}

export type { FinancialInformation };
