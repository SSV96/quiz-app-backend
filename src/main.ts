import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exception-filter/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
   const config = new DocumentBuilder()
    .setTitle('Quizzes App')
    .setDescription('Create and Publish Quizzes in no-time')
    .setVersion('1.0')
    .addTag('Quizzes')
    .build();

  app.enableCors();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
