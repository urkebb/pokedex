import { Option } from "../../models/dropdown";

export interface OrderFilter extends Option<OrderFilterValue> {}

export type OrderFilterValue = 'lowestNumber' | 'highestNumber' | 'aToZ' | 'zToA';
