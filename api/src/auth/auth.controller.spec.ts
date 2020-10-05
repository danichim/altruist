import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import initTestConfig from '../../test/initTestConfig';
import { getRepository } from 'typeorm';
import { AuthModule } from './auth.module';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

describe('Auth Controller', () => {
  let app: INestApplication;
  let role: Role;
  let userObj

  beforeAll(async () => {
    const moduleApp = await initTestConfig(AuthModule);
    app = moduleApp.app;
  });

  beforeEach(async() => {
    role = await getRepository(Role).save({ name: 'Role' });

    userObj = {
      'name': 'Victor',
      'email': 'victor.malai@7code.ro',
      'password': 'admin123',
      'role_id': role.id,
    };
  })

  afterEach(async () => {
    await getRepository(User).delete({});
    await getRepository(Role).delete(role.id);
  });

  it('/auth/register', async () => {

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(userObj)
      .expect(201)
      .expect(async (res) => {
        expect(res.body).toEqual(jasmine.objectContaining({ 'name': userObj.name, 'email': userObj.email }));
      });
  });

  it('/auth/login', async () => {
    const userEntity = Object.assign(new User(), userObj);
    await getRepository(User).save(userEntity);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ 'email': userObj.email, 'password': userObj.password })
      .expect(201)
      .expect(async (res) => {
        expect(res.body).toEqual(jasmine.objectContaining({ 'name': userEntity.name, 'email': userEntity.email }));
      });
  });
});
