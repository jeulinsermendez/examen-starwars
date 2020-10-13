import { Ship } from './ship.model';
export class ApiResponse {
  count: string;
  next: string;
  previous: string;
  results: Ship[];
}
