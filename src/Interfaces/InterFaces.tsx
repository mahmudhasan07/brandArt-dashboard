export interface UserInterFace {
    id : string
  user: {
    userName: string;
    email: string;
    role: string;
    status: string;
    profileImage: string;
    id: string;
    isBlocked: boolean;
  };
}

export interface ConcertInterface {
  title: string;
  id: string;
  locationName: string;
  startDate: string;
  price: number;
  totalTicket: number;
  photos: string[];
}

export interface ComplainInterface {
  complainPhotos: string[];
  ticketId: string;
  user: {
    name: string;
    email: string;
  };
  title: string;
  id: string;
  status: string;
}
