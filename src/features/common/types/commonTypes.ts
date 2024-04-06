
export interface UserNotification 
 {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  targetType: string;
  targetId: string;
  parentId: string;
  };

