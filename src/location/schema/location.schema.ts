import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema({
  timestamps: true,
})
export class Location {
  @Prop({ trim: true })
  name?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'organization',
  })
  organization?: Types.ObjectId;

  @Prop({ type: Number })
  x?: number;

  @Prop({ type: Number })
  y?: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
