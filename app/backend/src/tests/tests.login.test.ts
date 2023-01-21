import * as chai from 'chai';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const app = require('../app');

describe('Definir o teste da rota de login', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;  
  describe('Retorna true', () => {

    it('true', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

      const { user, token } = chaiHttpResponse.body;

      loginToken = token;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(user.username).to.be.equal('Admin');    
    });

  });
});
