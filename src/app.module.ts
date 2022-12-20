import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksModule } from './modules/tracks/tracks.module';

@Module({
	imports: [
        TracksModule,
        MongooseModule.forRoot('mongodb://mongo:27017/DB')
    ]
})
export class AppModule {}
