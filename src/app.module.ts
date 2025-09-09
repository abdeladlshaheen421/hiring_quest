import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { ConfigrationModule } from './config/config.module';
import { ClientModule } from './client/client.module';
import { AnalyticsModule } from './analytic/analytic.module';
import { VendorsModule } from './vendor/vendor.module';
import { ProjectsModule } from './project/project.module';
import { MatchesModule } from './match/match.module';
import { AuthModule } from './auth/auth.module';
import { ResearchDocModule } from './research-doc/research-doc.module';
import { NotFoundMiddleware } from './middleware/not-found.middleware';

@Module({
  imports: [
    ConfigrationModule,
    DataBaseModule,
    AuthModule,
    AnalyticsModule,
    ClientModule,
    VendorsModule,
    ProjectsModule,
    MatchesModule,
    ResearchDocModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware).forRoutes('*');
  }
}
