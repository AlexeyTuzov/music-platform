import { Controller, Delete, Get, Post } from "@nestjs/common";
import { TracksService } from "../application/tracks.service";

@Controller('/tracks')
export class TracksController {
    constructor(private tracksService: TracksService) { }

    @Post()
    create() {

    }

    @Get()
    getAll() {
        return this.tracksService.getAll();
    }

    @Get()
    getOne() {

    }

    @Delete()
    delete() {

    }

}