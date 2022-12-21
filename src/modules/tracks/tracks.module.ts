import { Module } from '@nestjs/common';
import { TracksController } from './web/tracks.controller';
import { TracksService } from './application/tracks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './domain/track.schema';
import { Comment, CommentSchema } from './domain/comment.schema';
import { FileModule } from 'src/infrastructure/fileModule/file.module';

@Module({
	controllers: [TracksController],
	providers: [TracksService],
	imports: [
		MongooseModule.forFeature([
			{ name: Track.name, schema: TrackSchema },
			{ name: Comment.name, schema: CommentSchema }
		]),
		FileModule
	]
})
export class TracksModule {}
