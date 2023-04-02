import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const a = 5;
  const b = a;
  if (b === a) {
    await app.listen(3000);
  }
  throw new Error('Something went wrong!');
}
bootstrap();
