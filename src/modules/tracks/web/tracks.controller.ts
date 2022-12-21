import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from '../application/dto/create-comment.dto';
import { CreateTrackDto } from '../application/dto/create-track.dto';
import { TracksService } from '../application/tracks.service';

@Controller('/tracks')
export class TracksController {
	constructor(private tracksService: TracksService) {}

	@Post()
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'audio', maxCount: 1 },
			{ name: 'picture', maxCount: 1 }
		])
	)
	create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
		const { picture, audio } = files;
		console.log(files);
		return this.tracksService.create(dto, audio[0], picture[0]);
	}

	@Get()
	getAll(@Query('limit') limit: number, @Query('offset') offset: number) {
		return this.tracksService.getAll(limit, offset);
	}

    @Get('/search')
    search(@Query('query') query: string) {
        return this.tracksService.search(query);
    }

	@Get(':id')
	getOne(@Param('id') id: ObjectId) {
		return this.tracksService.getOne(id);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	delete(@Param('id') id: ObjectId) {
		return this.tracksService.delete(id);
	}

	@Post('/comment')
	addComment(@Body() dto: CreateCommentDto) {
		return this.tracksService.addComment(dto);
	}
}
