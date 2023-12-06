import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { logger } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

//import { HttpExceptionFilter } from './common/filter/http-exception.filter';

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //forRoutes('cats');
    //forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer
      .apply(logger)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        //{ path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }
}
