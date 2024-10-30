import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Location } from 'src/location/schema/location.schema';
import { Organization } from 'src/organization/schema/organization.schema';

export type UserzDocument = HydratedDocument<Userz>;

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
  location?: Types.ObjectId;

  @Prop({ default: false })
  deleted: boolean;


  @Prop({
    type: Types.ObjectId,
    ref: Userz.name,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Userz.name,
  })
  deletedBy: Types.ObjectId;

  @Prop()
  deletedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Userz);
