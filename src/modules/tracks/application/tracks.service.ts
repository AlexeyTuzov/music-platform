import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import FileTypes from 'src/infrastructure/fileModule/enums/fileTypes';
import { FileService } from 'src/infrastructure/fileModule/file.service';
import { Comment, CommentDocument } from '../domain/comment.schema';
import { Track, TrackDocument } from '../domain/track.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
	constructor(
		@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
		@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
		private fileService: FileService
	) {}

	async create(
		dto: CreateTrackDto,
		audio: string,
		picture: string
	): Promise<Track> {
		const audioFileName = this.fileService.createFile(FileTypes.AUDIO, audio);
		const pictureFileName = this.fileService.createFile(
			FileTypes.PICTURE,
			picture
		);
		const track = await this.trackModel.create({
			...dto,
			listens: 0,
			audio: audioFileName,
			picture: pictureFileName
		});
		return track;
	}

	async getAll(limit: number, offset: number): Promise<Track[]> {
		const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(limit));
		return tracks;
	}

	async getOne(id: ObjectId): Promise<Track> {
		try {
			const track = await this.trackModel.findById(id).populate('comments');
			return track;
		} catch (err) {
			throw new HttpException('Track not found!', HttpStatus.NOT_FOUND);
		}
	}

	async delete(id: ObjectId): Promise<void> {
		try {
			await this.trackModel.deleteOne({ id });
		} catch (err) {
			throw new HttpException('Track not found!', HttpStatus.NOT_FOUND);
		}
	}

	async addComment(dto: CreateCommentDto): Promise<Comment> {
		try {
			const track = await this.trackModel.findById(dto.trackId);
			const comment = await this.commentModel.create({ ...dto });
			track.comments.push(comment);
			await track.save();
			return comment;
		} catch (err) {
			throw new HttpException('Track not found!', HttpStatus.NOT_FOUND);
		}
	}

    async search(query: string): Promise<Track[]> {
        try {
            console.log('query:', query);
            const tracks = await this.trackModel.find({
                name: {$regex: new RegExp(query, 'i')} 
            });
            return tracks;
        } catch (err) {
            throw new HttpException('Track not found!', HttpStatus.NOT_FOUND);
        }
    }
}
