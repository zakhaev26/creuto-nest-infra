import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Location } from 'src/location/schema/location.schema';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema({
  timestamps: true,
})
export class Organization {
  @Prop({ trim: true })
  name?: string;

  @Prop({
    type: Types.ObjectId,
    ref: Location.name
  })
  location: Types.ObjectId;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
