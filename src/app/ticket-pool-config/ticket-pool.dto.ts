export interface TicketPoolDto {
  ticketPoolId: string;
  eventName: string;
  ticketPrice: number;
  availableTickets: number;
  maxTickets: number;
  vendorAddRate: number;
  customerRetrieveRate: number;
}
