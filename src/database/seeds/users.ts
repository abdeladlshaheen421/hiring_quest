import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/client/client.enum';

export default [
  {
    id: '90627dd6-ed05-4b4b-8af6-26fedb42ada2',
    username: 'admin',
    password: bcrypt.hashSync('password', 10),
    role: RoleEnum.ADMIN,
  },
  {
    id: 'a24b02f6-bfc1-4257-bdcc-f38cf28ba80f',
    username: 'client-1',
    password: bcrypt.hashSync('password', 10),
    client: { id: '78eefed2-073b-4196-9ecf-40ad310d27f9' },
  },
  {
    id: '9810c80b-cc06-4a62-a1d0-5993be094236',
    username: 'client-2',
    password: bcrypt.hashSync('password', 10),
    client: { id: '9064591e-c3aa-4022-8c7a-a6cbd66dbecf' },
  },
  {
    id: '7439158b-d124-4d3d-b4e1-44f7f3370852',
    username: 'client-3',
    password: bcrypt.hashSync('password', 10),
    client: { id: 'd7cdffd7-ecc7-4fe7-80f0-906f1333494f' },
  },
  {
    id: 'bb08c2a3-3cc1-4f9e-93ab-67c1676943ea',
    username: 'client-4',
    password: bcrypt.hashSync('password', 10),
    client: { id: '63765455-5eee-4ca7-9eae-5c22a4fc6676' },
  },
  {
    id: 'fbd695f3-1073-4497-be8a-0a8597b7fdd7',
    username: 'client-5',
    password: bcrypt.hashSync('password', 10),
    client: { id: '6a92a6a2-0100-4068-b50f-eeca921b611d' },
  },
];
