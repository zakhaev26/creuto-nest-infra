import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Location } from 'src/location/schema/location.schema';
import { Organization } from 'src/organization/schema/organization.schema';

export type UsersDocument = HydratedDocument<Userz>;

@Schema({
  timestamps: true,
})
export class Userz {
  @Prop({ trim: true })
  name?: string;

  @Prop({
    type: Types.ObjectId,
    ref: Organization.name,
  })
  organization?: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Location.name,
  })
  location: Types.ObjectId;
}

export const UsersSchema = SchemaFactory.createForClass(Userz);
