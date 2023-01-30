import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import Http = require('chai-http');
chai.use(Http);
const { expect } = chai;
import { App } from '../app';
const { app } = new App();
describe('Definir o teste da rota de login', () => {
  let httpResponse: Response; 
  describe('Retorna true com o token válido', () => {
    it('true com o token', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
      const { token } = httpResponse.body;
      expect(httpResponse.status).to.be.equal(200);
      expect(token).to.be.equal(token);    
    });
    it('Nenhum email informado no corpo da requisição', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: 'secret_admin' });

      const { message } = httpResponse.body;

      expect(httpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('All fields must be filled');    
    });
    it('Nenhum password é informado no corpo da requisição', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '' });

      const { message } = httpResponse.body;

      expect(httpResponse.status).to.be.equal(400);
      expect(message).to.be.equal('All fields must be filled');    
    });
    it('Senha passada incorretamente no corpo da requisição', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 's123er4' });

      const { message } = httpResponse.body;


      expect(httpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');    
    });
    it('true com rota validate', async () => {
      httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
      const { token } = httpResponse.body;   

      httpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({ authorization: token });
      const { body } = httpResponse;
      expect(httpResponse.status).to.be.equal(200);
      expect(body.role).to.be.equal('admin');
    });

  });
});