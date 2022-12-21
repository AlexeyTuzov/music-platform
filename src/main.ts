import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	try {
		const PORT = process.env.PORT || 5000;

		const app = await NestFactory.create(AppModule);
        app.enableCors();

		await app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}`);
		});
	} catch (err) {
		console.log(err.message);
	}
}

bootstrap();
