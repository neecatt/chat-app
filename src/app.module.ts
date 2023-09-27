import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, ChatModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
