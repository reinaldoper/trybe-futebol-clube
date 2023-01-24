import * as chai from 'chai';
import { Response } from 'superagent';
import { data } from './mockes.json/teams.json';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const app = require('../app');

describe('Definir o retorno das teams', () => {
  let chaiHttpResponse: Response;
  describe('Retorna teams', () => {

    it('Teams', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
      .send(data);

      const date = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(date.data[0]).to.be.equal(data[0]);    
    });
    it('Teams ID = "1"', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/:id')
      .send(data);

      const date = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(date.data[0][0]).to.be.equal(data[0][0]);    
    });

  });
});
