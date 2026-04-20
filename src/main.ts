import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.ALLOWED_ORIGIN,
      credentials: true,
    },
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle("Ocso API")
    .setDescription("API for OCSO management")
    .setVersion("0.9")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
