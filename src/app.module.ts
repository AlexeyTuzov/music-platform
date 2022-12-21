import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './infrastructure/fileModule/file.module';
import { TracksModule } from './modules/tracks/tracks.module';
import * as path from 'path';

@Module({
	imports: [
		TracksModule,
		MongooseModule.forRoot('mongodb://mongo:27017/DB'),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		FileModule
	]
})
export class AppModule {}
