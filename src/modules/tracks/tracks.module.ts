import { Module } from "@nestjs/common";
import { TracksController } from "./web/tracks.controller";
import { TracksService } from "./application/tracks.service";

@Module({
    controllers: [TracksController],
    providers: [TracksService]
})
export class TracksModule {}