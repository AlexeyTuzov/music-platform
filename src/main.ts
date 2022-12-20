import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	try {
		const PORT = process.env.PORT || 5000;

		const app = await NestFactory.create(AppModule);

		await app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (err) {
		console.log(err.message);
	}
}

bootstrap();
